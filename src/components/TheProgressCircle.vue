<script setup lang="ts">
const {
  size,
  strokeWidth = 3,
  current,
  total,
  secondaryColor = '#ffffff',
  mainColor = '#F3B671',
  reverse = true,
} = defineProps<{
  size: number
  total: number
  current: number
  strokeWidth?: number
  mainColor?: string
  secondaryColor?: string
  reverse?: boolean
}>()

const radius = computed(() => (size - strokeWidth) / 2)
const circumference = computed(() => radius.value * 2 * Math.PI)
const progress = computed(() => (current / total) * 100)
const strokeDashoffset = computed(() =>
  reverse
    ? (progress.value / 100) * circumference.value
    : circumference.value - (progress.value / 100) * circumference.value,
)
</script>

<template>
  <div class="relative inline-flex items-center justify-center">
    <svg
      :width="size"
      :height="size"
      :class="{ 'transform -rotate-90': !reverse, 'transform rotate-90': reverse }"
    >
      <circle
        :stroke-width="strokeWidth"
        :r="radius"
        :cx="size / 2"
        :cy="size / 2"
        fill="transparent"
        stroke="currentColor"
        :style="{ color: secondaryColor }"
      />
      <circle
        :stroke-width="strokeWidth"
        :r="radius"
        :cx="size / 2"
        :cy="size / 2"
        fill="transparent"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        stroke-linecap="round"
        :style="{ color: mainColor }"
        stroke="currentColor"
      />
    </svg>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <slot />
    </div>
  </div>
</template>
