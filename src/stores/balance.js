import { defineStore } from 'pinia'
import axios from "axios";
import {computed, ref} from "vue";
import formatNumberUSD from "@/helpers/formatNumberUSD.js";

export const useBalanceStore = defineStore('balance', () => {
  let _refreshBalanceInterval;

  const balanceLoading = ref(false);

  const userBalance = ref({
    total: {
      title: 'Total balance',
      value: 0
    },
    real: {
      title: 'Real balance',
      value: 0
    },
    bonus: {
      title: 'Bonus balance',
      value: 0
    },
    freeSpins: {
      title: 'Free spins',
      value: 0
    },
  })

  const getBalance = async (needLoading = false) => {
    try {
      if (needLoading) {
        balanceLoading.value = true;
      }
      const result = await axios.get('https://poker.evenbetpoker.com/api/web/v2/users/me/balance?clientId=default');

      const balanceList = result.data.data;

      const balance = Array.from(balanceList)[0];
      const attributes = balance && balance.attributes;

      if (!attributes) {
        return;
      }

      userBalance.value.total.value = formatNumberUSD(attributes.available);
      userBalance.value.real.value = formatNumberUSD(attributes['in-play']) ;
      userBalance.value.bonus.value = formatNumberUSD(attributes.bonus);
    } catch (e) {
      console.log('e!', e);
    } finally {
      balanceLoading.value = false;
    }
  }

  const startRefreshBalance = () => {
    _refreshBalanceInterval = setInterval(async () => {
      await getBalance();
    },30000)
  }

  const stopRefreshBalance = () => {
    clearInterval(_refreshBalanceInterval);
  }

  return { getBalance, userBalance, startRefreshBalance, stopRefreshBalance, balanceLoading }
})
