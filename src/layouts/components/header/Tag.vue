<template>
  <n-tag
    class="nav-tag"
    :type="active ? 'primary' : 'default'"
    :closable="closable"
    :bordered="false"
    @click="onClick"
    @close="onClose"
  >
    <slot />
  </n-tag>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    required: true,
  },
  closable: {
    type: Boolean,
    required: true,
  },
  onClick: {
    type: Function as PropType<() => void>,
    required: true,
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
:deep(.n-tag.nav-tag) {
  cursor: pointer;
}
:global(.n-tag.nav-tag) {
  cursor: pointer;
}
</style>
