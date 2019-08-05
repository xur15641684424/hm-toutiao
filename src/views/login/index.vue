<template>
   <div class='container'>
      <el-card class="my-card">
         <img src="../../assets/images/logo_index.png" alt="">
         <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <el-form-item prop="mobile">
               <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
               <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px"></el-input>
               <el-button>发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                 <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item >
                 <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
            </el-form-item>
         </el-form>
      </el-card>
   </div>
</template>

<script>
import store from '@/store'
// import { try } from 'q';
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机格式不对'))
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { require: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { require: true, message: '请输验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // console.log('success')
          // this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
          //   .then(res => {
          //   // console.log(res.data)
          //   store.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或验证码错误')
          //   })
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container{
    width:100%;
    height:100%;
    position:absolute;
    background:url(../../assets/images/login_bg.jpg) no-repeat center/cover;
    .my-card{
      width: 400px;
      height: 350px;
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%,-60%);
      img{
        width:200px;
        display: block;
        margin: 0 auto 30px;
      }
    }
}

</style>
