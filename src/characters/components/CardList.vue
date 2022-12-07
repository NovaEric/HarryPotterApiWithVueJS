<script setup lang="ts">
// import { useQuery } from '@tanstack/vue-query';
// import type { Character } from '../interfaces/character';
// import breakingBadApi from '@/api/breakingBadApi';
import CharacterCard from '@/characters/components/CharacterCard.vue';
import type { Character } from '../interfaces/character';

interface Props {
    characters: Character[],
}

const props = defineProps<Props>();

//! 1 - Suspense
// const {data: characters} = await breakingBadApi.get<Character[]>('/characters');

//! 2 - Composable funtions
//const {isLoading, characters, errorMessage, hasError} = useCharacters();

//! 3 - TanStack Query
// const getCharacterSlow = async(): Promise<Character[]> => {
    
//     return new Promise((resolve) => {
//         setTimeout(async() => {
//             const { data } = await breakingBadApi.get<Character[]>('/characters');
//             resolve(data.filter( character => ![3,14,17,39].includes(character.char_id)));
//         }, 1 );
//     })
// }

// const { isLoading, data: characters , error: errorMessage  } = useQuery( 
//         ['characters'], 
//         getCharacterSlow,
//         {
//             cacheTime: 1000 * 60,
//             refetchOnReconnect: 'always'
//         }
//     );

</script>

<template>
    <!-- <h1 v-if="isLoading">Loading...</h1> -->
   <div class="card-list">
        <CharacterCard
        v-for="character of props.characters"
        :key="character.char_id"
        :character="character"
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