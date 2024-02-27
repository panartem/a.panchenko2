<script setup>
import InputField from "@/components/InputField.vue";
import Button from "@/components/Button.vue";
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore()

const formData = ref({
  login: '',
  password: ''
})

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

function auth() {
  authStore.signIn(formData.value);
}

watch(formData, () => {
  authStore.resetFormErrors();
}, {
  deep: true
})

</script>

<template>
  <div>
    <div v-if="authStore.formErrors.default" class="mb-4 rounded-sm p-4 bg-red-300">
      {{ authStore.formErrors.default }}
    </div>
    <form @submit.prevent="auth"
      class="rounded-2xl shadow-2xl flex flex-col gap-4"
      :class="{
        'opacity-50 pointer-events-none': authStore.isLoading
      }"
    >
      <InputField v-model="formData.login" placeholder="Enter login"></InputField>
      <InputField v-model="formData.password" placeholder="Enter password" type="password"></InputField>
      <Button type="submit">
        Submit
      </Button>
    </form>
  </div>
</template>
