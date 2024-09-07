<script setup lang="ts">
import { storeToRefs } from 'pinia'

import type { Ultrasound } from '~/type'

const { id, check = false } = defineProps<Ultrasound & {
  times: string
  check: boolean
}>()

const router = useRouter()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

function go() {
  if (!check)
    return

  router.push(`/diary/ultrasound/${id}`)
}
</script>

<template>
  <li w-full p="x-4.75 y-4.125" border="1 [#DEDEDE]" rounded-6.25 class="shadow-[2px_2px_5px_0px_rgb(217, 217, 217,.25)]" @click="go">
    <div mb-5 flex="~ justify-between items-center">
      <div flex="~ items-center" gap-x-1.25>
        <p text-xs color-primary font-bold>
          第{{ times }}次產檢超音波檢查記錄
        </p>

        <IconCircleCheck v-if="check" />
      </div>

      <div v-if="check" flex="~ items-center gap-1">
        <p text="2.5 [#979797]">
          查看細節記錄
        </p>

        <IconChevronRight h-2.25 w-2.25 />
      </div>
    </div>

    <div w-full flex="~ items-center" gap-x-4.5>
      <div class="w-[40%]" flex="~ col justify-center gap-[1px]">
        <p text-2.5 color-annotation>
          姓名
        </p>
        <p text-2.5 color-base font-medium>
          {{ user?.realName }}
        </p>
      </div>

      <div flex-1 flex="~ col justify-center gap-[1px]" class="w-[20%]">
        <p text-2.5 color-annotation>
          年齡
        </p>
        <p text-2.5 color-base font-medium>
          {{ age }}
        </p>
      </div>

      <div flex-1 flex="~ col justify-center gap-[1px]" class="w-[20%]">
        <p text-2.5 color-annotation>
          妊娠週數
        </p>
        <p text-2.5 color-base font-medium>
          第{{ convertToChineseNumber(gestational_week) }}週
        </p>
      </div>
    </div>

    <hr class="my-2 h-[1px] bg-[#E5E7EB]">

    <template v-if="check">
      <div w-full flex="~ items-center" gap-x-4.5>
        <div
          flex="~ col justify-center gap-[1px]" class="w-40%"
        >
          <p text-2.5 color-annotation>
            預產期
          </p>
          <p text-2.5 color-base font-medium>
            {{ convertToYYYYMMDD(Number(expected_delivery_date), false) }}
          </p>
        </div>

        <div flex="~ col justify-center gap-[1px] w-60%">
          <p text-2.5 color-annotation>
            最後一次月經
          </p>
          <p text-2.5 color-base font-medium>
            {{ convertToYYYYMMDD(Number(last_menstruation_date), false) }}
          </p>
        </div>
      </div>
    </template>
    <template v-else>
      <RouterLink v-slot="{ navigate }" :to="`/diary/ultrasound/${id}`" custom>
        <div border="1 [#FFDCB5]" p="y-1 x-3.75" m="xa" w-fit rounded-1.25 @click="navigate">
          <p color-primary text="base center">
            點我新增超音波資料
          </p>
        </div>
      </RouterLink>
    </template>
  </li>
</template>
