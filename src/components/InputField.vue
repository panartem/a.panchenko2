<script setup>
defineProps({
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  }
})

const input = defineModel()

</script>

<template>
  <input
    v-model="input"
    class="text-gray px-4 py-2 rounded-sm"
    :type="type"
    :placeholder="placeholder"
  >
</template>

<style scoped lang="postcss">

</style>
