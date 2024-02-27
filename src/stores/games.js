import { defineStore } from 'pinia'
import axios from "axios";
import {reactive, ref} from "vue";

export const useGamesStore = defineStore('games', () => {
  const gamesListLoading = ref(false);
  let gamesList = reactive({
    value: []
  });

  const getGamesList = async () => {
    try {
      gamesListLoading.value = true;
      const result = await axios.get('https://poker.evenbetpoker.com/api/web/v2/casino/games?clientId=default');

      gamesList.value = JSON.parse(JSON.stringify(result.data.data))
    } catch (e) {
      console.log('e', e);
    } finally {
      gamesListLoading.value = false;
    }
  }

  const getGameUrlById = async (payload) => {
    try {
      const result = await axios.post(`https://poker.evenbetpoker.com/api/web/v2/casino/games/${payload.id}/session-demo?clientId=default`,{
        clientId: 'default',
        gameId: payload.id
      });

      return result?.data?.data[0]?.attributes['launch-options']['game-url'];
    } catch (e) {
      console.log('e', e);
    }
  }

  return { getGamesList, gamesListLoading, gamesList, getGameUrlById }
})
