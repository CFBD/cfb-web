<template>
    <autocomplete :clear-on-selection='clearOnSelection' :is-async='true' display-prop='displayName' @input='queryPlayers' @selection='emitSelection' :items='players' />
</template>

<script>
    import Autocomplete from '@/components/Autocomplete.vue';

    export default {
        name: 'player-search',
        components: {
            Autocomplete
        },
        props: {
            clearOnSelection: {
                type: Boolean,
                required: false,
                default: false
            },
            position: {
                type: String,
                required: false,
                default: null
            },
            school: {
                type: String,
                required: false,
                default: null
            },
            year: {
                type: Number,
                required: false,
                default: null
            },
            showTeam: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                players: []
            }
        },
        methods: {
            queryPlayers(searchTerm) {
                if (searchTerm) {
                    this.$axios.get('/player/search', {
                        params: {
                            position: this.position,
                            school: this.school,
                            year: this.year,
                            searchTerm
                        }
                    }).then(result => {
                        this.players = result.data.slice(0, 10).map(p => ({
                            displayName: this.showTeam ? `${p.name} (${p.team})` : p.name,
                            ...p
                        }));
                    });
                }
            },
            emitSelection(selectedPlayer) {
                this.$emit('selection', selectedPlayer);
                if (this.clearOnSelection) {
                    this.players = [];
                }
            }
        }
    }
</script>

<style lang='scss'>

</style>
