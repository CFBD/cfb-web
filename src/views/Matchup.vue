<template>
    <b-container class='page-container'>
        <b-card>
            <b-row>
                <b-col>
                    <h1>Matchup Tool</h1>
                    <p class='lead'>Select two teams to get matchup results and history.</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row>
                        <b-col sm='4'>
                            <label class='team-label'>Team 1:</label>
                        </b-col>
                        <b-col sm='8'>
                            <autocomplete display-prop='school' placeholder='Select a team...' :items='teams'
                                v-on:selection='updateTeam(1, $event)'></autocomplete>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-row>
                        <b-col sm='4'>
                            <label class='team-label'>Team 2:</label>
                        </b-col>
                        <b-col sm='8'>
                            <autocomplete display-prop='school' placeholder='Select a team...' :items='teams'
                                v-on:selection='updateTeam(2, $event)'></autocomplete>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row>
                        <b-col sm='4'>
                            <label class='team-label'>Start year (optional):</label>
                        </b-col>
                        <b-col sm='8'>
                            <b-form-input type='number' min='1869' max='3000' v-model='startYear'
                                placeholder='Pick a start year...' @change="getMatchup"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-row>
                        <b-col sm='4'>
                            <label class='team-label'>End year (optional):</label>
                        </b-col>
                        <b-col sm='8'>
                            <b-form-input type='number' min='1869' max='3000' v-model='endYear'
                                placeholder='Pick an end year...' @change="getMatchup"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-card>
        <div v-if='results'>
            <b-row>
                <b-col>
                    <b-card>
                        <b-row v-if='results' class='record-container'>
                            <b-col auto></b-col>
                            <b-col>
                                <b-img :src='team1.logos[0]' class='logo' />
                                <h2 class='team-name' :style='{ color: getColor(team1.color) }'>{{ team1.school }}</h2>
                            </b-col>
                            <b-col class='record'>
                                <div class='record-div'>
                                    <h1 class='text-center'>
                                        <strong>
                                            <span
                                                :style='{ color: getColor(team1.color) }'>{{results.team1Wins}}</span>-<span
                                                class='text-muted'>{{results.ties}}</span>-<span
                                                :style='{ color: getColor(team2.color) }'>{{results.team2Wins}}</span>
                                        </strong>
                                    </h1>
                                </div>
                            </b-col>
                            <b-col>
                                <b-img :src='team2.logos[0]' class='logo' />
                                <h2 class='team-name' :style='{ color: getColor(team2.color) }'>{{ team2.school }}</h2>
                            </b-col>
                            <b-col auto></b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
            <b-row class='data-container'>
                <b-col sm='6'>
                    <b-card>
                        <h3>Results</h3>
                        <b-table hover small :items='results.games' :fields='fields' :current-page="currentPage"
                            :per-page="perPage"></b-table>
                        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage"
                            align='center' />
                    </b-card>
                </b-col>
                <b-col sm='6'>
                    <b-card>
                        <matchup-scatter :chart-data='scatterData' :options='scatterOptions'></matchup-scatter>
                    </b-card>
                </b-col>
                <b-col sm='6'>
                    <b-card>
                        <win-history :chart-data='lineData'></win-history>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
    import Autocomplete from '@/components/Autocomplete.vue';
    import MatchupScatter from '@/components/MatchupScatter.vue';
    import WinHistory from '@/components/WinHistory.vue';

    export default {
        components: {
            Autocomplete,
            MatchupScatter,
            WinHistory
        },
        data() {
            return {
                teams: [],
                team1: null,
                team2: null,
                startYear: null,
                endYear: null,
                results: null,
                fields: [{
                        key: 'date',
                        label: 'Date',
                        formatter: d => new Date(d).toDateString()
                    },
                    {
                        key: 'homeTeam',
                        label: 'Home'
                    },
                    {
                        key: 'homeScore',
                        label: 'Points'
                    },
                    {
                        key: 'awayTeam',
                        label: 'Away'
                    },
                    {
                        key: 'awayScore',
                        label: 'Points'
                    }
                ],
                currentPage: 1,
                perPage: 10,
                totalRows: 0,
                scatterData: [],
                scatterOptions: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Historical Scores'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: 0,
                                max: 80
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Team2 Points'
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                min: 0,
                                max: 80
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Team1 Points'
                            }
                        }]
                    }
                },
                lineData: []
            }
        },
        methods: {
            getTeams() {
                return this.$axios.get('/teams');
            },
            getMatchup() {
                if (!this.team1 || !this.team2) {
                    return;
                }

                let params = {
                    team1: this.team1.school,
                    team2: this.team2.school
                };

                if (this.startYear) {
                    params.minYear = this.startYear;
                }

                if (this.endYear) {
                    params.maxYear = this.endYear;
                }

                this.$ga.event('visualization', 'generation', 'matchup');

                this.$axios.get('/teams/matchup', {
                    params
                }).then(result => {
                    result.data.games = result.data.games.sort((a, b) => new Date(a).valueOf() - new Date(b)
                        .valueOf() >
                        0 ? 1 : -1);

                    for (let game of result.data.games) {
                        if (game.winner == game.homeTeam) {
                            game._cellVariants = {
                                homeTeam: 'info',
                                homeScore: 'info'
                            };
                        } else if (game.winner == game.awayTeam) {
                            game._cellVariants = {
                                awayTeam: 'info',
                                awayScore: 'info'
                            };
                        }
                    }

                    this.results = result.data;

                    this.currentPage = 1;
                    this.totalRows = this.results.games.length;

                    let chartData = this.results.games.map(g => {
                        if (this.results.team1 === g.homeTeam) {
                            return {
                                x: g.homeScore,
                                y: g.awayScore
                            }
                        } else {
                            return {
                                x: g.awayScore,
                                y: g.homeScore
                            }
                        }
                    });

                    this.scatterData = {
                        datasets: [{
                            label: 'Scores',
                            pointBackgroundColor: chartData.map(cd => cd.x > cd.y ? this.team1
                                .alt_color :
                                cd.y > cd.x ? this.team2.alt_color : '#888888'),
                            pointBorderColor: chartData.map(cd => cd.x > cd.y ? this.team1.color :
                                cd.y > cd.x ? this.team2.color : '#888888'),
                            pointRadius: 4,
                            pointBorderWidth: 2,
                            data: chartData
                        }]
                    };

                    let self = this;
                    let years = Array.from(new Set(this.results.games.map(g => new Date(g.date).getFullYear())))
                        .sort();
                    let team1Wins = years.map(year => {
                        return self.results
                            .games
                            .filter(g => new Date(g.date).getFullYear() <= year && ((g.homeTeam ==
                                self.results.team1 && g.homeScore > g.awayScore) || (g
                                .awayTeam ==
                                self.results.team1 && g.awayScore > g.homeScore)))
                            .length;
                    });
                    let team2Wins = years.map(year => {
                        return self.results
                            .games
                            .filter(g => new Date(g.date).getFullYear() <= year && ((g.homeTeam ==
                                self.results.team2 && g.homeScore > g.awayScore) || (g
                                .awayTeam ==
                                self.results.team2 && g.awayScore > g.homeScore)))
                            .length;
                    });

                    this.lineData = {
                        labels: years,
                        datasets: [{
                            label: this.team1.school,
                            pointRadius: 0,
                            borderColor: this.team1.color,
                            // backgroundColor:  rgba(0,0,0,0),
                            data: team1Wins
                        }, {
                            label: this.team2.school,
                            pointRadius: 0,
                            borderColor: this.team2.color,
                            // backgroundColor: rgba(0,0,0,0),
                            data: team2Wins
                        }]
                    }
                });
            },
            updateTeam(index, team) {
                if (!team) {
                    return;
                }

                if (index == 1 && (!this.team1 || team.school !== this.team1.school)) {
                    this.team1 = team;
                    this.getMatchup();
                } else if (!this.team2 || team.school !== this.team2.school) {
                    this.team2 = team;
                    this.getMatchup();
                }
            },
            getColor(color) {
                return color ? color : '#000000';
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

<style lang='scss' scoped>
    .logo {
        width: 250px;
    }

    .record-container {
        margin-top: 50px;
    }

    .team-name {
        margin-top: 12px;
    }

    .record {
        display: flex;
        align-items: center;
    }

    .record-div {
        width: 100%;
    }

    .data-container {
        margin-top: 50px;
    }

    .team-label {
        height: 38px;
        line-height: 38px;
    }

</style>
