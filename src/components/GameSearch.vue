<template>
    <div>
        <b-row>
            <b-col>
                <h4>Game Search</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg='2'>
                <b-row class='justify-content-center'><label>Year</label></b-row>
                <b-form-input type='number' v-model='year'></b-form-input>
            </b-col>
            <b-col lg='2'>
                <b-row class='justify-content-center'><label>Week</label></b-row>
                <b-form-input type='number' v-model='week'></b-form-input>
            </b-col>
            <b-col lg='3'>
                <b-row class='justify-content-center'><label>Team</label></b-row>
                <autocomplete display-prop='school' placeholder='Select a team...' :items='teams'
                    @selection='updateTeam($event)'></autocomplete>
            </b-col>
            <b-col lg='3'>
                <b-row class='justify-content-center'><label>Conference</label></b-row>
                <b-form-select v-model='conference' :options='conferences'>
                </b-form-select>
            </b-col>
            <b-col lg='2'>
                <b-row class='justify-content-center'><label>Season Type</label></b-row>
                <b-form-select v-model='seasonType'>
                    <option value='regular'>Regular</option>
                    <option value='postseason'>Postseason</option>
                </b-form-select>
            </b-col>
        </b-row>
        <b-row class='mt-5'>
            <b-col />
            <b-button variant='primary' @click="queryGames">Search</b-button>
            <b-col />
        </b-row>
        <b-row v-if='games && games.length'>
            <b-col lg='3' v-for='game in games' :key='game.id'>
                <b-link @click='emitSelection(game)'>
                    {{ game.homeTeam }} {{ game.homeScore }}, {{ game.awayTeam }} {{ game.awayScore }}
                </b-link>
            </b-col>
        </b-row>
    </div>
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
            onlyCompleted: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        data() {
            return {
                games: [],
                teams: [],
                conferences: [{
                    value: null,
                    text: 'All'
                }, {
                    value: 'ACC',
                    text: 'ACC'
                }, {
                    value: 'AAC',
                    text: 'American Athletic'
                }, {
                    value: 'B12',
                    text: 'Big 12'
                }, {
                    value: 'B1G',
                    text: 'Big Ten'
                }, {
                    value: 'CUSA',
                    text: 'Conference USA'
                }, {
                    value: 'Ind',
                    text: 'FBS Independents'
                }, {
                    value: 'MAC',
                    text: 'Mid-American'
                }, {
                    value: 'MWC',
                    text: 'Mountain West'
                }, {
                    value: 'PAC',
                    text: 'PAC 12'
                }, {
                    value: 'SEC',
                    text: 'SEC'
                }, {
                    value: 'SBC',
                    text: 'Sun Belt'
                }],
                year: 2019,
                week: 1,
                team: null,
                conference: null,
                seasonType: 'regular'
            }
        },
        methods: {
            queryGames() {
                this.$axios('/games', {
                    params: {
                        year: this.year,
                        week: this.week,
                        seasonType: this.seasonType,
                        conference: this.conference,
                        team: this.team ? this.team.school : null
                    }
                }).then(result => {
                    this.games = result.data.map(r => ({
                        id: r.id,
                        homeTeam: r.home_team,
                        homeScore: r.home_points,
                        awayTeam: r.away_team,
                        awayScore: r.away_points
                    })).filter(g => this.onlyCompleted == false || g.homeScore);
                });
            },
            emitSelection(selectedGame) {
                this.$emit('selection', selectedGame);
                if (this.clearOnSelection) {
                    this.games = [];
                }
            },
            getTeams() {
                return this.$axios.get('/teams/fbs');
            },
            updateTeam(team) {
                this.team = team;
            }
        },
        created() {
            this.getTeams().then(result => {
                this.teams = result.data.sort((a, b) => {
                    let index = 0;

                    let aName = a.school.toUpperCase();
                    let bName = b.school.toUpperCase();

                    if (a.conference && !b.conference) {
                        index = -1;
                    } else if (!a.conference && b.conference) {
                        index = 1;
                    } else {
                        index = aName < bName ? -1 : 1;
                    }

                    return index;
                });
            });
        }
    }

</script>

<style lang='scss'>

</style>
