<script setup>
  defineProps({
    title: String,
    image: String,
    id: String
  })
</script>

<template>
  <article class="cursor-pointer">
    <div class="relative overflow-hidden h-0 bg-cover pb-[70%] mb-2">
      <img v-lazy="image" src="" alt="" class="w-full absolute inset-0 object-cover">
    </div>
    <div>{{ title }}</div>
  </article>
</template>
