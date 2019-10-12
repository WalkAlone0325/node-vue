<template>
  <div class="login-contatiner">
    <el-card header="请先登录" class="login-card">
      <!-- native是监听表单的原生事件，prevent是阻止表单的默认提交跳转页面 -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      // console.log(res.data);
      localStorage.token = res.data.token; // 保存token
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功！"
      });
    }
  }
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>