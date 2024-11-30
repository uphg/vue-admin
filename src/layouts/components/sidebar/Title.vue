<template>
  <div
    class="h-full w-full items-center justify-start overflow-hidden"
    :class="{ 'px-5': !isCollapse, 'px-2.5': isCollapse }"
    flex="~ row items-center"
    transition="padding 0.3s"
  >
    <div class="flex px-2">
      <n-icon size="28">
        <IconLogo />
      </n-icon>
    </div>
    <FadeTransition>
      <div v-show="!isCollapse" class="w-[calc(100%-45px)] flex">
        <span class="w-32 flex-shrink-0">Vue Best Admin</span>
      </div>
    </FadeTransition>
  </div>
</template>

<script setup lang="ts">
import FadeTransition from '@/components/FadeTransition.vue'
import IconLogo from './IconLogo.vue'

const isCollapse = defineModel('isCollapse')
</script>
