<template>
    <b-container class='page-container'>
        <b-card>
            <b-row>
                <b-col>
                    <h1>Cumulative Average PPA per Dropback</h1>
                    <p>Select a QB to start generating charts</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col />
                <b-col lg='4'>
                    <b-row v-for='player in players' :key='player.id'>
                        <b-col lg='2'>
                            <b-button variant='danger' size='sm' @click='removePlayer(player)'>X</b-button>
                        </b-col>
                        <b-col lg='10' class='text-left pt-1'>
                            {{ player.name }}
                        </b-col>
                    </b-row>
                    <b-row class='mt-4'>
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
                players: [],
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
                    this.players.push(player)

                    this.$axios.get('/player/ppa/passing', {
                        params: {
                            id: player.id
                        }
                    }).then(results => {
                        this.$ga.event('visualization', 'generation', 'mean-pass-ppa-chart');

                        let data = Object.assign({}, this.chartData);
                        data.datasets.push({
                            pointRadius: 0,
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
                }
            },
            removePlayer(player) {
                let index = this.players.indexOf(player);
                let data = Object.assign({}, this.chartData);
                data.datasets.splice(index, 1);
                this.players.splice(index, 1);
                this.chartData = data;
            }
        }
    }

</script>

<style lang='scss'>

</style>
