<template>
    <div id='CategoryContainer'>
        <b-card>
        <h1>{{this.name | capitalize}}</h1>
        <b-tabs pills v-model='tabIndex'>
            <b-tab v-for="endpoint in this.endpoints" :key="endpoint.key" :title="endpoint.path.get.description">
                <endpoint :endpoint='endpoint' :teams='teams' :conferences='conferences' :play-types='playTypes'></endpoint>
            </b-tab>
        </b-tabs>
        </b-card>
    </div>
</template>

<script>
    import Endpoint from '@/components/Endpoint.vue';

    export default {
        components: {
            Endpoint
        },
        props: {
            name: String
        },
        data() {
            return {
                endpoints: [],
                teams: [],
                conferences: [],
                playTypes: [],
                tabIndex: 0
            }
        },
        methods: {
            setData(data, key) {
                let paths = Object.keys(data.paths);
                let endpoints = paths
                    .map(p => {
                        return {
                            path: data.paths[p],
                            key: p
                        }
                    })
                    .filter(p => p.path.get.tags.includes(key));
                this.endpoints = endpoints;
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
            })
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.tabIndex = 0;
                vm.getDocs().then(result => {
                    vm.setData(result.data, vm.name);
                });
            });
        },
        beforeRouteUpdate(to, from, next) {
            this.endpoints = [];
            this.tabIndex = 0;

            this.getDocs().then(result => {
                this.setData(result.data, to.params.name);
                next();
            });
        }
    }

</script>

<style lang="scss">
    #CategoryContainer {
        margin: 30px 15px;

        .tabs {
            > div {
                &:focus {
                    outline: none;
                }

                ul:focus {
                    outline: none;
                }
            }

            .nav {
                display: flex;
                justify-content: center;
            }
        }
    }

</style>
