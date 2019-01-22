import Vue from 'vue';
import Router from 'vue-router';
import VueAnalytics from 'vue-analytics';

import Home from './views/Home.vue';
import Category from './views/Category.vue';
import About from './views/About.vue';
import Contribute from './views/Contribute.vue';
import Matchup from './views/Matchup.vue';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/category/:name',
            name: 'category',
            component: Category,
            props: true
        },
        {
            path: '/contribute',
            name: 'contribute',
            component: Contribute
        },
        {
            path: '/matchup',
            name: 'matchup',
            component: Matchup
        }
    ]
});

Vue.use(VueAnalytics, {
    id: 'UA-131519987-1',
    router,
    autoTracking: {
        exception: true,
        exceptionLogs: false
    },
    debug: {
        sendHitTask: process.env.ENABLE_DEV_TOOLS == 'false'
    }
});


export default router;
