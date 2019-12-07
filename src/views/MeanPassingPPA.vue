<template>
    <b-container class='page-container'>
        <b-card>
            <b-row>
                <b-col>
                    <h1>QB Passing Trends</h1>
                    <p>Select a QB to start generating passing efficiency charts</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col />
                <b-col lg='4'>
                    <b-row>
                        <b-col lg='6'>
                            <label>Rolling plays?</label>
                        </b-col>
                        <b-col lg='6'>
                            <b-form-input type='number' min='0' v-model="rollingPlays" @change="updateRollingPlays"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row v-for='player in players' :key='player.id'>
                        <b-col lg='2'>
                            <b-button variant='danger' size='sm' @click='removePlayer(player)'>X</b-button>
                        </b-col>
                        <b-col lg='10' class='text-left pt-1'>
                            {{ player.name }}
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg='4'>
                            Add player:
                        </b-col>
                        <b-col lg='8'>
                            <player-search :clear-on-selection='true' position='QB' @selection='addPlayer' />
                        </b-col>
                    </b-row>
                </b-col>
                <b-col />
            </b-row>
        </b-card>
        <b-row>
            <b-col>
                <b-card :title='title'>
                    <win-history :height='300' :chart-data='chartData' :options='chartOptions'>
                    </win-history>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import PlayerSearch from '@/components/PlayerSearch.vue';
    import WinHistory from '@/components/WinHistory.vue';

    export default {
        components: {
            PlayerSearch,
            WinHistory
        },
        data() {
            return {
                title: 'Cumulative Average PPA per Dropback',
                rollingPlays: null,
                players: [],
                lineStyles: [
                    [],
                    [5],
                    [5, 3],
                    [5, 5, 10],
                    [5, 10],
                    [10, 5],
                    [5, 1, 5],
                    [10, 5, 10],
                    [10, 1, 10],
                    [5, 10, 5],
                    [5, 10, 10],
                    [5, 10, 15]
                ],
                chartData: {
                    datasets: []
                },
                chartOptions: {
                    legend: {
                        display: true
                    },
                    title: {
                        display: true,
                        text: ''
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Cumulative Average PPA'
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
                                labelString: 'Dropback Number'
                            }
                        }]
                    }
                }
            };
        },
        methods: {
            addPlayer(player) {
                if (player) {
                    this.players.push(player);
                    this.$ga.event('visualization', 'generation', 'mean-pass-ppa-chart');
                    this.loadPlayer(player);
                }
            },
            loadPlayer(player) {
                return this.$axios.get('/player/ppa/passing', {
                        params: {
                            id: player.id,
                            rollingPlays: this.rollingPlays
                        }
                    }).then(results => {
                        let data = Object.assign({}, this.chartData);
                        data.datasets.push({
                            pointRadius: 0,
                            borderDash: this.lineStyles[this.players.indexOf(player) % 12],
                            borderColor: player.teamColor,
                            fill: false,
                            label: player.name,
                            data: results.data.map(r => ({
                                x: r.playNumber,
                                y: r.avgPPA
                            }))
                        });

                        this.chartData = data;
                    });
            },
            removePlayer(player) {
                let data = Object.assign({}, this.chartData);
                data.datasets = data.datasets.filter(d => d.label != player.name);
                this.players = this.players.filter(p => p.id != player.id);

                for (let i = 0; i < this.players.length; i++) {
                    data.datasets[i].borderDash = this.lineStyles[i];
                }
                this.chartData = data;
            },
            updateRollingPlays(plays) {
                this.rollingPlays = plays;
                this.chartData.datasets = [];

                for (let player of this.players) {
                    this.loadPlayer(player);
                }
            }
        }
    }

</script>

<style lang='scss'>

</style>
