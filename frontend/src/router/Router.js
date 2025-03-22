
import { 
    Introduction,
    Generate
} from '../pages/index.js';

import { DefaultLayout, SingleLayout } from '../layouts/layouts.js';

const routers = [
    {path: '/', component: Introduction, layout: SingleLayout},
    {path: '/generate', component: Generate, layout: DefaultLayout}, 
    // {path: '/product/details/:slug?', component: Details, layout: DefaultLayout},
    // {path: '/search/:search?', component: Search, layout: DefaultLayout}, 
    // {path: '*', component: NotFound404, layout: SingleLayout},
];

export default routers;
