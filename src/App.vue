<script setup lang="ts">
const userStore = useUserStore()
const { fetchUser } = userStore

const prenatalStore = usePrenatalStore()
const { fetchPrenatal } = prenatalStore

const ultrasoundStore = useUltrasoundStore()
const { fetchUltrasound } = ultrasoundStore

onBeforeMount(() => {
  Promise.allSettled([
    fetchUser(),
    fetchPrenatal(),
    fetchUltrasound(),
  ])
})
</script>

<template>
  <main w-full of-y-auto font-sans min-h-dvh class="scrollbar-hide" text="color-base" bg="base">
    <RouterView />
  </main>
  <TheFooter />
</template>
