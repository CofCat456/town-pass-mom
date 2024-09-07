<script setup lang="ts">
const timestamp = useTimestamp({ offset: 0 })

const date = computed(() => {
  const currentDate = new Date(timestamp.value)
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  return `${year} 年 ${month} 月`
})
</script>

<template>
  <header flex="~ items-center justify-between" px-4 pb-8 pt-6>
    <!-- 選單 -->
    <IconMenu />

    <!-- 日期 -->
    <p class="text-[#001133]" text-lg font-bold>
      {{ date }}
    </p>

    <!-- 日曆 -->
    <IconCalendar />
  </header>
</template>
