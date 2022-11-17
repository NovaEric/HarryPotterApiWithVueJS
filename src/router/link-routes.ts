export interface RouterLink {
    path:   string;
    name:   string;
    title:  string;
}

export const routeLinks: RouterLink[] = [
    {path: '/', name: 'home', title: 'Home'},
    {path: '/characters', name: 'characters', title: 'Characters'},
    {path: '/about', name: 'about', title: 'About'}
];