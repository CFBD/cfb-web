<template>
    <div>
        <h1>{{this.name | capitalize}}</h1>
        <b-card no-body>
            <b-tabs pills card vertical>
                <b-tab v-for="endpoint in this.endpoints" :key="endpoint.key" :title="endpoint.path.get.description">
                    <endpoint :endpoint='endpoint'></endpoint>
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
                endpoints: []
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
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.getDocs().then(result => {
                    vm.setData(result.data, vm.name);
                });
            });
        },
        beforeRouteUpdate(to, from, next) {
            this.endpoints = [];

            this.getDocs().then(result => {
                this.setData(result.data, to.params.name);
                next();
            });
        }
    }

</script>

<style>

</style>
