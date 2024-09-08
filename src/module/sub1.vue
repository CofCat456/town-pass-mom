<script lang="ts">
</script>

<script setup lang="ts">
import { Modal, type SelectProps } from 'ant-design-vue'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'

const data = ['碳水', '蛋白質', '脂肪', '葉酸', '維生素 B', '鐵', '鋅', '鈣']

const now = useNow()

const foodStore = useFoodStore()
const { createFood } = foodStore
const { foodDataList } = storeToRefs(foodStore)

// const breakfast = computed(() => mealDataList.value.filter(meal => meal.text === '早餐'))
// const lunch = computed(() => mealDataList.value.filter(meal => meal.text === '午餐'))
// const dinner = computed(() => mealDataList.value.filter(meal => meal.text === '晚餐'))

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const selectInfoDate = ref(now.value)
const selectFoodDate = ref(now.value)
const selectDateType = ref<'day' | 'week' | 'moon'>('day')

function handleInfoDateMinus() {
  selectInfoDate.value = dayjs(selectInfoDate.value).subtract(1, 'day').toDate()
}

function handleInfoDatePlus() {
  selectInfoDate.value = dayjs(selectInfoDate.value).add(1, 'day').toDate()
}

function handleFoodDateMinus() {
  selectFoodDate.value = dayjs(selectFoodDate.value).subtract(1, 'day').toDate()
}

function handleFoodDatePlus() {
  selectFoodDate.value = dayjs(selectFoodDate.value).add(1, 'day').toDate()
}

const nutrient = ref({
  carbohydrate: 20,
  protein: 16,
  fat: 10,
  folate: 10,
  calcium: 20,
  zinc: 12,
  iron: 18,
  vitaminB: 22,
})

watch(selectInfoDate, () => {
  nutrient.value = {
    carbohydrate: Math.floor(Math.random() * 40),
    protein: Math.floor(Math.random() * 40),
    fat: Math.floor(Math.random() * 40),
    folate: Math.floor(Math.random() * 40),
    calcium: Math.floor(Math.random() * 40),
    zinc: Math.floor(Math.random() * 40),
    iron: Math.floor(Math.random() * 40),
    vitaminB: Math.floor(Math.random() * 40),
  }
})

const open = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)

function showModal() {
  open.value = true
}

async function handleOk() {
  if (user.value == null)
    return

  try {
    confirmLoading.value = true
    await createFood({
      user_info_id: user.value.id,
      meal_date: dayjs().format('YYYY-MM-DD'),
      meal_name: searchFood.value,
    })
    open.value = false
    Modal.success({ title: '新增成功' })
  }
  catch {
    Modal.error({ title: '新增失敗' })
  }
  finally {
    confirmLoading.value = false
  }
}

const searchFood = ref('')

const options = computed<SelectProps['options']>(() => foodDataList.value.map(food => ({
  label: food,
  value: food,
})))

function filterOption(input: string, option: any) {
  return option.value.toLowerCase().includes(input.toLowerCase())
}
</script>

