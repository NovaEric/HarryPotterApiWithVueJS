import harryPotterApi from "@/api/harryPotterAPI";
import type { Character } from "@/characters/interfaces/character"
import { reactive } from "vue";

interface Store {
    characters: {
        list: Character[];
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },
    names: {
        list: {
            [name: string]: Character;
        };
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },

   // Methods
    StartLoadingCharacters: () => void;
    LoadedCharacters: ( data: Character[] | string ) => void;
    FailedToLoadCharacters: ( error: string ) => void;

    //Methods By Id
    StartLoadingCharacterById: () => void;
    LoadedCharacterById: ( character: Character ) => void;
    CheckIdInStore: (name: string ) => boolean;
}

// Initial State

const characterStore = reactive<Store>({
    characters: {
        list: [],
        count: 0,
        isLoading: true,
        hasError: false,
        errorMessage: null
    },
    names: {
        list: {},
        isLoading: false,
        hasError: false,
        errorMessage: null
    },

    // Methods
    async StartLoadingCharacters(){
        const { data } = await harryPotterApi.get<Character[]>('/characters');
        this.LoadedCharacters(data); 
    },
    LoadedCharacters(data){

        if (typeof data === "string") {
            return this.FailedToLoadCharacters('Reponse is not an array of characters!');
        }

        // data = data.filter(character => ![3, 14, 17, 39].includes(character.char_id));
        data = data.filter(character => character.image !== "" );
        this.characters = {
            list: data,
            count: data.length,
            isLoading: false,
            hasError: false,
            errorMessage: null
        }
    },
    FailedToLoadCharacters(error) {
        this.characters = {
            list: [],
            count: 0,
            isLoading: false,
            hasError: true,
            errorMessage: error
        }
    },

    //Methods By id
    StartLoadingCharacterById(){
        this.names = {
            ...this.names,
            isLoading: true,
            hasError: false,
            errorMessage: null
        }
    },
    CheckIdInStore(name: string){
        return !!this.names.list[name];
    },
    LoadedCharacterById(character: Character){
        this.names.isLoading = false,
        this.names.list[character.name] = character;
    },
});

characterStore.StartLoadingCharacters();

export default characterStore;