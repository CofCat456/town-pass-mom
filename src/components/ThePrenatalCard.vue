<script setup lang="ts">
import type { Prenatal } from '~/type'

const { id, check = false } = defineProps<Prenatal & {
  times: string
  check: boolean
}>()

const router = useRouter()

function go() {
  if (!check)
    return

  router.push(`/diary/prenatal/${id}`)
}
</script>

<template>
  <li w-full p="x-4.75 y-4.125" border="1 [#DEDEDE]" rounded-6.25 class="shadow-[2px_2px_5px_0px_rgb(217, 217, 217,.25)]" @click="go">
    <div mb-5 flex="~ justify-between items-center">
      <div flex="~ items-center" gap-x-1.25>
        <p text-xs color-primary font-bold>
          第{{ times }}次產檢
        </p>

        <IconCircleCheck v-if="check" />
      </div>

      <div v-if="check" flex="~ items-center gap-1">
        <p text="2.5 [#979797]">
          查看產檢細節記錄
        </p>

        <IconChevronRight h-2.25 w-2.25 />
      </div>
    </div>

    <div w-full flex="~ items-center" gap-x-4.5>
      <div
        flex="~ col justify-center gap-[1px]" class="w-40%"
      >
        <p text-2.5 color-annotation>
          給付時程
        </p>
        <p text-2.5 color-base font-medium>
          妊娠第一期 ( 未滿 13 週 )
        </p>
      </div>

      <div flex="~ col justify-center gap-[1px] w-60%">
        <p text-2.5 color-annotation>
          建議週數
        </p>
        <p text-2.5 color-base font-medium>
          第{{ suggested_weeks }}週
        </p>
      </div>
    </div>

    <hr class="h-[1px] bg-[#DEDEDE] bg-op-70" :class="examination_start_date.length === 0 ? 'mt-2 mb-4' : 'my-2'">

    <template v-if="check">
      <div w-full flex="~ items-center" gap-x-4.5>
        <div class="w-[45%]" flex="~ col justify-center gap-[1px]">
          <p text-2.5 color-annotation>
            檢查院所
          </p>
          <p text-2.5 color-base font-medium>
            {{ examination_clinic }}
          </p>
        </div>

        <div flex="~ col justify-center gap-[1px]" class="w-[25%]">
          <p text-2.5 color-annotation>
            檢查醫師
          </p>
          <p text-2.5 color-base font-medium>
            {{ examination_doctor }}
          </p>
        </div>

        <div flex="~ col justify-center gap-[1px]" class="w-[30%]">
          <p text-2.5 color-annotation>
            檢查日期
          </p>
          <p text-2.5 color-base font-medium>
            {{ convertToYYYYMMDD(Number(examination_start_date), false) }}
          </p>
        </div>
      </div>
    </template>
    <template v-else>
      <RouterLink v-slot="{ navigate }" :to="`/diary/prenatal/${id}`" custom>
        <div border="1 [#FFDCB5]" p="y-1 x-3.75" m="xa" w-fit rounded-1.25 @click="navigate">
          <p color-primary text="base center">
            點我新增產檢資料
          </p>
        </div>
      </RouterLink>
    </template>
  </li>
</template>
