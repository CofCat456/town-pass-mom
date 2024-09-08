<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Ultrasound } from '~/type'

const { last_menstruation_date } = defineProps<Ultrasound & {
  times: string
}>()

const emit = defineEmits<{
  onEdit: []
}>()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(() => {
  if (last_menstruation_date.length === 0)
    emit('onEdit')
})
</script>

<template>
  <div w-full p="x-5.5 t-5.25 b-7.25" border="1 [#DEDEDE]" rounded-6.25 class="217, 217,.25)] shadow-[2px_2px_5px_0px_rgb(217,">
    <div mb-3.75 flex="~ items-center" gap-x-1>
      <p text-sx color-primary font-bold>
        第{{ times }}次產檢超音波檢查記錄
      </p>

      <IconPencil @click="$emit('onEdit')" />
    </div>

    <div flex="~ items-center" mb-4 w-full gap-x-4.5>
      <div class="w-[45%]" flex="~ col justify-center gap-[1px]">
        <p text-2.5 color-annotation>
          姓名
        </p>
        <p text-2.5 color-base font-medium>
          {{ user?.realName }}
        </p>
      </div>

      <div flex="~ col justify-center gap-[1px]" class="w-[25%]">
        <p text-2.5 color-annotation>
          年齡
        </p>
        <p text-2.5 color-base font-medium>
          {{ age || '----------' }}
        </p>
      </div>

      <div flex="~ col justify-center gap-[1px]" class="w-[30%]">
        <p text-2.5 color-annotation>
          妊娠週數
        </p>
        <p text-2.5 color-base font-medium>
          第{{ convertToChineseNumber(gestational_week) }}週
        </p>
      </div>
    </div>

    <div w-full flex="~ items-center" gap-x-4.5>
      <div
        flex="~ col justify-center gap-[1px]" class="w-40%"
      >
        <p text-2.5 color-annotation>
          預產期
        </p>
        <p text-2.5 color-base font-medium>
          {{ expected_delivery_date ? convertToYYYYMMDD(Number(expected_delivery_date), false) : '----------' }}
        </p>
      </div>

      <div flex="~ col justify-center gap-[1px]" class="w-60%">
        <p text-2.5 color-annotation>
          最後一次月經
        </p>
        <p text-2.5 color-base font-medium>
          {{ last_menstruation_date ? convertToYYYYMMDD(Number(last_menstruation_date), false) : '----------' }}
        </p>
      </div>
    </div>

    <hr m="t-3.75 b-2.25" class="h-[1px] bg-[#E5E7EB]">

    <div flex="~ col" gap-y-4>
      <div w-full flex="~ items-center" gap-x-4.5>
        <div
          flex="~ col justify-center gap-[1px]" class="w-50%"
        >
          <p text-2.5 color-annotation>
            胎數
          </p>
          <p text-2.5 color-base font-medium>
            {{ estimated_fetal_weeks == null ? '----------' : estimated_fetal_weeks }}
          </p>
        </div>

        <div flex="~ col justify-center gap-[1px] w-50%">
          <p text-2.5 color-annotation>
            胎兒心跳
          </p>
          <p text-2.5 color-base font-medium>
            0
          </p>
        </div>
      </div>

      <div w-full flex="~ items-center" gap-x-4.5>
        <div
          flex="~ col justify-center gap-[1px]" class="w-50%"
        >
          <p text-2.5 color-annotation>
            著床位置
          </p>
          <p text-2.5 color-base font-medium>
            {{ placental_location.length === 0 ? '----------' : placental_location }}
          </p>
        </div>

        <div flex="~ col justify-center gap-[1px] w-50%">
          <p text-2.5 color-annotation>
            胎心音 (次 /分 )
          </p>
          <p text-2.5 color-base font-medium>
            0
          </p>
        </div>
      </div>

      <div w-full flex="~ items-center" gap-x-4.5>
        <div
          flex="~ col justify-center gap-[1px]" class="w-50%"
        >
          <p text-2.5 color-annotation>
            胎兒頭雙頂骨徑/超音波週數
          </p>
          <p text-2.5 color-base font-medium>
            0
          </p>
        </div>

        <div flex="~ col justify-center gap-[1px] w-50%">
          <p text-2.5 color-annotation>
            篩檢結果
          </p>
          <p text-2.5 color-base font-medium>
            {{ screening_result.length === 0 ? '----------' : screening_result }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
