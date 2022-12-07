<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import breakingBadApi from '@/api/breakingBadApi';
import CardList from '../components/CardList.vue';
import type { Character } from '../interfaces/character';
import characterStore from '@/store/characters.store';
import LoadingSpinner from '@/helpers/LoadingSpinner.vue';

const props = defineProps<{ title: string, visible: boolean, subtitle: string }>();

const getCharactersFromCache = async (): Promise<Character[]> => {

    if (characterStore.characters.count > 0) {
        return characterStore.characters.list;
    }

    const { data } = await breakingBadApi.get<Character[]>('/characters');
    return data;
}

useQuery(
    ['characters'],
    getCharactersFromCache,
    {
        onSuccess(data) {
            characterStore.LoadedCharacters(data);
        }
    }
);

</script>

<template>
    <h1 v-if="characterStore.characters.isLoading">
        <LoadingSpinner/>
    </h1> 
    <div v-else-if="characterStore.characters.hasError">
        <h1>Error tying to load data!</h1>
        <p>{{ characterStore.characters.errorMessage }}</p>
    </div>
    <template v-else>
        <h2>{{ props.subtitle }}</h2>
        <CardList :characters="characterStore.characters.list" />
    </template>
</template>

<style scoped>

</style>