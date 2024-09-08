<script lang="ts">
</script>

<script setup lang="ts">
import dayjs from 'dayjs'

const week = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const now = useNow()

const selectDate = ref(now.value)

function generateRandomScores() {
  return Array.from({ length: 7 }, () => Math.floor(Math.random() * 8) + 1)
}

const scores = ref(generateRandomScores())

function handleDateMinus() {
  selectDate.value = dayjs(selectDate.value).subtract(1, 'day').toDate()
  scores.value = generateRandomScores()
}

function handleDatePlus() {
  selectDate.value = dayjs(selectDate.value).add(1, 'day').toDate()
  scores.value = generateRandomScores()
}

// 監聽 selectDate 的變化
watch(selectDate, () => {
  scores.value = generateRandomScores()
})

// const open = ref<boolean>(false)
// const confirmLoading = ref<boolean>(false)

// function showModal() {
//   open.value = true
//   console.log(1)
// }
// function handleOk() {
//   open.value = false
// }
</script>

<template>
  <section class="h-full w-full">
    <div m="t-8" p="x-7.5 t-3.25 b-4.5" rounded-base p-5 border="1 [#DEDEDE] op-70">
      <div w-full flex="~ justify-center items-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="handleDateMinus">
          <g clip-path="url(#clip0_199_815)">
            <path d="M12.037 5.88215L6.54588 9.85537C6.52307 9.87181 6.50448 9.89344 6.49167 9.91847C6.47885 9.9435 6.47217 9.97122 6.47217 9.99934C6.47217 10.0275 6.47885 10.0552 6.49167 10.0802C6.50448 10.1052 6.52307 10.1269 6.54588 10.1433L12.037 14.1165C12.1553 14.2014 12.3204 14.1165 12.3204 13.9714V12.9246C12.3204 12.6969 12.2111 12.4804 12.0258 12.3464L8.78026 10.0005L12.0258 7.65224C12.2111 7.51831 12.3204 7.30403 12.3204 7.07412V6.02724C12.3204 5.88215 12.1553 5.79733 12.037 5.88215Z" fill="#333333" fill-opacity="0.8" />
            <path d="M10 0C4.47768 0 0 4.47768 0 10C0 15.5223 4.47768 20 10 20C15.5223 20 20 15.5223 20 10C20 4.47768 15.5223 0 10 0ZM10 18.3036C5.41518 18.3036 1.69643 14.5848 1.69643 10C1.69643 5.41518 5.41518 1.69643 10 1.69643C14.5848 1.69643 18.3036 5.41518 18.3036 10C18.3036 14.5848 14.5848 18.3036 10 18.3036Z" fill="#333333" fill-opacity="0.8" />
          </g>
          <defs>
            <clipPath id="clip0_199_815">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <p mx-4.5 text-xs color-base text-op-80 font-medium>
          {{ dayjs(selectDate).format('YYYY年MM月DD日') }}
        </p>

        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="handleDatePlus">
          <g clip-path="url(#clip0_199_814)">
            <path d="M7.96305 14.1178L13.4541 10.1446C13.4769 10.1282 13.4955 10.1066 13.5083 10.0815C13.5211 10.0565 13.5278 10.0288 13.5278 10.0007C13.5278 9.97254 13.5211 9.94482 13.5083 9.91979C13.4955 9.89475 13.4769 9.87313 13.4541 9.85668L7.96305 5.88347C7.84474 5.79865 7.67956 5.88347 7.67956 6.02856V7.07543C7.67956 7.30311 7.78894 7.51963 7.97421 7.65356L11.2197 9.99954L7.97421 12.3478C7.78894 12.4817 7.67956 12.696 7.67956 12.9259L7.67956 13.9728C7.67956 14.1178 7.84474 14.2027 7.96305 14.1178Z" fill="#333333" fill-opacity="0.8" />
            <path d="M10 20C15.5223 20 20 15.5223 20 10C20 4.47768 15.5223 0 10 0C4.47768 0 0 4.47768 0 10C0 15.5223 4.47768 20 10 20ZM10 1.69643C14.5848 1.69643 18.3036 5.41518 18.3036 10C18.3036 14.5848 14.5848 18.3036 10 18.3036C5.41518 18.3036 1.69643 14.5848 1.69643 10C1.69643 5.41518 5.41518 1.69643 10 1.69643Z" fill="#333333" fill-opacity="0.8" />
          </g>
          <defs>
            <clipPath id="clip0_199_814">
              <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 -1 20 20)" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div mt-8 flex="~ justify-around items-center">
        <template v-for="(score, index) in scores" :key="index">
          <div flex="~ col items-center" gap-y-2>
            <TheBarChart :score="score" />
            <p class="text-xs color-[#FFA300] font-medium">
              {{ week[index] }}
            </p>
          </div>
        </template>
      </div>

      <p mt-4.5 text="sm center" class="color-[#FFA300] font-medium">
        本週心情
      </p>
    </div>

    <p m="t-10.5 b-7" color-base font-medium text="base op-80">
      我的一天
    </p>

    <div w-full flex="~ justify-center items-center">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="handleDateMinus">
        <g clip-path="url(#clip0_199_815)">
          <path d="M12.037 5.88215L6.54588 9.85537C6.52307 9.87181 6.50448 9.89344 6.49167 9.91847C6.47885 9.9435 6.47217 9.97122 6.47217 9.99934C6.47217 10.0275 6.47885 10.0552 6.49167 10.0802C6.50448 10.1052 6.52307 10.1269 6.54588 10.1433L12.037 14.1165C12.1553 14.2014 12.3204 14.1165 12.3204 13.9714V12.9246C12.3204 12.6969 12.2111 12.4804 12.0258 12.3464L8.78026 10.0005L12.0258 7.65224C12.2111 7.51831 12.3204 7.30403 12.3204 7.07412V6.02724C12.3204 5.88215 12.1553 5.79733 12.037 5.88215Z" fill="#333333" fill-opacity="0.8" />
          <path d="M10 0C4.47768 0 0 4.47768 0 10C0 15.5223 4.47768 20 10 20C15.5223 20 20 15.5223 20 10C20 4.47768 15.5223 0 10 0ZM10 18.3036C5.41518 18.3036 1.69643 14.5848 1.69643 10C1.69643 5.41518 5.41518 1.69643 10 1.69643C14.5848 1.69643 18.3036 5.41518 18.3036 10C18.3036 14.5848 14.5848 18.3036 10 18.3036Z" fill="#333333" fill-opacity="0.8" />
        </g>
        <defs>
          <clipPath id="clip0_199_815">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <p mx-4.5 color-base text="op-80 sm" font-medium>
        {{ dayjs(selectDate).format('YYYY年MM月DD日') }}
      </p>

      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="handleDatePlus">
        <g clip-path="url(#clip0_199_814)">
          <path d="M7.96305 14.1178L13.4541 10.1446C13.4769 10.1282 13.4955 10.1066 13.5083 10.0815C13.5211 10.0565 13.5278 10.0288 13.5278 10.0007C13.5278 9.97254 13.5211 9.94482 13.5083 9.91979C13.4955 9.89475 13.4769 9.87313 13.4541 9.85668L7.96305 5.88347C7.84474 5.79865 7.67956 5.88347 7.67956 6.02856V7.07543C7.67956 7.30311 7.78894 7.51963 7.97421 7.65356L11.2197 9.99954L7.97421 12.3478C7.78894 12.4817 7.67956 12.696 7.67956 12.9259L7.67956 13.9728C7.67956 14.1178 7.84474 14.2027 7.96305 14.1178Z" fill="#333333" fill-opacity="0.8" />
          <path d="M10 20C15.5223 20 20 15.5223 20 10C20 4.47768 15.5223 0 10 0C4.47768 0 0 4.47768 0 10C0 15.5223 4.47768 20 10 20ZM10 1.69643C14.5848 1.69643 18.3036 5.41518 18.3036 10C18.3036 14.5848 14.5848 18.3036 10 18.3036C5.41518 18.3036 1.69643 14.5848 1.69643 10C1.69643 5.41518 5.41518 1.69643 10 1.69643Z" fill="#333333" fill-opacity="0.8" />
        </g>
        <defs>
          <clipPath id="clip0_199_814">
            <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 -1 20 20)" />
          </clipPath>
        </defs>
      </svg>
    </div>

    <p m="t-8.25 mt-9" text="sm center op-80" color-base font-medium>
      嗨 你今天過得如何呢 ？ 嘗試建立今天的心情吧  ！
    </p>

    <div m="t-8.75 xa" w-fit rounded-1.25 p="y-1.6 x-16" class="bg-[#F3B671]" op-60>
      <p text="base center op-30" color-base>
        開始建立今天的心情
      </p>
    </div>

    <!-- <a-modal
      v-model:open="open"
      width="100%"
      wrap-class-name="full-modal"
      title="新增每日心情"
      :confirm-loading
      @ok="handleOk"
    >
      123
    </a-modal> -->
  </section>
</template>
