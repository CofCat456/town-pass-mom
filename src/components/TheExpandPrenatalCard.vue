<script setup lang="ts">
import type { Prenatal } from '~/type'

const { examination_start_date } = defineProps<Prenatal & {
  times: string
}>()

const emit = defineEmits<{
  onEdit: []
}>()

onMounted(() => {
  if (examination_start_date.length === 0)
    emit('onEdit')
})
</script>

<template>
  <div w-full p="x-5.5 t-5.25 b-7.25" border="1 [#DEDEDE]" rounded-6.25 class="217, 217,.25)] shadow-[2px_2px_5px_0px_rgb(217,">
    <div mb-3.75 flex="~ items-center" gap-x-1>
      <p text-sx color-primary font-bold>
        第{{ times }}次產檢
      </p>

      <IconPencil @click="$emit('onEdit')" />
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

    <div mt-4 w-full flex="~ items-center" gap-x-4.5>
      <div class="w-[40%]" flex="~ col justify-center gap-[1px]">
        <p text-2.5 color-annotation>
          檢查院所
        </p>
        <p text-2.5 color-base font-medium>
          {{ examination_clinic.length === 0 ? '----------' : examination_clinic }}
        </p>
      </div>

      <div flex-1 flex="~ col justify-center gap-[1px]" class="w-[20%]">
        <p text-2.5 color-annotation>
          檢查醫師
        </p>
        <p text-2.5 color-base font-medium>
          {{ examination_doctor.length === 0 ? '----------' : examination_doctor }}
        </p>
      </div>

      <div flex-1 flex="~ col justify-center gap-[1px]" class="w-[20%]">
        <p text-2.5 color-annotation>
          檢查日期
        </p>
        <p text-2.5 color-base font-medium>
          {{ examination_start_date ? convertToYYYYMMDD(Number(examination_start_date) * 1000, false) : '----------' }}
        </p>
      </div>
    </div>

    <hr m="t-3.75 b-2.25" class="h-[1px] bg-[#E5E7EB]">

    <div flex="~ col" gap-y-4>
      <div w-full flex="~ items-center" gap-x-4.5>
        <div
          flex="~ col justify-center gap-[1px]" class="w-40%"
        >
          <p text-2.5 color-annotation>
            懷孕週數
          </p>
          <p text-2.5 color-base font-medium>
            {{ pregnancy_week.length === 0 ? '----------' : pregnancy_week }}
          </p>
        </div>

        <div flex="~ col justify-center gap-[1px] w-60%">
          <p text-2.5 color-annotation>
            體重(kg)
          </p>
          <p text-2.5 color-base font-medium>
            {{ weight.length === 0 ? '----------' : weight }}
          </p>
        </div>
      </div>

      <div w-full flex="~ items-center" gap-x-4.5>
        <div
          flex="~ col justify-center gap-[1px]" class="w-40%"
        >
          <p text-2.5 color-annotation>
            血壓(mmHg)
          </p>
          <p text-2.5 color-base font-medium>
            {{ blood_pressure.length === 0 ? '----------' : blood_pressure }}
          </p>
        </div>

        <div flex="~ col justify-center gap-[1px] w-60%">
          <p text-2.5 color-annotation>
            胎心音 (次 /分 )
          </p>
          <p text-2.5 color-base font-medium>
            {{ fetal_heart_sound.length === 0 ? '----------' : fetal_heart_sound }}
          </p>
        </div>
      </div>

      <div w-full flex="~ items-center" gap-x-4.5>
        <div
          flex="~ col justify-center gap-[1px]" class="w-40%"
        >
          <p text-2.5 color-annotation>
            尿糖
          </p>
          <p text-2.5 color-base font-medium>
            {{ urine_sugar.length === 0 ? '----------' : urine_sugar }}
          </p>
        </div>

        <div flex="~ col justify-center gap-[1px] w-60%">
          <p text-2.5 color-annotation>
            尿蛋白
          </p>
          <p text-2.5 color-base font-medium>
            {{ urine_protein.length === 0 ? '----------' : urine_protein }}
          </p>
        </div>
      </div>

      <div w-full flex="~ items-center" gap-x-4.5>
        <div
          flex="~ col justify-center gap-[1px]" class="w-40%"
        >
          <p text-2.5 color-annotation>
            浮腫
          </p>
          <p text-2.5 color-base font-medium>
            {{ edema.length === 0 ? '----------' : edema }}
          </p>
        </div>

        <div flex="~ col justify-center gap-[1px] w-60%">
          <p text-2.5 color-annotation>
            靜脈曲張
          </p>
          <p text-2.5 color-base font-medium>
            {{ varicose_veins.length === 0 ? '----------' : varicose_veins }}
          </p>
        </div>
      </div>

      <div w-full flex="~ items-center" gap-x-4.5>
        <div
          flex="~ col justify-center gap-[1px]" class="w-40%"
        >
          <p text-2.5 color-annotation>
            備註
          </p>
          <p text-2.5 color-base font-medium>
            {{ remarks.length === 0 ? '----------' : remarks }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
