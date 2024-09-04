<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const dataStore = useDataStore()
const { fetchData } = dataStore

const name = ref('')

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

onBeforeMount(async () => {
  await fetchData()
})
</script>

<template>
  <div>
    <div inline-block text-4xl />
    <p text-xl>
      Town Pass
    </p>

    <a-input
      v-model:value="name"
      my-3
      w-auto
      placeholder="What's your name?"
      @keydown.enter="go"
    />

    <div>
      <button
        class="text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>
