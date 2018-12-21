<template>
    <div>
        <h1>{{this.name | capitalize}}</h1>
        <div v-for="endpoint in this.endpoints" :key="endpoint.name">
            <h3>{{endpoint.key}}</h3>
        </div>
    </div>
</template>

<script>
    export default {
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
        // created() {
        //     this.getDocs().then(result => {
        //         this.setData(result.data);
        //     });
        // },
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
