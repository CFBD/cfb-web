<template>
    <b-container class="page-container">
        <b-row v-if='loading'>
            <b-col>
                <b-card>
                    <b-spinner />
                </b-card>
            </b-col>
        </b-row>
        <b-row v-if='!loading'>
            <b-col>
                <b-card :title='`${teamStats.team} (${year})`' class='box-score-card'>
                    <b-row>
                        <b-col v-if='!hasPlayerData' />
                        <b-col :lg='hasPlayerData ? 6 : 9' class='team-column'>
                            <h5>Team Metrics</h5>
                            <hr>
                            <b-row class='justify-content-center' v-b-popover.hover.righttop="{ variant: 'primary', content: popovers.opportunities.content }" :title="popovers.opportunities.title">
                                <h6><strong>Scoring Opportunities</strong></h6>
                                <b-table :items='scoringMetrics' :fields='teamFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center' v-b-popover.hover.righttop="{ variant: 'primary', content: popovers.fieldPosition.content }" :title="popovers.fieldPosition.title">
                                <h6><strong>Field Position</strong></h6>
                                <b-table :items='fieldPosition' :fields='teamFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center' v-b-popover.hover.righttop="{ variant: 'primary', content: popovers.rushing.content }" :title="popovers.rushing.title">
                                <h6><strong>Rushing</strong></h6>
                                <b-table :items='rushingMetrics' :fields='teamFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center' v-b-popover.hover.righttop="{ variant: 'primary', content: popovers.havoc.content }" :title="popovers.havoc.title">
                                <h6><strong>Havoc</strong></h6>
                                <b-table :items='havocMetrics' :fields='teamFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center' v-b-popover.hover.righttop="{ variant: 'primary', content: popovers.ppa.content }" :title="popovers.ppa.title">
                                <h6><strong>Predicted Points Added</strong></h6>
                                <b-table :items='teamPPAMetrics' :fields='teamFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center' v-b-popover.hover.righttop="{ variant: 'primary', content: popovers.success.content }" :title="popovers.success.title">
                                <h6><strong>Success Rate</strong></h6>
                                <b-table :items='teamSuccessMetrics' :fields='teamFields' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center' v-b-popover.hover.righttop="{ variant: 'primary', content: popovers.explosiveness.content }" :title="popovers.explosiveness.title">
                                <h6><strong>Explosiveness</strong></h6>
                                <b-table :items='explosivenessMetrics' :fields='teamFields' small responsive>
                                </b-table>
                            </b-row>
                        </b-col>
                        <b-col lg='6' class='player-column' v-if='hasPlayerData'>
                            <h5>Player Metrics</h5>
                            <hr>
                            <b-row class='justify-content-center' v-b-popover.hover.lefttop="{ variant: 'primary', content: popovers.usage.content }" :title="popovers.usage.title">
                                <h6><strong>Usage</strong></h6>
                                <b-table :items='playerUsageMetrics' :fields='playerUsageFields' sort-by='all' sort-desc='true' small responsive>
                                </b-table>
                            </b-row>
                            <hr>
                            <b-row class='justify-content-center' v-b-popover.hover.lefttop="{ variant: 'primary', content: popovers.ppa.content }" :title="popovers.ppa.title">
                                <h6><strong>Predicted Points Added</strong></h6>
                                <b-table :items='playerPPAMetrics' :fields='playerPPAFields' sort-by='all' sort-desc='true' small responsive>
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
    export default {
        name: 'Team',
        data() {
            return {
                year: 2021,
                team: null,
                loading: false,
                teamStats: null,
                hasPlayerData: false,
                playerUsage: null,
                playerPPA: null,
                popovers: {
                    winExpectancy: {
                        title: 'Win Expectancy',
                        content: 'Measures the win expectancy if the game were to be played again with each team attain the same stats'
                    },
                    excitementIndex: {
                        title: 'Excitement Index',
                        content: 'Measures the overall excitement of the game based on swings in in-game win probability. An average game scores around 4.0. There is no upper limit on score, but more exciting games will generally finish at 6.0 or higher.'
                    },
                    opportunities: {
                        title: 'Scoring Opportunities',
                        content: 'Analyzes drives in which the offense advanced the ball to out past the opponent\'s 40 yard line'
                    },
                    fieldPosition: {
                        title: 'Field Position',
                        content: 'Average starting field position in number of yards from opponent\'s goal line as well as average starting expected points'
                    },
                    rushing: {
                        title: 'Rushing',
                        content: 'Various rushing based metrics, some of which attempt to measure the effectiveness of the offensive line while others measure the performance of the team\'s backs'
                    },
                    havoc: {
                        title: 'Havoc',
                        content: 'Measures the percentage of plays in which the defensive generated a havoc event, such as a TFL, pass deflection, or turnover'
                    },
                    ppa: {
                        title: 'Predicted Points Added',
                        content: 'EPA metric that measures expected points added on an average play'
                    },
                    success: {
                        title: 'Success Rate',
                        content: 'A play is considered to by successful if it is a first down and at least 50% of yards to go are attained, or if it is 2nd down and at least 70% or yards to go are attained, or if it is a 3rd or 4th down that is converted for a first down or score'
                    },
                    explosiveness: {
                        title: 'Explosiveness',
                        content: 'Explosiveness measures the average expected points added on successful plays'
                    },
                    usage: {
                        title: 'Usage',
                        content: 'Usage measures the percentage of plays in which a player was involved, such as as a passer, a rusher, or a receiving target'
                    },
                    ppaCum: {
                        title: 'Predicted Points Added - Cumulative',
                        content: 'Cumulative PPA measures the sum of expected points added across all plays in which a player was involved'
                    }
                }
            }
        },
        methods: {
            loadData(team) {
                this.loading = true;
                this.team = team;
                this.$axios.get('/stats/season/advanced', {
                    params: {
                        year: this.year,
                        team: this.team,
                        excludeGarbageTime: false
                    }
                }).then(result => {
                    if (result.data && result.data.length) {
                        this.teamStats = result.data[0];
                    }
                    this.loading = false;
                });

                this.$axios.get('/player/usage', {
                    params: {
                        year: this.year,
                        team: this.team,
                        excludeGarbageTime: false
                    }
                }).then(result => {
                    if (result.data && result.data.length) {
                        this.playerUsage = result.data;
                        this.hasPlayerData = true;
                    }
                    this.loading = false;
                });

                this.$axios.get('/ppa/players/season', {
                    params: {
                        year: this.year,
                        team: this.team,
                        excludeGarbageTime: false
                    }
                }).then(result => {
                    if (result.data && result.data.length) {
                        this.playerPPA = result.data;
                        this.hasPlayerData = true;
                    }
                    this.loading = false;
                })
            },
            roundOne(value) {
                return Math.round(value * 10) / 10;
            },
            roundTwo(value) {
                return Math.round(value * 100) / 100;
            },
            roundThree(value) {
                return Math.round(value * 1000) / 1000;
            },
            percent(value) {
                return `${Math.round(parseFloat(value) * 100)}%`;
            },
            getPPAColor(ppa, isOffense) {
                if (isOffense) {
                    return ppa <= 0.09 ? 'danger' : ppa >= 0.27 ? 'success' : null;
                } else {
                    return ppa <= 0.09 ? 'success' : ppa >= 0.27 ? 'danger' : null;
                }
            },
            getRushPPAColor(ppa, isOffense) {
                if (isOffense) {
                    return ppa <= 0.05 ? 'danger' : ppa >= 0.23 ? 'success' : null;
                } else {
                    return ppa <= 0.05 ? 'success' : ppa >= 0.23 ? 'danger' : null;
                }
            },
            getPassPPAColor(ppa, isOffense) {
                if (isOffense) {
                    return ppa <= 0.08 ? 'danger' : ppa >= 0.38 ? 'success' : null;
                } else {
                    return ppa <= 0.08 ? 'success' : ppa >= 0.38 ? 'danger' : null;
                }
            },
            getSuccessColor(rate, isOffense) {
                if (isOffense) {
                    return rate < 0.39 ? 'danger' : rate >= 0.47 ? 'success' : null;
                } else {
                    return rate < 0.39 ? 'success' : rate >= 0.47 ? 'danger' : null;
                }
            },
            getSuccessStandardColor(rate, isOffense) {
                if (isOffense) {
                    return rate < 0.44 ? 'danger' : rate >= 0.52 ? 'success' : null;
                } else {
                    return rate < 0.44 ? 'success' : rate >= 0.52 ? 'danger' : null;
                }
            },
            getSuccessPassingColor(rate, isOffense) {
                if (isOffense) {
                    return rate < 0.28 ? 'danger' : rate >= 0.38 ? 'success' : null;
                } else {
                    return rate < 0.28 ? 'success' : rate >= 0.38 ? 'danger' : null;
                }
            },
            getExplosivenessColor(ppa, isOffense) {
                if (isOffense) {
                    return ppa < 1.11 ? 'danger' : ppa >= 1.29 ? 'success' : null;
                } else {
                    return ppa < 1.11 ? 'success' : ppa >= 1.29 ? 'danger' : null;
                }
            }
        },
        computed: {
            teamFields() {
                if (!this.teamStats) {
                    return [];
                }

                return [{
                    key: 'metric',
                    label: '',
                    class: 'text-left'
                }, {
                    key: 'offense',
                    label: 'Offense'
                }, {
                    key: 'defense',
                    label: 'Defense'
                }];
            },
            scoringMetrics() {
                if (!this.teamStats) {
                    return [];
                }

                return [{
                    metric: 'Opportunities',
                    offense: this.teamStats.offense.totalOpportunies,
                    defense: this.teamStats.defense.totalOpportunies
                }, {
                    metric: 'Points Per Opportunity',
                    offense: this.roundOne(this.teamStats.offense.pointsPerOpportunity),
                    defense: this.roundOne(this.teamStats.defense.pointsPerOpportunity),
                    _cellVariants: {
                        offense: this.teamStats.offense.pointsPerOpportunity < 3 ? 'danger' :
                            this.teamStats.offense.pointsPerOpportunity >= 4 ? 'success' :
                            null,
                        defense: this.teamStats.defense.pointsPerOpportunity < 3 ? 'success' :
                            this.teamStats.defense.pointsPerOpportunity >= 4 ? 'danger' :
                            null
                    }
                }]
            },
            fieldPosition() {
                if (!this.teamStats) {
                    return [];
                }

                return [{
                    metric: 'Average Start',
                    offense: this.roundOne(this.teamStats.offense.fieldPosition.averageStart),
                    defense: this.roundOne(this.teamStats.defense.fieldPosition.averageStart),
                    _cellVariants: {
                        offense: this.teamStats.offense.fieldPosition.averageStart > 72 ? 'danger' : this.teamStats.offense.fieldPosition.averageStart < 68 ? 'success' : null,
                        defense: this.teamStats.defense.fieldPosition.averageStart > 72 ? 'success' : this.teamStats.defense.fieldPosition.averageStart < 68 ? 'danger' : null
                    }
                }, {
                    metric: 'Average Expected Points',
                    offense: this.roundOne(this.teamStats.offense.fieldPosition.averagePredictedPoints),
                    defense: this.roundOne(this.teamStats.defense.fieldPosition.averagePredictedPoints),
                    _cellVariants: {
                        offense: this.teamStats.offense.fieldPosition.averagePredictedPoints > 1.6 ?
                            'success' : this.teamStats.offense.fieldPosition.averagePredictedPoints <
                            1.25 ? 'danger' : null,
                        defense: this.teamStats.defense.fieldPosition.averagePredictedPoints < -1.6 ?
                            'danger' : this.teamStats.defense.fieldPosition.averagePredictedPoints >
                            -1.25 ? 'success' : null
                    }
                }]
            },
            rushingMetrics() {
                if (!this.teamStats) {
                    return [];
                }

                return [{
                    metric: 'Power Success',
                    offense: this.percent(this.teamStats.offense.powerSuccess),
                    defense: this.percent(this.teamStats.defense.powerSuccess)
                }, {
                    metric: 'Stuff Rate',
                    offense: this.percent(this.teamStats.offense.stuffRate),
                    defense: this.percent(this.teamStats.defense.stuffRate),
                    _cellVariants: {
                        offense: this.teamStats.offense.stuffRate < 0.16 ? 'success' : this.teamStats.offense.stuffRate >= 0.22 ? 'danger' : null,
                        defense: this.teamStats.defense.stuffRate < 0.16 ? 'danger' : this.teamStats.defense.stuffRate >= 0.22 ? 'success' : null
                    }
                }, {
                    metric: 'Line Yards per Rush',
                    offense: this.roundOne(this.teamStats.offense.lineYards),
                    defense: this.roundOne(this.teamStats.defense.lineYards),
                    _cellVariants: {
                        offense: this.teamStats.offense.lineYards < 2.6 ? 'danger' : this.teamStats.offense.lineYards >= 3.2 ? 'success' : null,
                        defense: this.teamStats.defense.lineYards < 2.6 ? 'success' : this.teamStats.defense.lineYards >= 3.2 ? 'danger' : null
                    }
                }, {
                    metric: 'Second Level Yards per Rush',
                    offense: this.roundOne(this.teamStats.offense.secondLevelYards),
                    defense: this.roundOne(this.teamStats.defense.secondLevelYards),
                    _cellVariants: {
                        offense: this.teamStats.offense.secondLevelYards < 0.9 ? 'danger' : this.teamStats.offense.secondLevelYards >= 1.3 ? 'success' : null,
                        defense: this.teamStats.defense.secondLevelYards < 0.9 ? 'success' : this.teamStats.defense.secondLevelYards >= 1.3 ? 'danger' : null
                    }
                }, {
                    metric: 'Open Field Yards per Rush',
                    offense: this.roundOne(this.teamStats.offense.openFieldYards),
                    defense: this.roundOne(this.teamStats.defense.openFieldYards),
                    _cellVariants: {
                        offense: this.teamStats.offense.openFieldYards < 0.6 ? 'danger' : this.teamStats.offense.openFieldYards >= 1.8 ? 'success' : null,
                        defense: this.teamStats.defense.openFieldYards < 0.6 ? 'success' : this.teamStats.defense.openFieldYards >= 1.8 ? 'danger' : null
                    }
                }]
            },
            havocMetrics() {
                if (!this.teamStats) {
                    return [];
                }

                return [{
                    metric: 'Total',
                    offense: this.percent(this.teamStats.offense.havoc.total),
                    defense: this.percent(this.teamStats.defense.havoc.total),
                    _cellVariants: {
                        offense: this.teamStats.offense.havoc.total < .07 ? 'success' : this.teamStats.offense.havoc.total >= .21 ? 'danger' : null,
                        defense: this.teamStats.defense.havoc.total < .07 ? 'danger' : this.teamStats.defense.havoc.total >= .21 ? 'success' : null
                    }
                }, {
                    metric: 'Front Seven',
                    offense: this.percent(this.teamStats.offense.havoc.frontSeven),
                    defense: this.percent(this.teamStats.defense.havoc.frontSeven),
                    _cellVariants: {
                        offense: this.teamStats.offense.havoc.frontSeven < .035 ? 'success' : this.teamStats.offense.havoc.frontSeven >= .135 ? 'danger' : null,
                        defense: this.teamStats.defense.havoc.frontSeven < .035 ? 'danger' : this.teamStats.defense.havoc.frontSeven >= .135 ? 'success' : null
                    }
                }, {
                    metric: 'DB',
                    offense: this.percent(this.teamStats.offense.havoc.db),
                    defense: this.percent(this.teamStats.defense.havoc.db),
                    _cellVariants: {
                        offense: this.teamStats.offense.havoc.db < .025 ? 'success' : this.teamStats.offense.havoc.db >= .075 ? 'danger' : null,
                        defense: this.teamStats.defense.havoc.db < .025 ? 'danger' : this.teamStats.defense.havoc.db >= .075 ? 'success' : null
                    }
                }]
            },
            teamPPAMetrics() {
                if (!this.teamStats) {
                    return [];
                }

                return [{
                    metric: 'All',
                    offense: this.roundThree(this.teamStats.offense.ppa),
                    defense: this.roundThree(this.teamStats.defense.ppa),
                    _cellVariants: {
                        offense: this.getPPAColor(this.teamStats.offense.ppa, true),
                        defense: this.getPPAColor(this.teamStats.defense.ppa, false)
                    }
                }, {
                    metric: 'Rushing',
                    offense: this.roundThree(this.teamStats.offense.rushingPlays.ppa),
                    defense: this.roundThree(this.teamStats.defense.rushingPlays.ppa),
                    _cellVariants: {
                        offense: this.getRushPPAColor(this.teamStats.offense.rushingPlays.ppa, true),
                        defense: this.getRushPPAColor(this.teamStats.defense.rushingPlays.ppa, false)
                    }
                }, {
                    metric: 'Passing',
                    offense: this.roundThree(this.teamStats.offense.passingPlays.ppa),
                    defense: this.roundThree(this.teamStats.defense.passingPlays.ppa),
                    _cellVariants: {
                        offense: this.getPassPPAColor(this.teamStats.offense.passingPlays.ppa, true),
                        defense: this.getPassPPAColor(this.teamStats.defense.passingPlays.ppa, false)
                    }
                }];
            },
            teamSuccessMetrics() {
                if (!this.teamStats) {
                    return [];
                }

                return [{
                    metric: 'All',
                    offense: this.percent(this.teamStats.offense.successRate),
                    defense: this.percent(this.teamStats.defense.successRate),
                    _cellVariants: {
                        offense: this.getSuccessColor(this.teamStats.offense.successRate, true),
                        defense: this.getSuccessColor(this.teamStats.defense.successRate, false)
                    }
                }, {
                    metric: 'Standard Downs',
                    offense: this.percent(this.teamStats.offense.standardDowns.successRate),
                    defense: this.percent(this.teamStats.defense.standardDowns.successRate),
                    _cellVariants: {
                        offense: this.getSuccessStandardColor(this.teamStats.offense.standardDowns.successRate, true),
                        defense: this.getSuccessStandardColor(this.teamStats.defense.standardDowns.successRate, false)
                    }
                }, {
                    metric: 'Passing Downs',
                    offense: this.percent(this.teamStats.offense.passingDowns.successRate),
                    defense: this.percent(this.teamStats.defense.passingDowns.successRate),
                    _cellVariants: {
                        offense: this.getSuccessPassingColor(this.teamStats.offense.passingDowns.successRate, true),
                        defense: this.getSuccessPassingColor(this.teamStats.defense.passingDowns.successRate, false)
                    }
                }];
            },
            explosivenessMetrics() {
                if (!this.teamStats) {
                    return [];
                }

                return [{
                    metric: 'All',
                    offense: this.roundTwo(this.teamStats.offense.explosiveness),
                    defense: this.roundTwo(this.teamStats.defense.explosiveness),
                    _cellVariants: {
                        offense: this.getExplosivenessColor(this.teamStats.offense.explosiveness, true),
                        defense: this.getExplosivenessColor(this.teamStats.defense.explosiveness, false)
                    }
                }, {
                    metric: 'Rushing',
                    offense: this.roundTwo(this.teamStats.offense.rushingPlays.explosiveness),
                    defense: this.roundTwo(this.teamStats.defense.rushingPlays.explosiveness),
                    _cellVariants: {
                        offense: this.getExplosivenessColor(this.teamStats.offense.rushingPlays.explosiveness, true),
                        defense: this.getExplosivenessColor(this.teamStats.defense.rushingPlays.explosiveness, false)
                    }
                }, {
                    metric: 'Passing',
                    offense: this.roundTwo(this.teamStats.offense.passingPlays.explosiveness),
                    defense: this.roundTwo(this.teamStats.defense.passingPlays.explosiveness),
                    _cellVariants: {
                        offense: this.getExplosivenessColor(this.teamStats.offense.passingPlays.explosiveness, true),
                        defense: this.getExplosivenessColor(this.teamStats.defense.passingPlays.explosiveness, false)
                    }
                }];
            },
            playerUsageFields() {
                if (!this.playerUsage) {
                    return [];
                }

                return [{
                    key: 'player',
                    label: '',
                    class: 'text-right',
                    sortable: true
                }, {
                    key: 'position',
                    label: 'Position'
                }, {
                    key: 'all',
                    label: 'All',
                    sortable: true
                }, {
                    key: 'rushing',
                    label: 'Rush',
                    sortable: true
                }, {
                    key: 'passing',
                    label: 'Pass',
                    sortable: true
                }, {
                    key: 'standardDowns',
                    label: 'Standard Downs',
                    sortable: true
                }, {
                    key: 'passingDowns',
                    label: 'Passing Downs',
                    sortable: true
                }];
            },
            playerUsageMetrics() {
                if (!this.playerUsage) {
                    return [];
                }

                return this.playerUsage.map(u => ({
                    player: u.name,
                    position: u.position,
                    all: this.percent(u.usage.overall),
                    rushing: this.percent(u.usage.rush),
                    passing: this.percent(u.usage.pass),
                    standardDowns: this.percent(u.usage.standardDowns),
                    passingDowns: this.percent(u.usage.passingDowns)
                }));
            },
            playerPPAFields() {
                if (!this.playerPPA) {
                    return [];
                }

                return [{
                    key: 'player',
                    label: '',
                    class: 'text-right',
                    sortable: true
                }, {
                    key: 'position',
                    label: 'Position'
                }, {
                    key: 'all',
                    label: 'All',
                    sortable: true
                }, {
                    key: 'rushing',
                    label: 'Rush',
                    sortable: true
                }, {
                    key: 'passing',
                    label: 'Pass',
                    sortable: true
                }];
            },
            playerPPAMetrics() {
                if (!this.playerPPA) {
                    return [];
                }

                return this.playerPPA.map(u => ({
                    player: u.name,
                    position: u.position,
                    all: this.roundThree(u.averagePPA.all),
                    rushing: this.roundThree(u.averagePPA.rush),
                    passing: this.roundThree(u.averagePPA.pass)
                }));
            }
        },
        filters: {
            percent(value) {
                return this.percent(value);
            },
            roundOne(value) {
                return this.roundOne(value);
            }
        },
        created() {
            if (this.$route.params.team) {
                this.loadData(this.$route.params.team);
            }
        },
        watch: {
            '$route': function (to, from) {
                if (to.params.team && to.params.team !== from.params.team) {
                    this.loadData(to.params.team);
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
