<script setup>
  defineProps({
    type: {
      type: String,
      default: 'button'
    },
    theme: {
      type: String,
      default: 'primary'
    }
  })
</script>

<template>
  <button
    :type="type"
    class="px-4 py-2 outline-none rounded-sm"
    :class="{
      'bg-white text-gray': theme === 'primary'
    }"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="postcss">

</style>
