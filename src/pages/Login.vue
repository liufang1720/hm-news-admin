<template>
  <div class="login">
    <!-- 
           el-form: 表单组件
            :model="form" 给表单元素绑定一个对象,这个对象包含表单中需要双向绑定的那些属性
             label-width="80px" 设置label宽度
              el-form-item: 表单项
              el-input: 文本框
               el-button: 按钮
       -->
    <el-form ref="form" :model="form" label-width="60px" :rules="rules">
      <!-- 用户名 -->
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      //表单效验功能
      rules: {
        //用户效验
        username: [
          //非空效验(required 是否非空效验,trigger:blur是失去焦点 change是发生改变)
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 5,
            message: '长度在3到5个字符',
            trigger: ['blur', 'change']
          }
        ],
        //密码的效验
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '长度在3-12个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  //方法
  methods: {
    //重置按钮
    reset() {
      this.$refs.form.resetFields()
    },
    //登录按钮
    async login() {
      try {
        //登录前对表单进行效验
        await this.$refs.form.validate()
        const res = await this.$axios.post('/login', this.form)
        const { statusCode, message, data } = res.data
        if (statusCode === 200) {
          //提示消息
          this.$message.success(message)
          // 保存 token信息
          localStorage.setItem('token', data.token)
          //保存个人信息
          localStorage.setItem('user', JSON.stringify(data.user))
          this.$router.push('/')
        } else {
          this.$message.error(message)
        }
      } catch (e) {
        console.log('表单效验失败', e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 400px;
  margin: 200px auto;
  border: 1px solid #ccc;
  padding: 20px;
  .el-button:first-child {
    margin-right: 100px;
    margin-left: 50px;
  }
}
</style>
