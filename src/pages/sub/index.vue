<script setup lang="ts">
import { useRoute } from 'vue-router'

import Sub1 from '~/module/sub1.vue'
import Sub2 from '~/module/sub2.vue'

defineOptions({
  name: 'SubPage',
})

const route = useRoute()
const pageType = route.query.type as Tab

type Tab = 'mood' | 'diet'

const navs: {
  id: Tab
  text: string
}[] = [
  {
    id: 'mood',
    text: '孕期飲食',
  },
  {
    id: 'diet',
    text: '心情溫度計',
  },
]
const tab = ref<Tab>(pageType || 'mood')
</script>

<template>
  <div h-full w-full p="b-36 x-5.5">
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
        <p
          font-roboto text="op-85 sm"
          :class="tab === nav.id ? 'color-primary' : 'color-base op-20'"
        >
          {{ nav.text }}
        </p>
      </li>
    </ul>

    <Transition name="fade" mode="out-in">
      <template v-if="tab === 'mood'">
        <Sub1 />
      </template>
      <template v-else-if="tab === 'diet'">
        <Sub2 />
      </template>
    </Transition>
  </div>
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
