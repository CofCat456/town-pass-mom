<script setup lang="ts">
const { path } = defineProps<{
  path?: string
}>()

const router = useRouter()

function handleNavigate() {
  if (path != null && path.length !== 0)
    router.push(path)
  else
    router.back()
}
</script>

<template>
  <!-- Header -->
  <div flex="~ items-center justify-between" p="x-8.5 y-2.5">
    <IconChevronLeft @click="handleNavigate" />

    <p text-base color-base>
      <slot />
    </p>

    <div />
  </div>
</template>
