<script setup lang="ts">
const params = useRoute('/hi/[name]').params
const router = useRouter()

const initial = ref(10)

useIntervalFn(() => {
  initial.value += 1
}, 5000)
</script>

<template>
  <div>
    <div inline-block text-4xl />
    <p>
      Hi, {{ params.name }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>

    <div>
      <button m-3 mt-8 text-sm btn @click="router.back()">
        Back
      </button>
    </div>
    <TheComponent :initial />
  </div>
</template>
