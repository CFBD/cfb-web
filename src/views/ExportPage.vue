<template>
    <b-container id='ExportContainer' class='page-container pt-3'>
        <h3>Data Search</h3>
        <p class='muted'>What data are you trying to find?</p>
        <b-row>
            <b-col />
            <b-col lg='4'>
                <autocomplete :items='endpoints' displayProp='summary' valueProp='key' @selection='selectPath' />
            </b-col>
            <b-col />
        </b-row>
        <b-row>
            <b-col />
            <b-col>
                <b-button @click="toggleCategories">{{ collapsed ? "View Everything" : "Collapse"}}</b-button>
            </b-col>
            <b-col />
        </b-row>
        <b-row class='ml-3 mr-3' v-if='!collapsed'>
            <b-col lg='3' v-for='category in categories' :key='category'>
                <b-row>
                    {{ category | capitalize }}
                </b-row>
                <b-row>
                    <ul>
                        <li class='text-left' v-for='endpoint in endpoints.filter(e => e.category == category)'
                            :key='endpoint.key'>
                            <b-link @click='selectPath(endpoint.key)'>{{ endpoint.summary }}</b-link>
                        </li>
                    </ul>
                </b-row>
            </b-col>
        </b-row>
        <hr class='my-4'>
        <endpoint :endpoint='endpoint' :teams='teams' :conferences='conferences' :play-types='playTypes' :query='query' @query='updateQuery'
            v-if='endpoint'></endpoint>
    </b-container>
</template>

<script>
    import Endpoint from '@/components/Endpoint.vue';
    import Autocomplete from '@/components/Autocomplete.vue';

    export default {
        components: {
            Endpoint,
            Autocomplete
        },
        data() {
            return {
                collapsed: false,
                endpoints: [],
                endpoint: null,
                teams: [],
                conferences: [],
                playTypes: [],
                paths: [],
                categories: [],
                query: {}
            }
        },
        methods: {
            setData(data) {
                this.paths = Object.keys(data.paths);
                this.categories = Array.from(new Set(this.paths.map(p => data.paths[p].get.tags[0])));
                let endpoints = this.paths
                    .map(p => {
                        return {
                            path: data.paths[p],
                            category: data.paths[p].get.tags[0],
                            summary: data.paths[p].get.summary,
                            key: p
                        }
                    });
                this.endpoints = endpoints;
            },
            updatePath(path) {
                this.endpoint = this.endpoints.find(e => e.key === `/${path}`);
            },
            selectPath(path) {
                this.collapsed = true;
                this.$router.push({
                    path: `/exporter${path}`
                });
            },
            getDocs() {
                return this.$axios.get('/api-docs.json');
            },
            getTeams() {
                return this.$axios.get('/teams');
            },
            getConferences() {
                return this.$axios.get('/conferences');
            },
            getPlayTypes() {
                return this.$axios.get('/play/types');
            },
            toggleCategories() {
                this.collapsed = !this.collapsed;
            },
            updateQuery(params) {
                this.$router.push({
                    query: params
                })
            }
        },
        created() {
            this.query = this.$route.query;
            this.getDocs().then(result => {
                this.setData(result.data);
                this.updatePath(this.$route.params.path);
            });

            this.getTeams().then(result => {
                this.teams = result
                    .data
                    .filter(t => t.conference)
                    .map(t => t.school);
            });

            this.getConferences().then(result => {
                this.conferences = result
                    .data
                    .map(c => {
                        return {
                            name: c.name,
                            abbreviation: c.abbreviation
                        }
                    });
            });

            this.getPlayTypes().then(result => {
                this.playTypes = result.data;
            });
        },
        watch: {
            '$route': function (to, from) {
                if (to.params.path !== from.params.path) {
                    this.updatePath(to.params.path);
                }

                if (to.query !== from.query) {
                    this.query = to.query;
                }
            }
        }
    }

</script>

<style lang='scss'>
    #ExportContainer {
        background: rgba(255, 255, 255, .9);
    }

</style>
