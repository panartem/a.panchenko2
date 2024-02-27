<script setup>
import { useBalanceStore } from "@/stores/balance.js";
import { useAuthStore } from "@/stores/auth.js";
import {onBeforeUnmount} from "vue";
import LoaderCircle from "@/components/LoaderCircle.vue";

const balanceStore = useBalanceStore();
const authStore = useAuthStore();

balanceStore.getBalance(true);
balanceStore.startRefreshBalance();

const userBalance = balanceStore.userBalance;

onBeforeUnmount(() => {
  balanceStore.stopRefreshBalance();
})
</script>

<template>
  <aside class="p-8">
    <div class="mb-6">
      <button @click="authStore.logout()">
        logout
      </button>
    </div>
    <div v-for="(balanceValue, balanceKey) in userBalance" :key="balanceKey.title" class="mb-4">
      <div class="text-xl mb-1">
        {{ balanceValue.title }}
      </div>
      <div>
        <div v-if="balanceStore.balanceLoading">
          <LoaderCircle></LoaderCircle>
        </div>
        <div v-else>
          {{ balanceValue.value }}
        </div>
      </div>
    </div>
  </aside>
</template>
