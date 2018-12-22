<template>
    <b-row class="my-1">
        <b-col sm="2"><label for="input-default">{{this.parameter.name | capitalize }}</label></b-col>
        <b-col sm="10">
             <b-form-input :placeholder='this.parameter.description' :required='this.parameter.required' :type='getType(this.parameter.type)'
                v-model="this.parameter.value">
            </b-form-input>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        props: {
            parameter: Object,
            queryParam: Object
        },
        methods: {
            getType(paramType) {
                let inputType = '';

                switch (paramType) {
                    case 'string':
                        inputType = 'text';
                    case 'integer':
                        inputType = 'number';
                    default:
                        inputType = 'text';
                }

                return inputType;
            }
        }
    }

</script>

<style>

</style>
