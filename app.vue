<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
  <UModal v-model="notiModal">
      <div class="p-4">
        Api express server đang tắt, vui lòng chờ trong giây lát để server chạy lại,
        Click outside to close modal
      </div>
    </UModal>
</template>

<script setup>
  import { authStore } from './stores/auth';
  import { cartStore } from './stores/cart';

  const auth = authStore()
  const cart = cartStore()

  // auth.getUserInfo()

  const initData = async ()=> {
    await auth.getUserInfo()
    // await cart.getCarts()
  }
  const notiModal = ref(false)
  onMounted(()=>{
  notiModal.value = true
})
  initData()
</script>

