<script setup lang="ts">
import CardList from '../components/CardList.vue';
import LoadingSpinner from '@/helpers/LoadingSpinner.vue';
import useCharacters from '../composables/useCharacters';

const props = defineProps<{ title: string, visible: boolean, subtitle: string }>();

const { isLoading, hasError, errorMessage, characters, count } = useCharacters();

</script>

<template>        
    <LoadingSpinner v-if="isLoading" />
    <div v-else-if="hasError">
        <h1>Error tying to load data!</h1>
        <p>{{ errorMessage }}</p>
    </div>
    <template v-else>
        <h2>{{ props.subtitle }} | {{ count }}</h2>
        <CardList :characters="characters" />
    </template>    
</template>

<style scoped>
div, h1, h2 {
    margin-bottom: 20px;
    text-align: center;
}
</style>