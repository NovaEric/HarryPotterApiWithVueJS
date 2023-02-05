<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '../composables/useCharacter';
import LoadingSpinner from '@/helpers/LoadingSpinner.vue';


const router = useRouter();
const route = useRoute();

const { id } = route.params as {id: string};

const { character, hasError, errorMessage, isLoading } = useCharacter(id);

watchEffect(() => {
    if (!isLoading.value && hasError.value ) {
        router.replace('/characters');
    }
});

</script>

<template>
    <LoadingSpinner v-if="isLoading"/> 
    <h1 v-else-if="hasError">{{ errorMessage }}</h1>   
    <div v-else-if="character">
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