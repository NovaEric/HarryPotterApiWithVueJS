import type { RouteRecordRaw } from "vue-router";

import CharacterLayout from "../layout/CharacterLayout.vue";
import CharacterId from "../pages/CharacterId.vue";
import CharacterList from "../pages/CharacterList.vue";
import CharacterSearch from "../pages/CharacterSearch.vue";

export const characterRoute: RouteRecordRaw = {

    path: '/characters',
    redirect: '/characters/list',
    component: CharacterLayout,
    children: [
        { 
            path: 'by/id', 
            name: 'character-id', 
            props: { title: 'ID', visible: false },
            component: CharacterId},
        { 
            path: 'list', 
            name: 'character-list', 
            props: { title: 'List', visible: true, subtitle: 'Characters List Page' },
            component: CharacterList},
        { 
            path: 'search', 
            name: 'character-search', 
            props: { title: 'Search', visible: true },
            component: CharacterSearch},
    ]
}