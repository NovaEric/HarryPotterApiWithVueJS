import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import type { Character } from "../interfaces/character";
import harryPotterApi from "@/api/harryPotterAPI";

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async (): Promise<Character[]> => {
  if (characters.value.length > 0) {
    return characters.value;
  }

  const { data } = await harryPotterApi.get<Character[]>("/characters");
  return data;
};

const LoadedCharacters = (data: Character[]) => {
  hasError.value = false;
  errorMessage.value = null;
  characters.value = data.filter(character => character.image !== "" );
  isLoading.value = false;
};

const useCharacters = () => {
  const { isLoading } = useQuery(["characters"], getCharacters, {
    onSuccess: LoadedCharacters,
  });
  
  return {
    //properties
    characters,
    errorMessage,
    hasError,
    isLoading,

    //Getters
    count: computed(() => characters.value.length)
    //Methods
  };
};

export default useCharacters;