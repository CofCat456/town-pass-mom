<script setup lang="ts">
interface Props {
  score: number
  maxScore?: number
}

const { score, maxScore = 8 } = withDefaults(defineProps<Props>(), {
  maxScore: 8,
})

const heightPercentage = computed(() => (score / maxScore) * 100)
</script>

<template>
  <div class="h-40 w-2 flex items-end justify-center rounded-full bg-gray-200">
    <div
      class="w-full rounded-full bg-[#F3B671]"
      :style="{ height: `${heightPercentage}%` }"
    />
  </div>
</template>
