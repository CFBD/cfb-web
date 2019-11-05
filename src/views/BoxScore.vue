<template>
    <b-container class='page-container'>
        <b-card>
            <b-row>
                <b-col>
                    <h1>Advanced Box Scores</h1>
                    <p class='lead'>Search for games to get started</p>
                </b-col>
            </b-row>
        </b-card>
        <b-row>
            <b-col>
                <b-card>
                    <game-search :clear-on-selection='true' @selection='selectGame' />
                </b-card>
            </b-col>
        </b-row>
        <b-row v-if='game && gameData'>
            <b-col>
                <b-card :title='`${game.homeTeam} ${game.homeScore}, ${game.awayTeam} ${game.awayScore}`'
                    sub-title='Note: Garbage time is filtered from player stats' class='box-score-card'>
                    <b-row>
                        <b-col lg='6' class='team-column'>
                            <h5>Team Metrics</h5>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>Rushing</strong></h6>
                                <b-table :items='rushingMetrics' :fields='rushingFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>Predicted Points Added</strong></h6>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>Overall</label>
                                <b-table :items='overallTeamPPA' :fields='quarterFieldsTeam' small responsive>
                                </b-table>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>Passing</label>
                                <b-table :items='passingTeamPPA' :fields='quarterFieldsTeam' small responsive>
                                </b-table>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>Rushing</label>
                                <b-table :items='rushingTeamPPA' :fields='quarterFieldsTeam' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>Success Rate</strong></h6>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>Overall</label>
                                <b-table :items='overallTeamSuccess' :fields='quarterFieldsTeam' small responsive>
                                </b-table>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>Standard Downs</label>
                                <b-table :items='standardTeamSuccess' :fields='quarterFieldsTeam' small responsive>
                                </b-table>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>Passing Downs</label>
                                <b-table :items='passingTeamSuccess' :fields='quarterFieldsTeam' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>Explosiveness</strong></h6>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>Overall</label>
                                <b-table :items='explosiveness' :fields='quarterFieldsTeam' small responsive>
                                </b-table>
                            </b-row>
                        </b-col>
                        <b-col lg='6' class='player-column'>
                            <h5>Player Metrics</h5>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>Usage</strong></h6>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.homeTeam }}</label>
                                <b-table :items='homeTeamUsage' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.awayTeam }}</label>
                                <b-table :items='awayTeamUsage' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>PPA (Avg)</strong></h6>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.homeTeam }}</label>
                                <b-table :items='homeTeamAvgPPA' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.awayTeam }}</label>
                                <b-table :items='awayTeamAvgPPA' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>PPA (Cum.)</strong></h6>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.homeTeam }}</label>
                                <b-table :items='homeTeamCumPPA' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.awayTeam }}</label>
                                <b-table :items='awayTeamCumPPA' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import GameSearch from '@/components/GameSearch.vue';
    export default {
        components: {
            GameSearch
        },
        data() {
            return {
                game: null,
                gameData: null,
                quarterFieldsTeam: [{
                    key: 'team',
                    label: 'Team'
                }, {
                    key: 'quarter1',
                    label: '1'
                }, {
                    key: 'quarter2',
                    label: '2'
                }, {
                    key: 'quarter3',
                    label: '3'
                }, {
                    key: 'quarter4',
                    label: '4'
                }, {
                    key: 'total',
                    label: 'Total'
                }],
                playerFields: [{
                    key: 'player',
                    label: 'Player',
                    sortable: true
                }, {
                    key: 'total',
                    label: 'Total',
                    sortable: true
                }, {
                    key: 'quarter1',
                    label: '1',
                    sortable: true
                }, {
                    key: 'quarter2',
                    label: '2',
                    sortable: true
                }, {
                    key: 'quarter3',
                    label: '3',
                    sortable: true
                }, {
                    key: 'quarter4',
                    label: '4',
                    sortable: true
                }, {
                    key: 'rushing',
                    label: 'Rush',
                    sortable: true
                }, {
                    key: 'passing',
                    label: 'Pass',
                    sortable: true
                }]
            };
        },
        methods: {
            selectGame(game) {
                this.game = game;
                this.$axios.get('/game/box/advanced', {
                    params: {
                        gameId: this.game.id
                    }
                }).then(result => {
                    this.gameData = result.data;
                });
            }
        },
        computed: {
            overallTeamPPA() {
                return this.gameData.teams.ppa.map(d => ({
                    team: d.team,
                    quarter1: d.overall.quarter1,
                    quarter2: d.overall.quarter2,
                    quarter3: d.overall.quarter3,
                    quarter4: d.overall.quarter4,
                    total: d.overall.total
                }));
            },
            passingTeamPPA() {
                return this.gameData.teams.ppa.map(d => ({
                    team: d.team,
                    quarter1: d.passing.quarter1,
                    quarter2: d.passing.quarter2,
                    quarter3: d.passing.quarter3,
                    quarter4: d.passing.quarter4,
                    total: d.passing.total
                }));
            },
            rushingTeamPPA() {
                return this.gameData.teams.ppa.map(d => ({
                    team: d.team,
                    quarter1: d.rushing.quarter1,
                    quarter2: d.rushing.quarter2,
                    quarter3: d.rushing.quarter3,
                    quarter4: d.rushing.quarter4,
                    total: d.rushing.total
                }));
            },
            overallTeamSuccess() {
                return this.gameData.teams.successRates.map(d => ({
                    team: d.team,
                    quarter1: `${Math.round(d.overall.quarter1 * 100)}%`,
                    quarter2: `${Math.round(d.overall.quarter2 * 100)}%`,
                    quarter3: `${Math.round(d.overall.quarter3 * 100)}%`,
                    quarter4: `${Math.round(d.overall.quarter4 * 100)}%`,
                    total: `${Math.round(d.overall.total * 100)}%`
                }));
            },
            standardTeamSuccess() {
                return this.gameData.teams.successRates.map(d => ({
                    team: d.team,
                    quarter1: `${Math.round(d.standardDowns.quarter1 * 100)}%`,
                    quarter2: `${Math.round(d.standardDowns.quarter2 * 100)}%`,
                    quarter3: `${Math.round(d.standardDowns.quarter3 * 100)}%`,
                    quarter4: `${Math.round(d.standardDowns.quarter4 * 100)}%`,
                    total: `${Math.round(d.standardDowns.total * 100)}%`
                }));
            },
            passingTeamSuccess() {
                return this.gameData.teams.successRates.map(d => ({
                    team: d.team,
                    quarter1: `${Math.round(d.passingDowns.quarter1 * 100)}%`,
                    quarter2: `${Math.round(d.passingDowns.quarter2 * 100)}%`,
                    quarter3: `${Math.round(d.passingDowns.quarter3 * 100)}%`,
                    quarter4: `${Math.round(d.passingDowns.quarter4 * 100)}%`,
                    total: `${Math.round(d.passingDowns.total * 100)}%`
                }));
            },
            explosiveness() {
                return this.gameData.teams.explosiveness.map(d => ({
                    team: d.team,
                    quarter1: d.overall.quarter1,
                    quarter2: d.overall.quarter2,
                    quarter3: d.overall.quarter3,
                    quarter4: d.overall.quarter4,
                    total: d.overall.total
                }));
            },
            homeTeamUsage() {
                return this.gameData.players.usage.filter(p => p.team == this.game.homeTeam).map(d => ({
                    player: d.player,
                    quarter1: `${Math.round(d.quarter1 * 100)}%`,
                    quarter2: `${Math.round(d.quarter2 * 100)}%`,
                    quarter3: `${Math.round(d.quarter3 * 100)}%`,
                    quarter4: `${Math.round(d.quarter4 * 100)}%`,
                    total: `${Math.round(d.total * 100)}%`,
                    rushing: `${Math.round(d.rushing * 100)}%`,
                    passing: `${Math.round(d.passing * 100)}%`
                }));
            },
            awayTeamUsage() {
                return this.gameData.players.usage.filter(p => p.team == this.game.awayTeam).map(d => ({
                    player: d.player,
                    quarter1: `${Math.round(d.quarter1 * 100)}%`,
                    quarter2: `${Math.round(d.quarter2 * 100)}%`,
                    quarter3: `${Math.round(d.quarter3 * 100)}%`,
                    quarter4: `${Math.round(d.quarter4 * 100)}%`,
                    total: `${Math.round(d.total * 100)}%`,
                    rushing: `${Math.round(d.rushing * 100)}%`,
                    passing: `${Math.round(d.passing * 100)}%`
                }));
            },
            homeTeamAvgPPA() {
                return this.gameData.players.ppa.filter(p => p.team == this.game.homeTeam).map(d => ({
                    player: d.player,
                    quarter1: d.average.quarter1,
                    quarter2: d.average.quarter2,
                    quarter3: d.average.quarter3,
                    quarter4: d.average.quarter4,
                    total: d.average.total,
                    rushing: d.average.rushing,
                    passing: d.average.passing
                }));
            },
            awayTeamAvgPPA() {
                return this.gameData.players.ppa.filter(p => p.team == this.game.awayTeam).map(d => ({
                    player: d.player,
                    quarter1: d.average.quarter1,
                    quarter2: d.average.quarter2,
                    quarter3: d.average.quarter3,
                    quarter4: d.average.quarter4,
                    total: d.average.total,
                    rushing: d.average.rushing,
                    passing: d.average.passing
                }));
            },
            homeTeamCumPPA() {
                return this.gameData.players.ppa.filter(p => p.team == this.game.homeTeam).map(d => ({
                    player: d.player,
                    quarter1: d.cumulative.quarter1,
                    quarter2: d.cumulative.quarter2,
                    quarter3: d.cumulative.quarter3,
                    quarter4: d.cumulative.quarter4,
                    total: d.cumulative.total,
                    rushing: d.cumulative.rushing,
                    passing: d.cumulative.passing
                }));
            },
            awayTeamCumPPA() {
                return this.gameData.players.ppa.filter(p => p.team == this.game.awayTeam).map(d => ({
                    player: d.player,
                    quarter1: d.cumulative.quarter1,
                    quarter2: d.cumulative.quarter2,
                    quarter3: d.cumulative.quarter3,
                    quarter4: d.cumulative.quarter4,
                    total: d.cumulative.total,
                    rushing: d.cumulative.rushing,
                    passing: d.cumulative.passing
                }));
            },
            rushingFields() {
                if (!this.gameData) {
                    return [];
                }

                return [{
                    key: 'metric',
                    label: '',
                    class: 'text-left'
                }, {
                    key: 'team1',
                    label: this.gameData.teams.rushing[0].team
                }, {
                    key: 'team2',
                    label: this.gameData.teams.rushing[1].team
                }];
            },
            rushingMetrics() {
                if (!this.gameData) {
                    return [];
                }

                return [{
                    metric: 'Power Success',
                    team1: this.gameData.teams.rushing[0].powerSuccess,
                    team2: this.gameData.teams.rushing[1].powerSuccess
                }, {
                    metric: 'Stuff Rate',
                    team1: this.gameData.teams.rushing[0].stuffRate,
                    team2: this.gameData.teams.rushing[1].stuffRate
                }, {
                    metric: 'Second Level Yards',
                    team1: this.gameData.teams.rushing[0].secondLevelYards,
                    team2: this.gameData.teams.rushing[1].secondLevelYards
                }, {
                    metric: 'Second Level Yards per Rush',
                    team1: this.gameData.teams.rushing[0].secondLevelYardsAverage,
                    team2: this.gameData.teams.rushing[1].secondLevelYardsAverage
                }, {
                    metric: 'Open Field Yards',
                    team1: this.gameData.teams.rushing[0].openFieldYards,
                    team2: this.gameData.teams.rushing[1].openFieldYards
                }, {
                    metric: 'Open Field Yards per Rush',
                    team1: this.gameData.teams.rushing[0].openFieldYardsAverage,
                    team2: this.gameData.teams.rushing[1].openFieldYardsAverage
                }]
            }
        }
    }

</script>

<style lang='scss'>
    .player-column {
        border-left: 1px solid black;
    }

    .box-score-card {
        hr {
            width: 90%;
        }
    }

</style>
