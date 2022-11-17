<script setup lang="ts">
import CardList from '../components/CardList.vue';

const props = defineProps<{title: string, visible: boolean, subtitle: string}>();

</script>

<template>
    <h2>{{props.subtitle}}</h2>
    <CardList/>
</template>

<style scoped>

</style>