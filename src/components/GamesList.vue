<script setup>
import {useGamesStore} from "@/stores/games.js";
import LoaderCircle from "@/components/LoaderCircle.vue";
import GameCard from "@/components/GameCard.vue";

const gamesStore = useGamesStore();
gamesStore.getGamesList();

const gamesList = gamesStore.gamesList;

const onClickCard = async (id) => {
  const url = await gamesStore.getGameUrlById({
    id
  });

  if (url) {
    location.href = url;
  }
}

</script>

<template>
  <div v-if="gamesStore.gamesListLoading" class="p-8">
    <LoaderCircle></LoaderCircle>
  </div>
  <div v-else class="grid grid-cols-3 gap-x-4 gap-y-8">
    <div v-for="game in gamesList.value" :key="game.id">
      <GameCard
        :id="game.id"
        :title="game.attributes.title"
        :image="game.attributes.image"
        @click="onClickCard(game.id)"
      >
      </GameCard>
    </div>
  </div>
</template>
