<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconMedal from '~/components/icons/IconMedal.vue'
import IconParents from '~/components/icons/IconParents.vue'
import IconNotification from '~/components/icons/IconNotification.vue'
import IconService from '~/components/icons/IconService.vue'

defineOptions({
  name: 'SettingPage',
})

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const menus = [
  {
    icon: IconParents,
    text: '我的父母',
  },
  {
    icon: IconMedal,
    text: '好孕徽章',
  },
  {
    icon: IconNotification,
    text: '通知設定',
  },
  {
    icon: IconService,
    text: '服務介紹',
  },
]
</script>

<template>
  <!-- Back Button -->
  <div p="x-4 b-6.5 t-7.5">
    <RouterLink v-slot="{ navigate }" custom to="/">
      <IconChevronLeft @click="navigate" />
    </RouterLink>
  </div>

  <!-- 寶寶資訊 -->
  <section m="a b-5.75" aspect-ratio-square w-32.5 text-center>
    <img src="/bady.png" alt="bady" class="mb-[1.4375rem]">

    <div pos-relative mxa mb-2 w-fit>
      <p text="lg op-80" color-base leading-snug>
        {{ user?.realName ?? '--' }}
      </p>
      <IconPencil position="absolute top-1/2 right-0" class="translate-6.25 -translate-y-1/2" />
    </div>

    <p text="sm op-80" color-base>
      距離出生 20 天
    </p>
  </section>

  <!-- 分隔線 -->
  <div h-1.5 class="bg-[#F0F0F0]" />

  <!-- Menu -->
  <section p="x-5 t-1" flex="~ col items-center justify-center">
    <template v-for="{ text, icon } in menus" :key="text">
      <div class="group w-80%" p="y-4.5" flex="~ items-center justify-between" border="b [#E9E9E9]">
        <div flex="~ items-center" cursor-pointer gap-x-6>
          <component :is="icon" />
          <p text="xs op-80" class="group-hover:text-[#F3B671]" color-base transition-colors duration-150>
            {{ text }}
          </p>
        </div>

        <IconChevronRight h-a w-1.5 class="group-hover:stroke-[#F3B671]" />
      </div>
    </template>
  </section>
</template>
