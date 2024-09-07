<script setup lang="ts">
defineOptions({
  name: 'DiaryPage',
})
</script>

<template>
  <div flex="~ col" h-full w-full items-center pt-11>
    <!-- 產檢日誌 -->
    <section class="rounded-base" pos-relative h-26 w-full of-hidden bg-white shadow-base>
      <div position="absolute top-1/2 left-6" class="-translate-y-1/2">
        <p text-base color-primary font-medium>
          產檢日誌
        </p>
        <p text-xs color-secondary>
          掌握所有產檢大小事
        </p>
      </div>

      <img src="/home/card-1.png" alt="card-1" position="absolute top-0" class="left-[245.85px] h-[138px] w-[165px]">
      <img src="/home/doctor.svg" alt="card-doctor" position="absolute top-0" class="left-[223px] top-1/2 h-[83px] w-[96px] -translate-y-1/2">
    </section>

    <section mt-8.5 w-full flex="~ items-center justify-between" class="gap-[1.4375rem]">
      <!-- 心情溫度計 -->
      <div w-38 class="gap-y-[1.6875rem] rounded-base pb-11 pt-[1.6875rem]" flex="~ col items-center justify-center" shadow-base>
        <p text-base text-black font-medium class="leading-[14px]">
          心情溫度計
        </p>
        <img src="/home/card-2.svg" alt="card-2">
      </div>

      <!-- 運動組合餐 -->
      <div w-38 class="gap-y-[0.9375rem] rounded-base pb-[1.9375rem] pt-[1.75rem]" flex="~ col items-center justify-center" shadow-base>
        <p text-base text-black font-medium class="leading-[14px]">
          運動組合餐
        </p>
        <img src="/home/card-3.svg" alt="card-3">
      </div>
    </section>

    <!-- 餐點推薦 -->
    <section flex="~ col justify-center" mt-7.5 w-full rounded-base px-6 pb-5 pt-7 shadow-base>
      <!-- 標題 -->
      <div flex="~ items-center wrap" class="gap-[0.9375rem]" pos-relative w-full>
        <p text-base text-black font-medium>
          飲養報告
        </p>
        <IconChevronRight mla />
        <div w-full flex="~ items-center" class="pb-[1.1875rem]" border="b black/4">
          <img src="/home/calories.svg" alt="calories">
          <div flex="~ items-end">
            <p flex="inline items-end" gap-1 pl-1.5 pr-1 color-primary>
              <span text-2xl font-medium leading-none font-rubik>751</span>
              <span text-xs>kcal</span>
            </p>
            <p text-xs color-secondary>
              /450  kcal
            </p>
          </div>
        </div>
      </div>

      <!-- 今日推薦 -->
      <!-- TODO: fetch api -->
      <div flex="~ items-start" w-full gap-5 py-4 border="b black/4">
        123

        <div flex="~ col " class="gap-y-[0.3125rem]">
          <p text-sm color-primary font-medium>
            今日推薦
          </p>

          <p text-xs color-annotation>
            鳳梨
          </p>

          <p text-sm color-secondary>
            200 cals
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
