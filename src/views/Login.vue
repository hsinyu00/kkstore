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

<style lang="scss" scoped src="./../assets/login.scss"></style>
