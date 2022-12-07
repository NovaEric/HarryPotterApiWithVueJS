
<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { Character } from '../interfaces/character';
import characterStore from '@/store/characters.store';
import breakingBadApi from '@/api/breakingBadApi';
import { useQuery } from '@tanstack/vue-query';
import LoadingSpinner from '@/helpers/LoadingSpinner.vue';


const route = useRoute();

const { id } = route.params as {id: string};

const getCharacterByIdCacheFirst = async ( characterId: string ): Promise<Character> => {

    if (characterStore.CheckIdInStore(characterId)){
        return characterStore.ids.list[characterId];
    }
    const { data } = await breakingBadApi.get<Character[]>(`/characters/${characterId}`);
    return data[0];
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
        <h1>Character # {{ character.name }}</h1>
        <div class="character-container" >
            <img :src="character.img" :alt="character.name" >
            <ul>
                <li>NickName: {{ character.nickname }}</li>
                <li>Birth: {{ character.birthday }}</li>
                <li>Series: {{ character.category }}</li>
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
    width: 150px;
    border-radius: 5px;
}

</style>