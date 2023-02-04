import harryPotterApi from "@/api/harryPotterAPI";
import { onMounted, ref } from "vue";
import type { Character } from "../interfaces/character";
import axios from 'axios';

const isLoading = ref<boolean>(true);
const characters = ref<Character[]>([]);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>();

export const useCharacters = () => {

    onMounted( async() => { await loadCharacters(); });
    
    const loadCharacters = async() => {

        if (characters.value.length > 0) return;
        isLoading.value = true;

        try {
            const {data} = await harryPotterApi.get<Character[]>('/characters');
            characters.value = data;
            isLoading.value = false;
            
        } catch (error) {
            
            hasError.value = true;
            isLoading.value = false;

            if (axios.isAxiosError(error)){
                return errorMessage.value = error.message;
            }

            errorMessage.value = JSON.stringify(error);
        }
    }

    return {
        characters,
        isLoading,
        hasError,
        errorMessage
    }
}
