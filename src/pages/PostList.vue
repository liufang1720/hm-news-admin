<template>
  <div class="post-list">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  表格  -->
    <!-- 
      el-table 是表格  
      el-table-column 表格的列  一个el-table-column代表表格一列
    -->
    <el-table :data="postList" style="width:100%">
      <!-- 序号 -->
      <el-table-column
        label="序号"
        type="index"
        width="100"
        :index="indexMethod"
      ></el-table-column>
      <!-- 标题 -->
      <el-table-column prop="title" width="200" label="标题"></el-table-column>
      <!-- 作者 -->
      <el-table-column prop="user.nickname" label="作者"></el-table-column>
      <!-- 创建时间 -->
      <el-table-column label="创建时间">
        <template v-slot="scoped">
          {{ scoped.row.create_date | date }}
        </template>
      </el-table-column>
      <!-- 图片 -->
      <el-table-column label="封面">
        <template v-slot="scoped">
          <img :src="handleUrl(scoped.row.cover[0].url)" alt="" />
        </template>
      </el-table-column>
      <!-- 按钮 -->
      <el-table-column label="操作" width="200">
        <template v-solt="scoped">
          <el-button type="primary" disabled>编辑</el-button>
          <el-button type="danger" disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <!--
        total:告诉分页组件 总公有多少条页数
        page-size:告诉分页组件  每页需要显示几条 默认是10
        current-page:告诉分页组件 当前是第几页 默认是1
        background  给分页按钮 添加背景色
        layout="total,sizes,prev,pager,next,jumper"  total 总条数 如果layout中指定了sizes, 修改每页显示的条数,额外指定
        page-sizes: "[3, 6, 9, 15]"  控制修改每页条数
        @current-change  分页的页码值发生改变的时候，会触发的事件
        @size-change 每页的条数发生改变的时候，会触发的事件
    -->
    <el-pagination
      :total="total"
      :page-size="pageSize"
      :current-page="pageIndex"
      background
      layout="total,sizes,prev,pager,next,jumper"
      :page-sizes="[3, 6, 9, 12]"
      @current-change="handleChange"
      @size-change="sizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 3,
      postList: [],
      total: 0
    }
  },
  created() {
    this.getPostList()
  },
  methods: {
    //获取数据
    async getPostList() {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data, total } = res.data
      if (statusCode === 200) {
        this.postList = data
        this.total = total
        console.log(this.postList)
      }
    },
    // 页码发生改变的时候触发
    handleChange(val) {
      // 重新发送ajax请求
      this.pageIndex = val
      this.getPostList()
    },
    //每页条数发生变化 触发
    sizeChange(val) {
      this.pageSize = val
      this.getPostList()
    },
    //序号优化
    indexMethod(index) {
      console.log(index)
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    },
    //优化url地址
    handleUrl(url) {
      if (url.startsWith('http')) {
        return url
      } else {
        return this.$axios.defaults.baseURL + url
      }
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 200px;
  height: 150px;
  object-fit: cover;
}
</style>
