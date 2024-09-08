<script lang="ts">
</script>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { manuals } from '~/data/manual'

type Tab = 'pregnancy' | 'ultrasound' | 'education'

defineOptions({
  name: 'DiaryAllPage',
})

const prenatalStore = usePrenatalStore()
const { prenatalDataList } = storeToRefs(prenatalStore)

const ultrasoundStore = useUltrasoundStore()
const { ultransoundDataList } = storeToRefs(ultrasoundStore)

const navs: {
  id: Tab
  text: string
}[] = [
  {
    id: 'pregnancy',
    text: '產前紀錄',
  },
  {
    id: 'ultrasound',
    text: '超音波記錄',
  },
  {
    id: 'education',
    text: '孕婦衛教手冊',
  },
]
const tab = ref<Tab>('pregnancy')

const title = useTitle()
onMounted(() => {
  title.value = '產檢日誌'
})
</script>

<template>
  <ul flex="~ justify-center items-center" gap-8 border="b [#000000] op-6" p="x-4 t-6">
    <li
      v-for="nav in navs"
      :key="nav.id"
      flex="~ items-center justify-between"
      transition="all duration-150"
      gap-3 border-b-2 py-3
      :class="tab === nav.id ? 'border-[#F3B671]' : 'border-transparent'"
      @click="tab = nav.id"
    >
      <p font-roboto text="op-85 sm" :class="tab === nav.id ? 'color-primary' : 'color-base op-20'">
        {{ nav.text }}
      </p>
    </li>
  </ul>

  <Transition name="fade" mode="out-in">
    <!-- 產前紀錄 -->
    <template v-if="tab === 'pregnancy'">
      <ul flex="~ col" gap-y-3.75 p="x-8 t-8 b-36">
        <template v-for="prenatal, index in prenatalDataList" :key="prenatal.id">
          <ThePrenatalCard :check="prenatal.examination_start_date.length !== 0" :times="convertToChineseNumber(index + 1)" v-bind="prenatal" />
        </template>
      </ul>
    </template>

    <!-- 超音波記錄 -->
    <template v-else-if="tab === 'ultrasound'">
      <ul flex="~ col" gap-y-3.75 p="x-8 t-8 b-36">
        <template v-for="ultrasound, index in ultransoundDataList" :key="ultrasound.id">
          <TheUltrasoundCard :check="ultrasound.last_menstruation_date.length === 0" :times="convertToChineseNumber(index + 1)" v-bind="ultrasound" />
        </template>
      </ul>
    </template>

    <!-- 孕婦衛教手冊 -->
    <template v-else>
      <div flex="~ col items-center justify-center" m="t-7 xa" w-78>
        <div flex="~ items-center" gap-x-8.25>
          <img src="/bady_book.png" alt="bady_book">
          <div flex="~ col" gap-1.5>
            <p text-base color-primary font-bold>
              產檢衛教
            </p>
            <p text-2.5 color-annotation>
              產檢衛教是透過提供全面的健康資訊和支持，幫助孕婦安全、健康地度過孕期，並
              為迎接新生命做好充分準備!
            </p>
          </div>
        </div>

        <!-- 按鈕 -->
        <div mt-7 w-full grid="~ cols-[1fr_1fr]" gap-x-4 gap-y-3>
          <template v-for="manual, index in manuals" :key="manual">
            <div border="1 [#FFDCB5]" p="y-1.625" rounded-1.25>
              <a :href="manual">
                <p color-primary text="base center">
                  第{{ convertToChineseNumber(index + 1) }}次產檢衛教
                </p>
              </a>
            </div>
          </template>
        </div>
      </div>
    </template>
  </Transition>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.4s;
}

.fade-leave-active {
  transition: opacity 0.05s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
