import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import harryPotterApi from "@/api/harryPotterAPI";
import type { Character } from "../interfaces/character";

const characterSet = ref<{ [id: string]: Character }>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async (id: string): Promise<Character> => {    

    if (characterSet.value[id]) return characterSet.value[id];

    try {        
        const { data } = await harryPotterApi.get<Character[]>(`/characters`);

        if (data.length > 0 && data.filter((c) => c.name === id && c.image !== "")[0] !== undefined){
            
            return data.filter((c) => c.name === id && c.image !== "")[0];
        }

        throw new Error("Nothing found");

    } catch (error: any) {
      throw new Error(error).message;
    }  
};

const LoadedCharacter = (character: Character) => {
    hasError.value = false;
    errorMessage.value = null;
    
    characterSet.value[character.name] = character;
};

const LoadedWithError = (error: string) => {
    hasError.value = true;
    errorMessage.value = error;
};

const useCharacter = (id: string) => {
  const { isLoading } = useQuery(["characters", id], () => getCharacter(id), {
    onSuccess: LoadedCharacter,
    onError: LoadedWithError,
  });

  return {
    //Properties
    errorMessage,
    hasError,
    isLoading,
    list: characterSet,

    //Getters
    character: computed<Character | null>(() => characterSet.value[id]),
    //Methods
  };
};

export default useCharacter;