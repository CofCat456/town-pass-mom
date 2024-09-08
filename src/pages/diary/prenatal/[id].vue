<script setup lang="ts">
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { storeToRefs } from 'pinia'
import { error, success } from '~/lib/alart'

import type { Prenatal } from '~/type'

const options = [
  { value: '有異常', label: '有異常' },
  { value: '無異常', label: '無異常' },
]

const route = useRoute('/diary/prenatal/[id]')

const prenatalStore = usePrenatalStore()
const { updatePrenatal } = prenatalStore
const { prenatalDataList } = storeToRefs(prenatalStore)

const times = computed(() => prenatalDataList.value.findIndex(item => item.id === route?.params?.id))
const prenatal = computed(() => times.value === -1 ? null : prenatalDataList.value[times.value])

const editData = ref<Prenatal | null>(null)

const open = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)

function showModal() {
  open.value = true
  editData.value = JSON.parse(JSON.stringify(prenatal.value))
}

function onRangeOk(dates: [string, string] | [Dayjs, Dayjs]) {
  const [start, end] = dates as [Dayjs, Dayjs]

  if (editData.value) {
    editData.value.examination_start_date = String(start.toDate().getTime())
    editData.value.examination_end_date = String(end.toDate().getTime())
  }
}

function onDateOk(value: string | Dayjs) {
  if (editData.value) {
    editData.value.next_checkup_date = String((value as Dayjs).toDate().getTime())
  }
}

async function handleOk() {
  if (editData.value == null)
    return

  try {
    // console.log(editData.value)
    confirmLoading.value = true
    await updatePrenatal(editData.value)

    open.value = false
    success('儲存成功')
  }
  catch {
    error('儲存失敗')
  }
  finally {
    confirmLoading.value = false
  }
}

const title = useTitle()
onMounted(() => {
  title.value = `第${convertToChineseNumber(times.value + 1)}次產檢`
})
</script>

<template>
  <!-- Card -->
  <template v-if="prenatal">
    <div mt-5 px-8>
      <TheExpandPrenatalCard v-bind="prenatal" :times="convertToChineseNumber(times + 1)" @on-edit="showModal" />

      <div p="y-4 x-6.25" border="1 [#DEDEDE]" mt-4 rounded-2xl flex="~ items-center">
        <p text-xs color-primary font-bold>
          下次產檢日期
        </p>
        <p mx-2 text-2.5 color-base>
          |
        </p>
        <p text-2.5 color-base font-medium>
          {{ convertToYYYYMMDD(Number(prenatal.next_checkup_date), false) }}
        </p>
      </div>
    </div>
  </template>

  <a-modal
    v-model:open="open"
    centered
    title="編輯產檢資料"
    :confirm-loading
    @ok="handleOk"
  >
    <div v-if="editData != null" p="y-5">
      <div flex="~ col justify-center" class="scrollbar-hide" h-120 gap-y-6 of-y-auto>
        <!-- 院所 -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            檢查院所 :
          </p>
          <a-input v-model:value="editData.examination_clinic" placeholder="範例：中山醫院" />
        </a-space>

        <!-- 醫師  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            檢查醫師 :
          </p>
          <a-input v-model:value="editData.examination_doctor" placeholder="範例：王大明" />
        </a-space>

        <!-- 檢查日期  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-nowrap text-sm font-roboto>
            檢查日期 :
          </p>
          <a-range-picker
            size="small"
            :show-time="{ format: 'HH:mm' }"
            format="YYYY年MM月DD HH:mm"
            :placeholder="['看診時間', '結束時間']"
            :default-value="[dayjs(Number(editData.examination_start_date)), dayjs(Number(editData.examination_end_date))]"
            @ok="onRangeOk"
          />
        </a-space>

        <!-- 懷孕週數  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            懷孕週數 :
          </p>
          <a-input v-model:value="editData.pregnancy_week" placeholder="範例：12" />
        </a-space>

        <!-- 體重kg  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            體重kg :
          </p>
          <a-input v-model:value="editData.weight" placeholder="範例：58" />
        </a-space>

        <!-- 血壓kg  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            血壓kg :
          </p>
          <a-input v-model:value="editData.blood_pressure" placeholder="範例：92/56" />
        </a-space>

        <!-- 尿糖  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            尿糖 :
          </p>
          <a-select
            v-model:value="editData.urine_sugar"
            style="width: 120px"
            :options
          />
        </a-space>

        <!-- 尿蛋白  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            尿蛋白 :
          </p>
          <a-select
            v-model:value="editData.urine_protein"
            style="width: 120px"
            :options
          />
        </a-space>

        <!-- 浮腫  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            浮腫 :
          </p>
          <a-select
            v-model:value="editData.edema"
            style="width: 120px"
            :options
          />
        </a-space>

        <!-- 靜脈曲張  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            靜脈曲張 :
          </p>
          <a-select
            v-model:value="editData.varicose_veins"
            style="width: 120px"
            :options
          />
        </a-space>

        <!-- 備註  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            備註 :
          </p>
          <a-select
            v-model:value="editData.remarks"
            style="width: 120px"
            :options
          />
        </a-space>

        <!-- 下次產檢日期  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-nowrap text-sm font-roboto>
            下次產檢日期 :
          </p>
          <a-date-picker :value="dayjs(Number(editData.next_checkup_date))" @change="onDateOk" />
        </a-space>
      </div>
    </div>
  </a-modal>
</template>
