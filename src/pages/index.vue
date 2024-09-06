<script setup lang="ts">
import ky from '~/lib/ky'

defineOptions({
  name: 'IndexPage',
})

const name = ref('')

function handleSearch() {
  ky.post(`check_name`, {
    json: { name: name.value },
  })
}
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
      @keydown.enter="handleSearch"
    />

    <div>
      <button
        class="text-sm btn"
        :disabled="!name"
        @click="handleSearch"
      >
        Search
      </button>
    </div>
  </div>
</template>
