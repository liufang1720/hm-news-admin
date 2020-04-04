<template>
  <div class="post-publish">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单-->
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <!-- 标题 -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>

      <!-- 内容 -->
      <el-form-item label="内容" prop="content">
        <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>

      <!-- 栏目 -->
      <el-form-item label="栏目" prop="categories">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox v-for="item in tabList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 封面 -->
      <!-- 
        el-upload:文件上传的组件
        elementui 上传图片会自动发ajax 上传照片
        action:文件上传的地址
      -->
      <el-form-item label="封面" prop="cover">
        <el-upload
          :action="$axios.defaults.baseURL + '/upload'"
          list-type="picture-card"
          :headers="headers"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <!-- 类型 -->
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 发布按钮 -->
      <el-form-item>
        <el-button type="primary" @click="publish">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 标题
        title: '',
        // 内容
        content: '',
        // 分类
        categories: [],
        // 封面
        cover: [],
        // 类型
        type: 1
      },
      tabList: [],
      headers: {
        Authorization: localStorage.getItem('token')
      },
      //表单效验
      rules: {
        title: [
          {
            required: true,
            message: '文章标题不能为空',
            trigger: ['blur', 'change']
          }
        ],
        content: [
          {
            required: true,
            message: '文章内容不能为空',
            trigger: ['blur', 'change']
          }
        ],
        categories: [
          {
            required: true,
            message: '文章栏目不能为空',
            trigger: ['blur', 'change']
          }
        ],
        cover: [
          {
            required: true,
            message: '封面不能为空',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  //勾子函数
  async created() {
    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.tabList = data.filter(item => {
        return item.name !== '关注' && item.name !== '头条'
      })
      // console.log(this.tabList)
    }
  },
  //方法
  methods: {
    //图片上传成功的处理
    handleSuccess(res, file, fileList) {
      // console.log(res, file, fileList)
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.form.cover.push({
          id: data.id,
          url: data.url
        })
      }
    },
    //点击发布按钮
    async publish() {
      try {
        await this.$refs.form.validate()
        const categories = this.form.categories.map(item => {
          return {
            id: item
          }
        })
        // 把要传给后台的数据 提出来
        const data = {
          ...this.form,
          categories: categories
        }
        // 如果添加的是视频
        if (this.form.type === 2) {
          // 添加的是视频，只需要视频的地址，不需要标签
          //第一种
          // let div = document.createElement('div')
          // div.innerHTML = this.form.content
          // data.content = div.innerText
          // // 第二种
          const reg = /<\/?.+?\/?>/g
          data.content = this.form.content.replace(reg, '')
          // https://video.pearvideo.com/mp4/adshort/20200402/cont-1666479-15060362_adpkg-ad_hd.mp4
        }
        const res = await this.$axios.post('/post', data)
        console.log(res.data)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.$router.push('/')
          this.$message.success('发布成功')
        }
      } catch {
        console.log('表单效验失败')
      }
    }
  },
  //监听
  watch: {
    //富文本内容
    'form.content': {
      handler(value) {
        if (value) {
          this.$refs.form.clearValidate('content')
        }
      }
    },
    //封面照片
    'form.cover': {
      deep: true,
      handler(value) {
        if (value.length > 0) {
          this.$refs.form.clearValidate('cover')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 20px;
}
.quill-editor {
  background-color: #fff;
  /deep/ .ql-editor {
    height: 200px;
  }
}
</style>
