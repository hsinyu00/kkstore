<template>
  <div class="login">
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label>電郵：<input type="email" v-model="email" /></label>
      </div>
      <div class="field">
        <label>密碼：<input type="password" v-model="password" /></label>
      </div>
      <div class="error" v-if="error">
        登入失敗
      </div>
      <button class="btn" type="submit">登入</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      error: false
    };
  },
  methods: {
    async handleSubmit () {
      try {
        await this.$store.dispatch('User/login', { email: this.email, password: this.password });
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.error = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  padding: 40px;
  .field {
    margin-bottom: 30px;
  }
}

input[type="email"], input[type="password"] {
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #ddd;
  margin-left: 40px;
  width: 200px;
}

.error {
  color: red;
  margin: 20px 0;
}
</style>
