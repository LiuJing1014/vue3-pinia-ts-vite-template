<template>
  <div class="home-wrapper">home</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

console.log('userStore：', userStore.userInfo)
</script>

<style scoped lang="scss">
.home-wrapper {
  color: $primary-color;
}
</style>
