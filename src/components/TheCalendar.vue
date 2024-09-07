<script lang="ts">
const dates = ['一', ' 二', '三', '四', '五', '六', '日']
</script>

<script setup lang="ts">
// const props = defineProps<{
//   modelValue?: boolean
// }>()
</script>

<template>
  <div border="[#F3B671] 1" class="pt-[0.9375rem]" h-27.5 w-full rounded-base px-4 pb-4.5>
    <ul flex="~ items-center justify-between" h-full>
      <li v-for="(date, index) in dates" :key="date" h-full class="text-[#F3B671]" flex="~ col items-center justify-between">
        <p text-xs>
          {{ `週${date}` }}
        </p>
        <p text-xs>
          {{ index }}
        </p>

        <div class="bg-[#F3B671]" aspect-square w-7 rounded-full />
      </li>
    </ul>
  </div>
</template>
