<script setup lang="ts">
defineOptions({
  name: 'DiaryPage',
})
</script>

<template>
  <div flex="~ col" h-full w-full items-center p="t-11 x-4">
    <!-- 產檢日誌 -->
    <RouterLink v-slot="{ navigate }" to="/diary/all" custom>
      <section class="rounded-base" pos-relative h-26 w-full of-hidden bg-white shadow-base @click="navigate">
        <div position="absolute top-1/2 left-6" class="-translate-y-1/2">
          <p mb-2 text-base color-primary font-medium>
            產檢日誌
          </p>
          <p text-xs color-secondary>
            掌握所有產檢大小事
          </p>
        </div>

        <img src="/diary/card-1.png" alt="card-1" position="absolute top-0" class="left-[245.85px] h-[138px] w-[165px]">
        <img src="/diary/doctor.svg" alt="card-doctor" position="absolute top-0" class="left-[223px] top-1/2 h-[83px] w-[96px] -translate-y-1/2">
      </section>
    </RouterLink>

    <!-- 餐點推薦 -->
    <section flex="~ col justify-center" mt-7.5 w-full rounded-base px-6 pb-5 pt-7 shadow-base>
      <!-- 標題 -->
      <div flex="~ items-center" pos-relative w-full gap-2.75>
        <img src="/diary/calories.svg" alt="calories">
        <p text="op-80 base" color-base font-medium>
          健康紀錄
        </p>
      </div>

      <hr class="bg-black" my-4 h-0.25 w-full op-4>

      <RouterLink v-slot="{ navigate }" :to="{ path: '/sub', query: { type: 'mood' } }" custom>
        <div flex="~ items-center" w-full gap-5 @click="navigate">
          <img src="/diary/mood.png" alt="mood">
          <div flex="~ col justify-center" gap-y-3>
            <p color-base text-op-80>
              心情溫度計
            </p>
            <div flex="~ items-center" gap-x-3>
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19ZM6.47727 9.49997C7.19273 9.49997 7.77273 8.91998 7.77273 8.20452C7.77273 7.48906 7.19273 6.90907 6.47727 6.90907C5.76181 6.90907 5.18182 7.48906 5.18182 8.20452C5.18182 8.91998 5.76181 9.49997 6.47727 9.49997ZM12.5227 9.49997C13.2382 9.49997 13.8182 8.91998 13.8182 8.20452C13.8182 7.48906 13.2382 6.90907 12.5227 6.90907C11.8073 6.90907 11.2273 7.48906 11.2273 8.20452C11.2273 8.91998 11.8073 9.49997 12.5227 9.49997ZM5.75436 12.0909C5.39025 12.0909 5.17068 12.4569 5.3932 12.7451C5.9858 13.5126 7.25667 14.6818 9.49997 14.6818C11.7433 14.6818 13.0141 13.5126 13.6067 12.7451C13.8293 12.4569 13.6097 12.0909 13.2456 12.0909H5.75436Z" fill="#FFA600" />
              </svg>

              <p text-2.5 color-base text-op-60>
                今天的心情看起來不錯喔 !
              </p>
            </div>
          </div>
        </div>
      </RouterLink>

      <hr class="bg-black" my-4 h-0.25 w-full op-4>

      <RouterLink v-slot="{ navigate }" :to="{ path: '/sub', query: { type: 'diet' } }" custom>
        <div flex="~ items-center" w-full gap-5 @click="navigate">
          <img src="/diary/food.png" alt="food">
          <div flex="~ col justify-center" gap-y-3>
            <p color-base text-op-80>
              孕期飲食
            </p>
            <p text-2.5 color-base text-op-60>
              200 cals / 700 cals
            </p>
          </div>
        </div>
      </RouterLink>

      <div p="y-4 x-10" w-full class="bg" position="absolute left-0 right-0 bottom-26.25">
        <p mb-1 text-base text-white font-bold>
          懷孕的第一天
        </p>
        <p text-xs text-white font-bold>
          恭喜你踏上這段美妙的旅程！在這第一週，記得保持充足的休息和營養，保持積極的心態。這是為寶寶和自己打下健康基礎的時候，照顧好自己，也為未來的日子儲備能量
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg {
  background: linear-gradient(180deg, #ebbba7 0%, #cfc7f8 100%);
  border-radius: 20px 20px 0px 0px;
}
</style>
