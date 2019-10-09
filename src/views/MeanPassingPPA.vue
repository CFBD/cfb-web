<template>
    <b-container class='page-container'>
        <b-card>
            <b-row>
                <b-col>
                    <h1>Quarterback Mean Passing PPA</h1>
                    <p>Select a QB to start generating charts</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col />
                <b-col lg='4'>
                    <b-row>
                        <player-search position='QB' @selection='setPlayer' />
                    </b-row>
                </b-col>
                <b-col />
            </b-row>
        </b-card>
    </b-container>
</template>

<script>
    import PlayerSearch from '@/components/PlayerSearch.vue';

    export default {
        components: {
            PlayerSearch
        },
        data() {
            return {
                player: null
            };
        },
        methods: {
            setPlayer(player) {
                this.player = player;
            }
        }
    }
</script>

<style lang='scss'>

</style>
