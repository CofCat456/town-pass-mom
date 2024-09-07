<script setup lang="ts">
import IconHome from './icons/IconHome.vue'
import IconDiary from './icons/IconDiary.vue'
import IconData from './icons/IconData.vue'
import IconQuote from './icons/IconQuote.vue'

const route = useRoute()

const navs = [
  {
    name: '首頁',
    path: '/',
    icon: IconHome,
    activeList: ['/', '/setting'],
  },
  {
    name: '育兒日誌',
    path: '/diary',
    icon: IconDiary,
    activeList: ['/diary/', '/diary/all', '/diary/prenatal/[id]', '/diary/ultrasound/[id]'],
  },
  {
    name: '育兒資料通',
    path: '/data',
    icon: IconData,
    activeList: ['/data'],
  },
  {
    name: '心情語錄',
    path: '/quote',
    icon: IconQuote,
    activeList: ['/quote'],
  },
]
</script>

<template>
  <footer
    position="fixed bottom-0 left-0 right-0"
    flex="~ justify-center items-start"
    h-26.25
    bg-white
    p="x-5 t-6"
    color-base
    font-sans
    border="t [#333333] op-20"
  >
    <template v-for="nav in navs" :key="nav.path">
      <RouterLink v-slot="{ navigate }" custom :to="nav.path">
        <div flex-1 flex="~ col justify-start items-center" class="group" gap-y-1.5 @click="navigate">
          <component :is="nav.icon" h-a w-6.25 transition="colors duration-150" class="group-hover:fill-[#F3B671]" :class="nav.activeList?.includes(route.name) ? 'fill-[#F3B671] op-100' : 'op-20'" />
          <p text-xs transition="colors duration-150" :class="nav.activeList?.includes(route.name) ? 'color-primary' : 'text-[5B6B86] text-op-20'">
            {{ nav.name }}
          </p>
        </div>
      </RouterLink>
    </template>
  </footer>
</template>
