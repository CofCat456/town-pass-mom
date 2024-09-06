<script setup lang="ts">
import IconHome from './icons/IconHome.vue'
import IconDiary from './icons/IconDiary.vue'
import IconData from './icons/IconData.vue'
import IconQuote from './icons/IconQuote.vue'

const router = useRouter()

const navs = [
  {
    name: '首頁',
    path: '/',
    icon: IconHome,
  },
  {
    name: '育兒日誌',
    path: '/diary',
    icon: IconDiary,
  },
  {
    name: '育兒資料通',
    path: '/data',
    icon: IconData,
  },
  {
    name: '心情語錄',
    path: '/quote',
    icon: IconQuote,
  },
]
</script>

<template>
  <footer position="fixed bottom-0 left-0 right-0" flex="~ justify-center items-center" h-14 bg-white px-5 color-base font-sans>
    <template v-for="nav in navs" :key="nav.path">
      <RouterLink v-slot="{ navigate }" custom :to="nav.path">
        <div flex-1 flex="~ col justify-end items-center" class="group mt-[0.3125rem] gap-y-[0.3125rem]" @click="navigate">
          <component :is="nav.icon" transition-opacity duration-150 class="group-hover:op100" :class="router.currentRoute.value.path === nav.path ? 'op100' : 'op40'" />
          <p transition-opacity duration-150 class="text-[0.5rem] group-hover:op100" :class="router.currentRoute.value.path === nav.path ? 'op100' : 'op40'">
            {{ nav.name }}
          </p>
        </div>
      </RouterLink>
    </template>
  </footer>
</template>
