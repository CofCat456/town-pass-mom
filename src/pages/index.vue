<script setup lang="ts">
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'IndexPage',
})

const dataStore = useDataStore()
const { fetchData } = dataStore
const { users } = storeToRefs(dataStore)

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

    <pre mxa w-fit text-left>
      {{ JSON.stringify(users, null, 2) }}
    </pre>
  </div>
</template>
