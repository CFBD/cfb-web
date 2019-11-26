<template>
    <b-container class="page-container">
        <b-card>
            <b-row>
                <b-col>
                    <h1>Predicted Winning Probability</h1>
                    <p class='lead'>Select a game to generate predicted win probabilities.</p>
                </b-col>
            </b-row>
        </b-card>
        <b-row>
            <b-col>
                <b-card>
                    <game-search :clear-on-selection='true' @selection='refreshData' />
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card :title='title'>
                    <b-link v-if='gameId' :to='`/boxscore/${gameId}`'>View advanced box score</b-link>
                    <win-history :height='300' :chart-data='scatterData' :options='scatterOptions'>
                    </win-history>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import WinHistory from '@/components/WinHistory.vue';
    import GameSearch from '@/components/GameSearch.vue';

    export default {
        components: {
            WinHistory,
            GameSearch
        },
        data() {
            return {
                teams: [],
                title: '',
                gameId: null,
                results: null,
                scatterData: [],
                conferenceData: [],
                scatterOptions: {
                    legend: {
                        display: true
                    },
                    title: {
                        display: true,
                        text: ''
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: 0,
                                max: 100
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Win Percentage'
                            }
                        }],
                        xAxes: [{
                            type: 'linear',
                            ticks: {
                                min: 0,
                                stepSize: 1
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Play Number'
                            }
                        }]
                    }
                }
            }
        },
        methods: {
            getTeams() {
                return this.$axios.get('/teams');
            },
            getConferences() {
                return this.$axios.get('/conferences');
            },
            refreshData(game) {
                this.gameId = game.id;
                if (this.$route.params.id != this.gameId) {
                    this.$router.push({
                        path: `/wp/${this.gameId}`
                    });
                    return;
                }

                this.$axios.get('/metrics/wp', {
                    params: {
                        gameId: this.gameId
                    }
                }).then(results => {
                    this.results = results.data;

                    this.reloadData();
                });
            },
            reloadData() {
                if (this.results && this.results.length) {
                    const home = this.results[0].home;
                    const away = this.results[0].away;

                    const homeTeam = this.teams.find(t => t.id == this.results[0].homeId);
                    const awayTeam = this.teams.find(t => t.id == this.results[0].awayId);

                    let last = this.results[this.results.length - 1];

                    this.title = `${away} ${last.awayScore}, ${home} ${last.homeScore}`;
                    this.$ga.event('visualization', 'generation', 'wp-chart');
                    this.scatterOptions.title.text = `Predicted Win Probability`;

                    let ctx = document.getElementById('line-chart').getContext('2d');

                    let gradient = ctx.createLinearGradient(0, (ctx.canvas.clientHeight * .0), 0, (ctx.canvas
                        .clientHeight));
                    gradient.addColorStop(.4, homeTeam.color);
                    gradient.addColorStop(.59, awayTeam.color);

                    this.scatterData = {
                        datasets: [{
                            pointRadius: 0,
                            borderColor: gradient,
                            fill: false,
                            label: `${homeTeam.school} %`,
                            data: this.results.map(r => ({
                                x: r.playNumber,
                                y: r.homeWinProb * 100
                            }))
                        }]
                    };

                    this.scatterOptions = {
                        legend: {
                            display: true
                        },
                        title: {
                            display: true,
                            text: ''
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    max: 100
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Win Percentage'
                                }
                            }],
                            xAxes: [{
                                type: 'linear',
                                ticks: {
                                    min: 0,
                                    max: (this.results.length + 1),
                                    stepSize: 1
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Play Number'
                                }
                            }]
                        }
                    };
                }
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

                if (this.$route.params.id) {
                    this.refreshData({
                        id: this.$route.params.id
                    });
                }
            });
        },
        watch: {
            '$route': function(to, from) {
                if (to.params.id && to.params.id !== from.params.id) {
                    this.refreshData({
                        id: to.params.id
                    });
                }
            }
        }
    }

</script>

<style lang='scss'>
    .grid-container {
        height: 800px;
    }

</style>