<template>
  <section h-full w-full>
    <div m="t-8" rounded-base p-5 border="1 [#DEDEDE] op-70">
      <div flex="~ items-center justify-between">
        <a-select
          v-model:value="selectDateType"
          style="width: 120px"
          :options="[
            {
              label: '本日',
              value: 'day',
            },
            {
              label: '本週',
              value: 'week',
              disabled: true,
            },
            {
              label: '本月',
              value: 'moon',
              disabled: true,
            },
          ]"
        />

        <div flex="~ items-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="handleInfoDateMinus">
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
            {{ dayjs(selectInfoDate).format('YYYY年MM月DD日') }}
          </p>

          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="handleInfoDatePlus">
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
      </div>

      <div m="t-7 b-4.25" flex="~ justify-center items-center gap-5.5">
        <div flex-1 />
        <TheProgressCircle :reverse="false" secondary-color="#EFEFEF" :size="150" :total="3" :current="1" :stroke-width="15">
          <div flex="~ col items-center justify-center" gap-y-4>
            <p color-base font-medium text="base op-80">
              剩餘
            </p>
            <p color-base font-medium text="base op-80">
              2100 大卡
            </p>
          </div>
        </TheProgressCircle>

        <div flex-1 flex="~ col items-center justify-center">
          <p text-xs color-base text-op-80 font-medium>
            卡路里
          </p>
          <TheProgressCircle secondary-color="#EFEFEF" main-color="#FF8826" :size="24" :total="3" :current="1" :stroke-width="5" m="t-3 b-1.5" />
          <p color-base font-medium text="xs op-80">
            3200 大卡
          </p>
        </div>
      </div>

      <div flex="~ items-center justify-center" gap-x-6.25>
        <div flex="~ col items-center justify-start">
          <p text-xs color-base text-op-80 font-medium>
            碳水
          </p>
          <TheProgressCircle secondary-color="#EFEFEF" main-color="#FF8826" :size="24" :total="40" :current="nutrient.carbohydrate" :stroke-width="5" m="t-3 b-1.5" />
          <p color-base font-medium text="xs op-80">
            {{ nutrient.carbohydrate }}/40 克
          </p>
        </div>

        <div flex="~ col items-center justify-start">
          <p text-xs color-base text-op-80 font-medium>
            脂肪
          </p>
          <TheProgressCircle secondary-color="#EFEFEF" main-color="#0BA34D" :size="24" :total="40" :current="nutrient.fat" :stroke-width="5" m="t-3 b-1.5" />
          <p color-base font-medium text="xs op-80">
            {{ nutrient.fat }}/40 克
          </p>
        </div>
        <div flex="~ col items-center justify-start">
          <p text-xs color-base text-op-80 font-medium>
            蛋白質
          </p>
          <TheProgressCircle secondary-color="#EFEFEF" main-color="#FF4326" :size="24" :total="40" :current="nutrient.protein" :stroke-width="5" m="t-4 b-0.75" />
          <p color-base font-medium text="xs op-80">
            {{ nutrient.protein }}/40 克
          </p>
        </div>
      </div>

      <div grid="~ cols-2" mt-5.5 w-full gap-x-6.25 gap-y-5>
        <div flex="~ items-center justify-start">
          <p w-10 text-xs color-base text-op-80 font-medium>
            葉酸
          </p>
          <TheProgressCircle secondary-color="#EFEFEF" main-color="#9B9B9B" :size="24" :total="40" :current="nutrient.folate" :stroke-width="5" m="x-3.75" />
          <p color-base font-medium text="xs op-80">
            {{ nutrient.folate }}/40 克
          </p>
        </div>

        <div flex="~ items-center justify-start">
          <p w-10 text-xs color-base text-op-81 font-medium>
            維生素
          </p>
          <TheProgressCircle secondary-color="#EFEFEF" main-color="#9B9B9B" :size="24" :total="40" :current="nutrient.vitaminB" :stroke-width="5" m="x-3.75" />
          <p color-base font-medium text="xs op-80">
            {{ nutrient.vitaminB }}/40 克
          </p>
        </div>

        <div flex="~ items-center justify-start">
          <p w-10 text-xs color-base text-op-80 font-medium>
            葉酸
          </p>
          <TheProgressCircle secondary-color="#EFEFEF" main-color="#9B9B9B" :size="24" :total="40" :current="nutrient.folate" :stroke-width="5" m="x-3.75" />
          <p color-base font-medium text="xs op-80">
            {{ nutrient.folate }}/40 克
          </p>
        </div>

        <div flex="~ items-center justify-start">
          <p w-10 text-xs color-base text-op-80 font-medium>
            鈣
          </p>
          <TheProgressCircle secondary-color="#EFEFEF" main-color="#9B9B9B" :size="24" :total="40" :current="nutrient.calcium" :stroke-width="5" m="x-3.75" />
          <p color-base font-medium text="xs op-80">
            {{ nutrient.calcium }}/40 克
          </p>
        </div>
        <div flex="~ items-center justify-start">
          <p w-10 text-xs color-base text-op-80 font-medium>
            鋅
          </p>
          <TheProgressCircle secondary-color="#EFEFEF" main-color="#9B9B9B" :size="24" :total="40" :current="nutrient.zinc" :stroke-width="5" m="x-3.75" />
          <p color-base font-medium text="xs op-80">
            {{ nutrient.zinc }}/40 克
          </p>
        </div>
        <div flex="~ items-center justify-start">
          <p w-10 text-xs color-base text-op-80 font-medium>
            葉酸
          </p>
          <TheProgressCircle secondary-color="#EFEFEF" main-color="#9B9B9B" :size="24" :total="40" :current="nutrient.iron" :stroke-width="5" m="x-3.75" />
          <p color-base font-medium text="xs op-80">
            {{ nutrient.iron }}/40 克
          </p>
        </div>
      </div>
    </div>

    <p m="t-8 b-7" color-base font-medium text="base op-80">
      我的每日食物
    </p>

    <div w-full flex="~ justify-center items-center">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="handleFoodDateMinus">
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
        {{ dayjs(selectFoodDate).format('YYYY年MM月DD日') }}
      </p>

      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="handleFoodDatePlus">
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

    <div flex="~ col" h-full w-full gap-y-4>
      <div p="x-3.75 y-4.5" border="1 [#DEDEDE]" pos-relative mt-7 rounded="tl-lg tr-lg" flex="~ justify-between items-center">
        <div flex="~ items-center justify-center" gap-x-3>
          <IconSun />
          <p text-base color-primary font-bold>
            早餐
          </p>
        </div>

        <div flex="~ items-center justify-center" gap-x-10>
          <p color-base text="sm op-70" font-medium>
            350 大卡
          </p>

          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" @click="showModal">
            <path d="M11.5001 21.0441C6.22909 21.0441 1.95605 16.771 1.95605 11.5001C1.95605 6.22913 6.22909 1.95605 11.5001 1.95605C16.7711 1.95605 21.0441 6.22911 21.0441 11.5001C21.0441 16.771 16.7711 21.0441 11.5001 21.0441ZM16.2721 10.5456H12.4545V6.72817H10.5457V10.5456H6.72806V12.4546H10.5457V16.2722H12.4545V12.4546H16.2721V10.5456Z" fill="#F3B671" />
          </svg>
        </div>

        <div w-full position="absolute bottom-0 left-0 right-0" py-1 class="translate-y-100%" border="1 [#DEDEDE] op-70" rounded="bl-lg br-lg">
          <div px-3 text-2.5 color-base text-op-80 flex="~ items-center justify-end" class="gap-2.5">
            <p v-for="item in data" :key="item">
              {{ item }}
            </p>

            <IconChevronBottom />
          </div>
        </div>
      </div>

      <div p="x-3.75 y-4.5" border="1 [#DEDEDE]" pos-relative mt-7 rounded="tl-lg tr-lg" flex="~ justify-between items-center">
        <div flex="~ items-center justify-center" gap-x-3>
          <IconNoon />
          <p text-base color-primary font-bold>
            午餐
          </p>
        </div>

        <div flex="~ items-center justify-center" gap-x-10>
          <p color-base text="sm op-70" font-medium>
            350 大卡
          </p>

          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" @click="showModal">
            <path d="M11.5001 21.0441C6.22909 21.0441 1.95605 16.771 1.95605 11.5001C1.95605 6.22913 6.22909 1.95605 11.5001 1.95605C16.7711 1.95605 21.0441 6.22911 21.0441 11.5001C21.0441 16.771 16.7711 21.0441 11.5001 21.0441ZM16.2721 10.5456H12.4545V6.72817H10.5457V10.5456H6.72806V12.4546H10.5457V16.2722H12.4545V12.4546H16.2721V10.5456Z" fill="#F3B671" />
          </svg>
        </div>

        <div w-full position="absolute bottom-0 left-0 right-0" py-1 class="translate-y-100%" border="1 [#DEDEDE] op-70" rounded="bl-lg br-lg">
          <div px-3 text-2.5 color-base text-op-80 flex="~ items-center justify-end" class="gap-2.5">
            <p v-for="item in data" :key="item">
              {{ item }}
            </p>

            <IconChevronBottom />
          </div>
        </div>
      </div>

      <div p="x-3.75 y-4.5" border="1 [#DEDEDE]" pos-relative mt-7 rounded="tl-lg tr-lg" flex="~ justify-between items-center">
        <div flex="~ items-center justify-center" gap-x-3>
          <IconRight />
          <p text-base color-primary font-bold>
            晚餐
          </p>
        </div>

        <div flex="~ items-center justify-center" gap-x-10>
          <p color-base text="sm op-70" font-medium>
            350 大卡
          </p>

          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" @click="showModal">
            <path d="M11.5001 21.0441C6.22909 21.0441 1.95605 16.771 1.95605 11.5001C1.95605 6.22913 6.22909 1.95605 11.5001 1.95605C16.7711 1.95605 21.0441 6.22911 21.0441 11.5001C21.0441 16.771 16.7711 21.0441 11.5001 21.0441ZM16.2721 10.5456H12.4545V6.72817H10.5457V10.5456H6.72806V12.4546H10.5457V16.2722H12.4545V12.4546H16.2721V10.5456Z" fill="#F3B671" />
          </svg>
        </div>

        <div w-full position="absolute bottom-0 left-0 right-0" py-1 class="translate-y-100%" border="1 [#DEDEDE] op-70" rounded="bl-lg br-lg">
          <div px-3 text-2.5 color-base text-op-80 flex="~ items-center justify-end" class="gap-2.5">
            <p v-for="item in data" :key="item">
              {{ item }}
            </p>

            <IconChevronBottom />
          </div>
        </div>
      </div>

      <a-modal
        v-model:open="open"
        width="100%"
        wrap-class-name="full-modal"
        title="新增每日飲食"
        :confirm-loading
        @ok="handleOk"
      >
        <a-select
          v-model:value="searchFood"
          show-search
          placeholder="選擇一個食物"
          style="width: 200px"
          :options="options"
          :filter-option="filterOption"
        />
      </a-modal>
    </div>
  </section>
</template>
