import Vue from 'vue';
import Router from 'vue-router';
import VueAnalytics from 'vue-analytics';

import Home from './views/Home.vue';
import Category from './views/Category.vue';
import Contribute from './views/Contribute.vue';
import Matchup from './views/Matchup.vue';
import SP from './views/SP.vue';
import SPTrends from './views/SPTrends.vue';
import PP from './views/PP.vue';
import RecruitSP from './views/RecruitSP.vue';
import WP from './views/WP.vue';
import MeanPassingPPA from './views/MeanPassingPPA.vue';
import PPAUsage from './views/PPAUsage.vue';
import SeasonMetrics from './views/SeasonMetrics.vue';
import BoxScore from './views/BoxScore.vue';
import ExportPage from './views/ExportPage.vue';
import Glossary from './views/Glossary.vue';
import Test from './views/Test.vue';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/category/:name',
            name: 'category',
            component: Category,
            props: true
        },
        {
            path: '/exporter/:path([\\w\\/]+)?',
            name: 'exporter',
            component: ExportPage,
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
        },
        {
            path: '/sp',
            name: 'sp',
            component: SP
        },
        {
            path: '/sp/trends',
            name: 'spTrends',
            component: SPTrends
        },
        {
            path: '/predictedpoints',
            name: 'predictedPoints',
            component: PP
        },
        {
            path: '/sp/recruiting',
            name: 'recruitingSP',
            component: RecruitSP
        },
        {
            path: '/wp/:id(\\d+)?',
            name: 'wp',
            component: WP
        },
        {
            path: '/ppa/passing/cumulative',
            name: 'cumulativePassingPPA',
            component: MeanPassingPPA
        },
        {
            path: '/ppa/usage',
            name: 'ppaUsage',
            component: PPAUsage
        },
        {
            path: '/metrics/season',
            name: 'seasonMetrics',
            component: SeasonMetrics
        },
        {
            path: '/boxscore/:id(\\d+)?',
            name: 'boxscore',
            component: BoxScore
        },
        {
            path: '/glossary',
            name: 'glossary',
            component: Glossary
        },
        {
            path: '/test',
            name: 'test',
            component: Test
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
        sendHitTask: !process.env.ENABLE_DEV_TOOLS
    }
});


export default router;
