<template>
    <b-container id='ExportContainer' class='page-container pt-3'>
            <h3>Data Search</h3>
            <p class='muted'>What data are you trying to find?</p>
            <autocomplete :items='endpoints' displayProp='summary' valueProp='key' @selection='selectPath' />
            <hr class='my-4'>
        <endpoint :endpoint='endpoint' :teams='teams' :conferences='conferences' :play-types='playTypes' v-if='endpoint'></endpoint>
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
                endpoints: [],
                endpoint: null,
                teams: [],
                conferences: [],
                playTypes: [],
                paths: []
            }
        },
        methods: {
            setData(data) {
                this.paths = Object.keys(data.paths);
                let endpoints = this.paths
                    .map(p => {
                        return {
                            path: data.paths[p],
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
                this.$router.push({ path: `/exporter${path}`});
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
            }
        },
        created() {
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
            }
        }
    }
</script>

<style lang='scss'>
    #ExportContainer {
        background: rgba(255, 255, 255, .9);
    }
</style>
