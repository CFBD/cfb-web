<template>
    <div>
        <b-form @submit="onSubmit" v-if="this.endpoint.path.get.parameters.length > 0" >
            <parameter-input v-for='parameter in this.endpoint.path.get.parameters' :key='parameter.name' :parameter='parameter'></parameter-input>
        </b-form>
    </div>
</template>

<script>
    import ParameterInput from '@/components/ParameterInput.vue';

    export default {
        name: 'endpoint',
        components: {
            ParameterInput
        },
        props: {
            endpoint: Object
        },
        data() {
            return {
                queryParams: {}
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault();
            }
        },
        beforeMount() {
            if (this.endpoint) {
                for (let parameter of this.endpoint.path.get.parameters) {
                    parameter.value = parameter.default;
                }
            }
        }
    }

</script>

<style>

</style>
