
<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { Character } from '../interfaces/character';
import characterStore from '@/store/characters.store';
import harryPotterApi from '@/api/harryPotterAPI';
import { useQuery } from '@tanstack/vue-query';
import LoadingSpinner from '@/helpers/LoadingSpinner.vue';


const route = useRoute();

const { id } = route.params as {id: string};

const getCharacterByIdCacheFirst = async ( characterId: string ): Promise<Character> => {

    if (characterStore.CheckIdInStore(characterId)){
        return characterStore.names.list[characterId];
    }
    // const { data } = await harryPotterApi.get<Character[]>(`/characters/${characterId}`);
    const { data } = await harryPotterApi.get<Character[]>(`/characters`);
    return data.filter( c => c.name === id)[0];
};

const { data: character } = useQuery(
    [ 'characters', id ],
    () => getCharacterByIdCacheFirst(id),
    {
        onSuccess( character ){
            characterStore.LoadedCharacterById(character);
        }
    }
);

</script>

<template>
    <h1 v-if="!character">
        <LoadingSpinner/>
    </h1>
    <div v-else>
        <h1>{{ character.name }}</h1>
        <div class="character-container" >
            <img :src="character.image" :alt="character.name" >
            <ul>
                <li>Birth: {{ character.yearOfBirth }}</li>
                <li>House: {{ character.house }}</li>
                <li>Species: {{ character.species }}</li>
                <li>Wizard: {{ character.wizard }}</li>
                <li>Ancestry: {{ character.ancestry }}</li>
                <li>Actor: {{ character.actor }}</li>
                <li>Alive: {{ character.alive ? "yes" : "no" }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

.character-container {
    display: flex;
    flex-direction: row;
}
img {
    width: 250px;
    height: 350px;
    border-radius: 5px;
}

</style>