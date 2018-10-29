<template>
    <div class="bind-email">
<el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="100px">
      <el-form-item label="当前密码" prop="current">
        <el-input type="password" v-model="passwordForm.current" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input type="password" v-model="passwordForm.newpwd" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirm">
        <el-input type="password" v-model="passwordForm.confirm" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input type="password" v-model="passwordForm.captcha" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('passwordForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
    name: "bind-email",
    
}
</script>

<style lang="scss">
  .bind-email {
  	width: 600px;
  margin: auto;

  .el-form /deep/ {

    button {
      height: 48px;
      border-radius: 3px;
      border: none;
      min-width: 200px;
      font-size: 16px;
      width: 100%;
      background-color: #7a98f7;

      &:hover {
        background-color: #a0b6f9;
      }
    }

    .el-form-item__label {
      color: #61688a;
    }

    .el-input__inner {
      background-color: #1e2235;
      color: #c7cce6;
      box-sizing: border-box;
      height: 48px;
      border: 1px solid #4e5b85;
      border-radius: 3px;
      font-size: 16px;

    }
  }

  }
</style>
