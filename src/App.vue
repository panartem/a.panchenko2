<script setup>
import { RouterView } from 'vue-router';
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();


authStore.checkAuth();

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
