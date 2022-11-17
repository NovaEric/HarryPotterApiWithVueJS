<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import type { Character } from '../interfaces/character';
import breakingBadApi from '@/api/breakingBadApi';
import CharacterCard from '@/characters/components/CharacterCard.vue';

// 1 - Suspense
// const {data: characters} = await breakingBadApi.get<Character[]>('/characters');

// 2 - Composable funtions
//const {isLoading, characters, errorMessage, hasError} = useCharacters();

// 3 - TanStack Query
const getCharacterSlow = async(): Promise<Character[]> => {
    const { data } = await breakingBadApi.get<Character[]>('/characters');
    return data;
}

const { isLoading, data: characters , error: errorMessage  } = useQuery( ['characters'], getCharacterSlow);

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
   <div class="card-list">
        <CharacterCard
        v-for="character of characters"
        :key="character.char_id"
        
        />
   </div>
</template>

<style scoped>
.card-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>