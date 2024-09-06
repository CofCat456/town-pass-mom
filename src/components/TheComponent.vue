<script setup lang="ts">
const { initial } = defineProps<{
  initial: number
}>()
</script>

<template>
  <div>
    {{ initial }}
  </div>
</template>
