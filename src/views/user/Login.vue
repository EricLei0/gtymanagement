<template>
  <div class="login-container">
    <div class="login-box">
      <!--头像区域-->
      <div class="avator-box">
        <img :src="loginLogo" />
      </div>
      <!--表单区域-->
      <div class="form-box">
        <h2 class="title">信息查询系统</h2>
        <a-form
          id="components-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              size="large"
              v-decorator="[
                'username',
                {
                  rules: [
                    {
                      required: true,
                      min: 2,
                      max: 10,
                      message: '请输入一个2-10字的用户名!'
                    }
                  ],
                  initialValue: 'admin'
                }
              ]"
              placeholder="请输入用户名"
              allowClear
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      min: 6,
                      max: 20,
                      message: '请输入一个6-20位的密码'
                    }
                  ],
                  initialValue: '88888888'
                }
              ]"
              type="password"
              placeholder="请输入密码"
              allowClear
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox
              v-decorator="[
                'remember',
                {
                  valuePropName: 'checked',
                  initialValue: true
                }
              ]"
              >自动登录</a-checkbox
            >
          </a-form-item>
          <a-form-item>
            <a-button
              size="large"
              type="primary"
              html-type="submit"
              class="login-form-button"
              >登录</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
//import user from "@/api/user";

export default {
  data() {
    return {
      loginLogo: require("@/assets/gty_logo_sq.png"),
      //  获取表单data
      form: this.$form.createForm(this, { name: "login-form" })
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          /*user.login({}, values).then(response => {
            if (response.data.success != true) {
              return this.$message.error("登录失败");
            } else {
              this.$message.success("登录成功");
              window.sessionStorage.setItem("token", response.data.data.token);
              this.$router.push("/inventory/search");
              window.sessionStorage.setItem("openKeys", ["/inventory"]);
              window.sessionStorage.setItem("selectedKeys", [
                "/inventory/search"
              ]);
              window.sessionStorage.setItem("username", values.username);
              this.GLOBAL.username = values.username;
            }
          });*/
          this.$message.success("登录成功");
          window.sessionStorage.setItem("token", "xxxx");
          this.$router.push("/inventory/search");
          window.sessionStorage.setItem("openKeys", ["/inventory"]);
          window.sessionStorage.setItem("selectedKeys", ["/inventory/search"]);
          window.sessionStorage.setItem("username", values.username);
          this.GLOBAL.username = values.username;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  /*font-family: "Microsoft YaHei";*/
}

.login-box {
  width: 500px;
  height: 400px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avator-box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  background-color: #fff;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.title {
  font-weight: 1200;
  font-weight: 600;
  letter-spacing: 0.2em;
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%);
}

.login-form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.login-form-button {
  width: 100%;
  font-size: 16px;
  height: 40px;
  padding: 0 15px;
  letter-spacing: 0.2em;
}
</style>
