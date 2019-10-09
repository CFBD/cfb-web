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
                    <b-row>
                        <player-search position='QB' @selection='setPlayer' />
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
                player: null,
                title: 'Cumulative Average PPA per Dropback',
                chartData: [],
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
            setPlayer(player) {
                if (player) {
                    this.player = player;

                    this.$axios.get('/player/ppa/passing', {
                        params: {
                            id: this.player.id
                        }
                    }).then(results => {
                        this.$ga.event('visualization', 'generation', 'mean-pass-ppa-chart');

                        this.chartData = {
                            datasets: [{
                                pointRadius: 0,
                                borderColor: this.player.teamColor,
                                fill: false,
                                label: this.player.name,
                                data: results.data.map(r => ({
                                    x: r.playNumber,
                                    y: r.avgPPA
                                }))
                            }]
                        };
                    });
                }
            }
        }
    }

</script>

<style lang='scss'>

</style>
