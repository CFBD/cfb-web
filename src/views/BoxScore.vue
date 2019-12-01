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
                <b-card :title='`${game.home_team} ${game.home_points}, ${game.away_team} ${game.away_points}`'
                    sub-title='Note: Garbage time is filtered from player stats' class='box-score-card'>
                    <b-link :to='`/wp/${game.id}`'>View win probability chart</b-link>
                    <b-row>
                        <b-col v-if='!hasPlayerData' />
                        <b-col :lg='hasPlayerData ? 6 : 9' class='team-column'>
                            <h5>Team Metrics</h5>
                            <hr>
                            <b-row class='justify-content-center'>
                                <b-col>
                                    <b-row class='justify-content-center'>
                                        <h6><strong>Post Game Win Probability</strong></h6>
                                    </b-row>
                                    <b-row class='justify-content-center'>
                                        <p>{{winProbability}}</p>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>Scoring Opportunities</strong></h6>
                                <b-table :items='scoringMetrics' :fields='scoringFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>Rushing</strong></h6>
                                <b-table :items='rushingMetrics' :fields='rushingFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center' v-if='this.game.season > 2015'>
                                <h6><strong>Defensive Havoc</strong></h6>
                                <b-table :items='havocMetrics' :fields='havocFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr v-if='this.game.season > 2015'>
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
                        <b-col lg='6' class='player-column' v-if='hasPlayerData'>
                            <h5>Player Metrics</h5>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>Usage</strong></h6>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.home_team }}</label>
                                <b-table :items='homeTeamUsage' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.away_team }}</label>
                                <b-table :items='awayTeamUsage' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>PPA (Avg)</strong></h6>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.home_team }}</label>
                                <b-table :items='homeTeamAvgPPA' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.away_team }}</label>
                                <b-table :items='awayTeamAvgPPA' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center'>
                                <h6><strong>PPA (Cum.)</strong></h6>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.home_team }}</label>
                                <b-table :items='homeTeamCumPPA' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                            <b-row class='justify-content-center mt-2'>
                                <label class='muted'>{{ this.game.away_team }}</label>
                                <b-table :items='awayTeamCumPPA' :fields='playerFields' small responsive>
                                </b-table>
                            </b-row>
                        </b-col>
                        <b-col v-if='!hasPlayerData' />
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
                this.loadGame(game.id);
            },
            loadGame(id) {
                this.$axios.get('/games', {
                    params: {
                        id
                    }
                }).then(result => {
                    if (result.data && result.data.length) {
                        this.game = result.data[0];

                        this.$router.push({
                            path: `/boxscore/${this.game.id}`
                        });

                        this.$axios.get('/game/box/advanced', {
                            params: {
                                gameId: this.game.id
                            }
                        }).then(result => {
                            this.gameData = result.data;
                        });
                    }
                });
            },
            getPPAColor(ppa) {
                return ppa <= 0 ? 'danger' : ppa >= 0.4 ? 'success' : null;
            },
            getRushPPAColor(ppa) {
                return ppa <= 0 ? 'danger' : ppa >= 0.3 ? 'success' : null;
            },
            getPassPPAColor(ppa) {
                return ppa <= 0.1 ? 'danger' : ppa >= 0.5 ? 'success' : null;
            },
            getSuccessColor(rate) {
                return rate < 0.3 ? 'danger' : rate >= 0.5 ? 'success' : null;
            },
            getSuccessStandardColor(rate) {
                return rate < 0.35 ? 'danger' : rate >= 0.55 ? 'success' : null;
            },
            getSuccessPassingColor(rate) {
                return rate < 0.2 ? 'danger' : rate >= 0.4 ? 'success' : null;
            },
            getExplosivenessColor(ppa) {
                return ppa < 1 ? 'danger' : ppa >= 1.5 ? 'success' : null;
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
                    total: d.overall.total,
                    _cellVariants: {
                        quarter1: this.getPPAColor(d.overall.quarter1),
                        quarter2: this.getPPAColor(d.overall.quarter2),
                        quarter3: this.getPPAColor(d.overall.quarter3),
                        quarter4: this.getPPAColor(d.overall.quarter4),
                        total: this.getPPAColor(d.overall.total)
                    }
                }));
            },
            passingTeamPPA() {
                return this.gameData.teams.ppa.map(d => ({
                    team: d.team,
                    quarter1: d.passing.quarter1,
                    quarter2: d.passing.quarter2,
                    quarter3: d.passing.quarter3,
                    quarter4: d.passing.quarter4,
                    total: d.passing.total,
                    _cellVariants: {
                        quarter1: this.getPassPPAColor(d.passing.quarter1),
                        quarter2: this.getPassPPAColor(d.passing.quarter2),
                        quarter3: this.getPassPPAColor(d.passing.quarter3),
                        quarter4: this.getPassPPAColor(d.passing.quarter4),
                        total: this.getPassPPAColor(d.passing.total)
                    }
                }));
            },
            rushingTeamPPA() {
                return this.gameData.teams.ppa.map(d => ({
                    team: d.team,
                    quarter1: d.rushing.quarter1,
                    quarter2: d.rushing.quarter2,
                    quarter3: d.rushing.quarter3,
                    quarter4: d.rushing.quarter4,
                    total: d.rushing.total,
                    _cellVariants: {
                        quarter1: this.getRushPPAColor(d.rushing.quarter1),
                        quarter2: this.getRushPPAColor(d.rushing.quarter2),
                        quarter3: this.getRushPPAColor(d.rushing.quarter3),
                        quarter4: this.getRushPPAColor(d.rushing.quarter4),
                        total: this.getRushPPAColor(d.rushing.total)
                    }
                }));
            },
            overallTeamSuccess() {
                return this.gameData.teams.successRates.map(d => ({
                    team: d.team,
                    quarter1: `${Math.round(d.overall.quarter1 * 100)}%`,
                    quarter2: `${Math.round(d.overall.quarter2 * 100)}%`,
                    quarter3: `${Math.round(d.overall.quarter3 * 100)}%`,
                    quarter4: `${Math.round(d.overall.quarter4 * 100)}%`,
                    total: `${Math.round(d.overall.total * 100)}%`,
                    _cellVariants: {
                        quarter1: this.getSuccessColor(d.overall.quarter1),
                        quarter2: this.getSuccessColor(d.overall.quarter2),
                        quarter3: this.getSuccessColor(d.overall.quarter3),
                        quarter4: this.getSuccessColor(d.overall.quarter4),
                        total: this.getSuccessColor(d.overall.total)
                    }
                }));
            },
            standardTeamSuccess() {
                return this.gameData.teams.successRates.map(d => ({
                    team: d.team,
                    quarter1: `${Math.round(d.standardDowns.quarter1 * 100)}%`,
                    quarter2: `${Math.round(d.standardDowns.quarter2 * 100)}%`,
                    quarter3: `${Math.round(d.standardDowns.quarter3 * 100)}%`,
                    quarter4: `${Math.round(d.standardDowns.quarter4 * 100)}%`,
                    total: `${Math.round(d.standardDowns.total * 100)}%`,
                    _cellVariants: {
                        quarter1: this.getSuccessStandardColor(d.standardDowns.quarter1),
                        quarter2: this.getSuccessStandardColor(d.standardDowns.quarter2),
                        quarter3: this.getSuccessStandardColor(d.standardDowns.quarter3),
                        quarter4: this.getSuccessStandardColor(d.standardDowns.quarter4),
                        total: this.getSuccessStandardColor(d.standardDowns.total)
                    }
                }));
            },
            passingTeamSuccess() {
                return this.gameData.teams.successRates.map(d => ({
                    team: d.team,
                    quarter1: `${Math.round(d.passingDowns.quarter1 * 100)}%`,
                    quarter2: `${Math.round(d.passingDowns.quarter2 * 100)}%`,
                    quarter3: `${Math.round(d.passingDowns.quarter3 * 100)}%`,
                    quarter4: `${Math.round(d.passingDowns.quarter4 * 100)}%`,
                    total: `${Math.round(d.passingDowns.total * 100)}%`,
                    _cellVariants: {
                        quarter1: this.getSuccessPassingColor(d.passingDowns.quarter1),
                        quarter2: this.getSuccessPassingColor(d.passingDowns.quarter2),
                        quarter3: this.getSuccessPassingColor(d.passingDowns.quarter3),
                        quarter4: this.getSuccessPassingColor(d.passingDowns.quarter4),
                        total: this.getSuccessPassingColor(d.passingDowns.total)
                    }
                }));
            },
            explosiveness() {
                return this.gameData.teams.explosiveness.map(d => ({
                    team: d.team,
                    quarter1: d.overall.quarter1,
                    quarter2: d.overall.quarter2,
                    quarter3: d.overall.quarter3,
                    quarter4: d.overall.quarter4,
                    total: d.overall.total,
                    _cellVariants: {
                        quarter1: this.getExplosivenessColor(d.overall.quarter1),
                        quarter2: this.getExplosivenessColor(d.overall.quarter2),
                        quarter3: this.getExplosivenessColor(d.overall.quarter3),
                        quarter4: this.getExplosivenessColor(d.overall.quarter4),
                        total: this.getExplosivenessColor(d.overall.total),
                    }
                }));
            },
            homeTeamUsage() {
                return this.gameData.players.usage.filter(p => p.team == this.game.home_team).map(d => ({
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
                return this.gameData.players.usage.filter(p => p.team == this.game.away_team).map(d => ({
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
                return this.gameData.players.ppa.filter(p => p.team == this.game.home_team).map(d => ({
                    player: d.player,
                    quarter1: d.average.quarter1,
                    quarter2: d.average.quarter2,
                    quarter3: d.average.quarter3,
                    quarter4: d.average.quarter4,
                    total: d.average.total,
                    rushing: d.average.rushing,
                    passing: d.average.passing,
                    _cellVariants: {
                        quarter1: d.average.quarter1 < 0 ? 'danger' : d.average.quarter1 >= 0.5 ? 'success' : null,
                        quarter2: d.average.quarter2 < 0 ? 'danger' : d.average.quarter2 >= 0.5 ? 'success' : null,
                        quarter3: d.average.quarter3 < 0 ? 'danger' : d.average.quarter3 >= 0.5 ? 'success' : null,
                        quarter4: d.average.quarter4 < 0 ? 'danger' : d.average.quarter4 >= 0.5 ? 'success' : null,
                        total: d.average.total < 0 ? 'danger' : d.average.total >= 0.5 ? 'success' : null,
                        rushing: d.average.rushing < 0 ? 'danger' : d.average.rushing >= 0.5 ? 'success' : null,
                        passing: d.average.passing < 0 ? 'danger' : d.average.passing >= 0.5 ? 'success' : null,
                    }
                }));
            },
            awayTeamAvgPPA() {
                return this.gameData.players.ppa.filter(p => p.team == this.game.away_team).map(d => ({
                    player: d.player,
                    quarter1: d.average.quarter1,
                    quarter2: d.average.quarter2,
                    quarter3: d.average.quarter3,
                    quarter4: d.average.quarter4,
                    total: d.average.total,
                    rushing: d.average.rushing,
                    passing: d.average.passing,
                    _cellVariants: {
                        quarter1: d.average.quarter1 < 0 ? 'danger' : d.average.quarter1 >= 0.5 ? 'success' : null,
                        quarter2: d.average.quarter2 < 0 ? 'danger' : d.average.quarter2 >= 0.5 ? 'success' : null,
                        quarter3: d.average.quarter3 < 0 ? 'danger' : d.average.quarter3 >= 0.5 ? 'success' : null,
                        quarter4: d.average.quarter4 < 0 ? 'danger' : d.average.quarter4 >= 0.5 ? 'success' : null,
                        total: d.average.total < 0 ? 'danger' : d.average.total >= 0.5 ? 'success' : null,
                        rushing: d.average.rushing < 0 ? 'danger' : d.average.rushing >= 0.5 ? 'success' : null,
                        passing: d.average.passing < 0 ? 'danger' : d.average.passing >= 0.5 ? 'success' : null,
                    }
                }));
            },
            homeTeamCumPPA() {
                return this.gameData.players.ppa.filter(p => p.team == this.game.home_team).map(d => ({
                    player: d.player,
                    quarter1: d.cumulative.quarter1,
                    quarter2: d.cumulative.quarter2,
                    quarter3: d.cumulative.quarter3,
                    quarter4: d.cumulative.quarter4,
                    total: d.cumulative.total,
                    rushing: d.cumulative.rushing,
                    passing: d.cumulative.passing,
                    _cellVariants: {
                        quarter1: d.cumulative.quarter1 < 0 ? 'danger' : d.cumulative.quarter1 >= 2.5 ? 'success' : null,
                        quarter2: d.cumulative.quarter2 < 0 ? 'danger' : d.cumulative.quarter2 >= 2.5 ? 'success' : null,
                        quarter3: d.cumulative.quarter3 < 0 ? 'danger' : d.cumulative.quarter3 >= 2.5 ? 'success' : null,
                        quarter4: d.cumulative.quarter4 < 0 ? 'danger' : d.cumulative.quarter4 >= 2.5 ? 'success' : null,
                        total: d.cumulative.total < 0 ? 'danger' : d.cumulative.total >= 10 ? 'success' : null,
                        rushing: d.cumulative.rushing < 0 ? 'danger' : d.cumulative.rushing >= 10 ? 'success' : null,
                        passing: d.cumulative.passing < 0 ? 'danger' : d.cumulative.passing >= 10 ? 'success' : null,
                    }
                }));
            },
            awayTeamCumPPA() {
                return this.gameData.players.ppa.filter(p => p.team == this.game.away_team).map(d => ({
                    player: d.player,
                    quarter1: d.cumulative.quarter1,
                    quarter2: d.cumulative.quarter2,
                    quarter3: d.cumulative.quarter3,
                    quarter4: d.cumulative.quarter4,
                    total: d.cumulative.total,
                    rushing: d.cumulative.rushing,
                    passing: d.cumulative.passing,
                    _cellVariants: {
                        quarter1: d.cumulative.quarter1 < 0 ? 'danger' : d.cumulative.quarter1 >= 2.5 ? 'success' : null,
                        quarter2: d.cumulative.quarter2 < 0 ? 'danger' : d.cumulative.quarter2 >= 2.5 ? 'success' : null,
                        quarter3: d.cumulative.quarter3 < 0 ? 'danger' : d.cumulative.quarter3 >= 2.5 ? 'success' : null,
                        quarter4: d.cumulative.quarter4 < 0 ? 'danger' : d.cumulative.quarter4 >= 2.5 ? 'success' : null,
                        total: d.cumulative.total < 0 ? 'danger' : d.cumulative.total >= 10 ? 'success' : null,
                        rushing: d.cumulative.rushing < 0 ? 'danger' : d.cumulative.rushing >= 10 ? 'success' : null,
                        passing: d.cumulative.passing < 0 ? 'danger' : d.cumulative.passing >= 10 ? 'success' : null,
                    }
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
                    team2: this.gameData.teams.rushing[1].stuffRate,
                    _cellVariants: {
                        team1: this.gameData.teams.rushing[0].stuffRate < 0.15 ? 'success' : this.gameData.teams.rushing[0].stuffRate >= 0.3 ? 'danger' : null,
                        team2: this.gameData.teams.rushing[1].stuffRate < 0.15 ? 'success' : this.gameData.teams.rushing[1].stuffRate >= 0.3 ? 'danger' : null
                    }
                }, {
                    metric: 'Line Yards',
                    team1: this.gameData.teams.rushing[0].lineYards,
                    team2: this.gameData.teams.rushing[1].lineYards
                }, {
                    metric: 'Line Yards per Rush',
                    team1: this.gameData.teams.rushing[0].lineYardsAverage,
                    team2: this.gameData.teams.rushing[1].lineYardsAverage,
                    _cellVariants: {
                        team1: this.gameData.teams.rushing[0].lineYardsAverage < 2.5 ? 'danger' : this.gameData.teams.rushing[0].lineYardsAverage >= 3.5 ? 'success' : null,
                        team2: this.gameData.teams.rushing[1].lineYardsAverage < 2.5 ? 'danger' : this.gameData.teams.rushing[1].lineYardsAverage >= 3.5 ? 'success' : null
                    }
                }, {
                    metric: 'Second Level Yards',
                    team1: this.gameData.teams.rushing[0].secondLevelYards,
                    team2: this.gameData.teams.rushing[1].secondLevelYards
                }, {
                    metric: 'Second Level Yards per Rush',
                    team1: this.gameData.teams.rushing[0].secondLevelYardsAverage,
                    team2: this.gameData.teams.rushing[1].secondLevelYardsAverage,
                    _cellVariants: {
                        team1: this.gameData.teams.rushing[0].secondLevelYardsAverage < 0.7 ? 'danger' : this.gameData.teams.rushing[0].secondLevelYardsAverage >= 1.5 ? 'success' : null,
                        team2: this.gameData.teams.rushing[1].secondLevelYardsAverage < 0.7 ? 'danger' : this.gameData.teams.rushing[1].secondLevelYardsAverage >= 1.5 ? 'success' : null
                    }
                }, {
                    metric: 'Open Field Yards',
                    team1: this.gameData.teams.rushing[0].openFieldYards,
                    team2: this.gameData.teams.rushing[1].openFieldYards
                }, {
                    metric: 'Open Field Yards per Rush',
                    team1: this.gameData.teams.rushing[0].openFieldYardsAverage,
                    team2: this.gameData.teams.rushing[1].openFieldYardsAverage,
                    _cellVariants: {
                        team1: this.gameData.teams.rushing[0].openFieldYardsAverage < 1 ? 'danger' : this.gameData.teams.rushing[0].openFieldYardsAverage >= 2 ? 'success' : null,
                        team2: this.gameData.teams.rushing[1].openFieldYardsAverage < 1 ? 'danger' : this.gameData.teams.rushing[1].openFieldYardsAverage >= 2 ? 'success' : null
                    }
                }]
            },
            havocFields() {
                if (!this.gameData) {
                    return [];
                }

                return [{
                    key: 'metric',
                    label: '',
                    class: 'text-left'
                }, {
                    key: 'team1',
                    label: this.gameData.teams.havoc[0].team
                }, {
                    key: 'team2',
                    label: this.gameData.teams.havoc[1].team
                }];
            },
            havocMetrics() {
                if (!this.gameData) {
                    return [];
                }

                return [{
                    metric: 'Total',
                    team1: this.gameData.teams.havoc[0].total,
                    team2: this.gameData.teams.havoc[1].total,
                    _cellVariants: {
                        team1: this.gameData.teams.havoc[0].total < .1 ? 'danger' : this.gameData.teams.havoc[0].total >= .25 ? 'success' : null,
                        team2: this.gameData.teams.havoc[1].total < .1 ? 'danger' : this.gameData.teams.havoc[1].total >= .25 ? 'success' : null
                    }
                }, {
                    metric: 'Front Seven',
                    team1: this.gameData.teams.havoc[0].frontSeven,
                    team2: this.gameData.teams.havoc[1].frontSeven,
                    _cellVariants: {
                        team1: this.gameData.teams.havoc[0].frontSeven < .07 ? 'danger' : this.gameData.teams.havoc[0].frontSeven >= .15 ? 'success' : null,
                        team2: this.gameData.teams.havoc[1].frontSeven < .07 ? 'danger' : this.gameData.teams.havoc[1].frontSeven >= .15 ? 'success' : null
                    }
                }, {
                    metric: 'DB',
                    team1: this.gameData.teams.havoc[0].db,
                    team2: this.gameData.teams.havoc[1].db,
                    _cellVariants: {
                        team1: this.gameData.teams.havoc[0].db < .04 ? 'danger' : this.gameData.teams.havoc[0].db >= .1 ? 'success' : null,
                        team2: this.gameData.teams.havoc[1].db < .04 ? 'danger' : this.gameData.teams.havoc[1].db >= .1 ? 'success' : null
                    }
                }]
            },
            scoringFields() {
                if (!this.gameData) {
                    return [];
                }

                return [{
                    key: 'metric',
                    label: '',
                    class: 'text-left'
                }, {
                    key: 'team1',
                    label: this.gameData.teams.scoringOpportunities[0].team
                }, {
                    key: 'team2',
                    label: this.gameData.teams.scoringOpportunities[1].team
                }];
            },
            scoringMetrics() {
                if (!this.gameData) {
                    return [];
                }

                return [{
                    metric: 'Opportunities',
                    team1: this.gameData.teams.scoringOpportunities[0].opportunities,
                    team2: this.gameData.teams.scoringOpportunities[1].opportunities
                }, {
                    metric: 'Points',
                    team1: this.gameData.teams.scoringOpportunities[0].points,
                    team2: this.gameData.teams.scoringOpportunities[1].points
                }, {
                    metric: 'Points Per Opportunity',
                    team1: this.gameData.teams.scoringOpportunities[0].pointsPerOpportunity,
                    team2: this.gameData.teams.scoringOpportunities[1].pointsPerOpportunity,
                    _cellVariants: {
                        team1: this.gameData.teams.scoringOpportunities[0].pointsPerOpportunity < 3 ? 'danger' : this.gameData.teams.scoringOpportunities[0].pointsPerOpportunity >= 4 ? 'success' : null,
                        team2: this.gameData.teams.scoringOpportunities[1].pointsPerOpportunity < 3 ? 'danger' : this.gameData.teams.scoringOpportunities[1].pointsPerOpportunity >= 4 ? 'success' : null
                    }
                }]
            },
            hasPlayerData() {
                return this.gameData && this.gameData.players.ppa.length ? true : false;
            },
            winProbability() {
                if (this.game.away_post_win_prob > this.game.home_post_win_prob) {
                    return `${this.game.away_team} ${Math.round(this.game.away_post_win_prob * 100)}%`;
                } else {
                    return `${this.game.home_team} ${Math.round(this.game.home_post_win_prob * 100)}%`;
                }
            }
        },
        created() {
            if (this.$route.params.id) {
                this.loadGame(this.$route.params.id);
            }
        },
        watch: {
            '$route': function (to, from) {
                if (to.params.id && to.params.id !== from.params.id) {
                    this.loadGame(to.params.id);
                }
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
