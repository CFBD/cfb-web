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
                    <b-row>
                        <b-col />
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Game Id</label></b-row>
                            <b-form-input type='text' @change='refreshData($event)'></b-form-input>
                        </b-col>
                        <b-col />
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card :title='title'>
                    <win-history :height='300' :chart-data='scatterData' :options='scatterOptions'>
                    </win-history>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import WinHistory from '@/components/WinHistory.vue';

    export default {
        components: {
            WinHistory
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
                            ticks: {
                                min: 0,
                                max: 3600
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Time'
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
            refreshData(gameId) {
                if (gameId) {
                    this.gameId = gameId;
                    this.$axios.get('/metrics/wp', {
                        params: {
                            gameId: this.gameId
                        }
                    }).then(results => {
                        this.results = results.data;

                        this.reloadData();
                    });
                }
            },
            reloadData() {
                if (this.results && this.results.length) {
                    const home = this.results[0].home;
                    const away = this.results[0].away;

                    const homeTeam = this.teams.find(t => t.id == this.results[0].home_id);
                    const awayTeam = this.teams.find(t => t.id == this.results[0].away_id);

                    this.title = `${away} vs ${home}`;
                    this.$ga.event('visualization', 'generation', 'wp-chart');
                    this.scatterOptions.title.text = `Predicted Win Probability`;
                    let labels = this.results.map(r => (3600 - r.time_remaining));

                    this.scatterData = {
                        labels: labels,
                        datasets: [{
                            pointRadius: 0,
                            borderColor: homeTeam.color,
                            fill: false,
                            label: homeTeam.school,
                            data: this.results.map(r => r.output)
                        },{
                            pointRadius: 0,
                            borderColor: awayTeam.color,
                            fill: false,
                            label: awayTeam.school,
                            data: this.results.map(r => (100 - r.output))
                        }]
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
            });
        }
    }

</script>

<style lang='scss'>
    .grid-container {
        height: 800px;
    }

</style>
