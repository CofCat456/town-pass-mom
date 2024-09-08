<script setup lang="ts">
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { storeToRefs } from 'pinia'
import { error, success } from '~/lib/alart'

import type { Ultrasound } from '~/type'

const route = useRoute('/diary/ultrasound/[id]')

const ultrasoundStore = useUltrasoundStore()
const { updateUltrasound } = ultrasoundStore
const { ultransoundDataList } = storeToRefs(ultrasoundStore)

const times = computed(() => ultransoundDataList.value.findIndex(item => item.id === route?.params?.id))
const prenatal = computed(() => times.value === -1 ? null : ultransoundDataList.value[times.value])

const editData = ref<Ultrasound | null>(null)
const open = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)

function showModal() {
  open.value = true
  editData.value = JSON.parse(JSON.stringify(prenatal.value))
}

const { open: openDialog, onChange } = useFileDialog({
  accept: 'image/*',
  directory: false,
})

onChange((_files) => {
  // console.log(files)
})

function onExpectedDeliveryDateOk(value: string | Dayjs) {
  if (editData.value) {
    editData.value.expected_delivery_date = String((value as Dayjs).toDate().getTime())
  }
}

function onLastMenstruationDateOk(value: string | Dayjs) {
  if (editData.value) {
    editData.value.last_menstruation_date = String((value as Dayjs).toDate().getTime())
  }
}

async function handleOk() {
  if (editData.value == null)
    return

  try {
    // console.log('editr', editData.value)
    confirmLoading.value = true
    await updateUltrasound(editData.value)

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
  title.value = `第${convertToChineseNumber(times.value + 1)}次產檢超音波檢查記錄`
})
</script>

<template>
  <!-- Card -->
  <template v-if="prenatal">
    <div mt-5 px-8>
      <TheExpandUltrasoundCard v-bind="prenatal" :times="convertToChineseNumber(times + 1)" @on-edit="showModal" />

      <div p="5.5" border="1 [#DEDEDE]" mt-4 w-full rounded-6.25 class="217, 217,.25)] shadow-[2px_2px_5px_0px_rgb(217,">
        <p text-xs color-primary font-bold>
          超音波照片
        </p>

        <div pos-relative mxa my-13 h-32 w-48 border="1 [#D9D9D9]" @click="() => openDialog()">
          <div flex="~ col items-center" w-full gap-y-3 position="absolute left-1/2 top-1/2" class="-translate-x-1/2 -translate-y-1/2">
            <IconPlus />
            <p font-roboto text="op-85 black sm">
              上傳您的超音波照片
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>

  <a-modal
    v-model:open="open"
    centered
    title="編輯超音波資料"
    :confirm-loading
    @ok="handleOk"
  >
    <div v-if="editData != null" p="y-5">
      <div flex="~ col justify-center" h-120 gap-y-6 of-y-auto>
        <!-- 年齡 -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            年齡 :
          </p>
          <a-input v-model:value="editData.age" placeholder="範例：28" />
        </a-space>

        <!-- 醫師  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            妊娠週數 :
          </p>
          <a-input v-model:value="editData.estimated_fetal_weeks!" placeholder="範例：第16週" />
        </a-space>

        <!-- 預產期  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-nowrap text-sm font-roboto>
            預產期 :
          </p>
          <a-date-picker :value="dayjs(Number(editData.expected_delivery_date))" @change="onExpectedDeliveryDateOk" />
        </a-space>

        <!-- 最後一次月經  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-nowrap text-sm font-roboto>
            最後一次月經 :
          </p>
          <a-date-picker dayjs(Number(editData.value.last_menstruation_date)) @change="onLastMenstruationDateOk" />
        </a-space>

        <!-- 醫師  -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            胎數 :
          </p>
          <a-input-number v-model:value="editData.fetus_count" :min="1" :max="10" />
        </a-space>

        <!-- 胎兒心跳 -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            胎兒心跳 :
          </p>
          <a-select
            v-model:value="editData.fetal_heartbeat"
            style="width: 120px"
            :options="[
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]"
          />
        </a-space>

        <!-- 著床位置 -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            著床位置 :
          </p>
          <a-select
            v-model:value="editData.fetal_position"
            style="width: 120px"
            :options="[
              {
                value: '正常',
                label: '正常',
              },
              { value: '異常', label: '異常' },
            ]"
          />
        </a-space>

        <!-- 胎兒頭臀長/超音波週數  -->
        <div flex="~ items-center" gap-1.5>
          <div flex="~ justify-end items-start" w-24 flex-shrink-0 gap-0.5>
            <span text-right text-nowrap text-sm font-roboto>
              胎兒頭臀長
              <br>
              /超音波週數
            </span>
            <p text-right text-nowrap text-sm font-roboto>
              :
            </p>
          </div>
          <a-input placeholder="範例：6.9cm/16週" />
        </div>

        <!-- 胎兒頭臀長/超音波週數  -->
        <div flex="~ items-center" gap-1.5>
          <div flex="~ justify-end items-start" w-24 flex-shrink-0 gap-0.5>
            <span text-right text-nowrap text-sm font-roboto>
              胎兒頭雙頂骨
              <br>
              /超音波週數
            </span>
            <p text-right text-nowrap text-sm font-roboto>
              :
            </p>
          </div>
          <a-input placeholder="範例：6.9cm/16週" />
        </div>

        <!-- 篩檢結果 -->
        <a-space direction="horizontal">
          <p w-24 text-right text-sm font-roboto>
            篩檢結果 :
          </p>
          <a-select
            v-model:value="editData.screening_result"
            style="width: 120px"
            :options="[
              {
                value: '常規產檢',
                label: '常規產檢',
              },
              { value: '需進一步追蹤檢查', label: '需進一步追蹤檢查' },
            ]"
          />
        </a-space>
      </div>
    </div>
  </a-modal>
</template>
