<template>
  <main class="home flex flex-col gap-6">
    <div class="flex gap-6">
      <GBaseButton>
        总销售额
      </GBaseButton>
    </div>
    <div v-for="item in 20" :key="item" class="flex gap-6">
      <div class="h-45 w-60 border-rd-2 bg-white px-4 py-3 shadow-base">
        总销售额
      </div>
      <div class="h-45 w-60 border-rd-2 bg-white px-4 py-3 shadow-base">
        访问量
      </div>
      <div class="h-45 w-60 border-rd-2 bg-white px-4 py-3 shadow-base">
        支付笔数
      </div>
      <div class="h-45 w-60 border-rd-2 bg-white px-4 py-3 shadow-base">
        运营活动效果
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
onMounted(async () => {
})
</script>

<style lang="scss" scoped>
.home {
  @apply border-rd-.75;
}
</style>
