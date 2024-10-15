<template>
  <div
    class="w-full h-full justify-start items-center overflow-hidden"
    :class="{ 'px-5': !isCollapse ,'px-2.5': isCollapse}"
    flex="~ row items-center"
    transition="padding 0.3s"
  >
    <div class="px-2 flex ">
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
import IconLogo from './IconLogo.vue'
import FadeTransition from '@/components/FadeTransition.vue'

const isCollapse = defineModel('isCollapse')
</script>
