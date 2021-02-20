<template>
    <div class="page-container container">
        <b-card class='title-card shadow-lg'>
        </b-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                info: {}
            };
        },
        created() {
            this.$axios.get('/test').then(res => {
                this.info = res.data;
            });
        }
    };

</script>

<style>

</style>
