<template>
    <b-container class="page-container">
        <b-card title='Data Categories' sub-title="Select a category">
            <b-row>
                <b-col v-for="tag in this.docs.tags" :key="tag.name" lg='3'>
                    <b-button class='category-button' variant='info'>
                        <router-link :to="`/category/${tag.name}`">{{tag.name |
                            capitalize}}</router-link>
                    </b-button>
                </b-col>
            </b-row>
        </b-card>
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                docs: {}
            }
        },
        created() {
            let self = this;
            this.$axios.get('/api-docs.json').then((response) => {
                self.docs = response.data;
            });
        }
    }
</script>

<style lang='scss'>
    .category-button {
        width: 100%;
        height: 100px;
        padding: 0;

        a {
            color: white;
            display: block;
            height: 100px;
            line-height: 100px;
            &:hover {
                text-decoration: none;
            }
        }
    }

</style>
