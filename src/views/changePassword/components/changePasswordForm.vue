<template>
  <div class="change-password-form">
    <el-form :model="this.ch_pwd_form" status-icon :rules="rules" ref="ch_pwd_form" label-width="100px">
      <el-form-item label="身份证号">
        <el-input type="password" v-model="ch_pwd_form.idcode" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="姓氏" prop="familyName">
        <el-input type="password" v-model="ch_pwd_form.familyName" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="名字" prop="givenName">
        <el-input type="password" v-model="ch_pwd_form.givenName" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input type="password" v-model="ch_pwd_form.newpwd" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirm">
        <el-input type="password" v-model="ch_pwd_form.confirm" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input type="password" v-model="ch_pwd_form.captcha" autocomplete="off"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ch_pwd_form')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "change-password-form",
  data(){
    return {
      ch_pwd_form: {
        idcode,
        familyName,
        givenName,
        newpwd,
        confirm,
        captcha
      }
    }
  },
  methods: {
    submitForm(formName){

    }
  }
}
</script>

<style lang="scss">


</style>
