<template>
    <b-container class="page-container">
        <b-card>
            <b-row>
                <b-col>
                    <h1>Player PPA and Usage</h1>
                </b-col>
            </b-row>
        </b-card>
        <b-row>
            <b-col>
                <b-card>
                    <b-row>
                        <b-col />
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Year</label></b-row>
                            <b-form-select v-model="year" :options='years' @change="updateYear">
                                <option :value="null">Please select a year</option>
                            </b-form-select>
                        </b-col>
                        <b-col />
                    </b-row>
                    <b-row>
                        <b-col />
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Position</label></b-row>
                            <b-form-select v-model='position' :options='positions' @change='updatePosition'>
                            </b-form-select>
                        </b-col>
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Min. Play Threshold</label></b-row>
                            <b-form-input v-model='threshold' @change='updateThreshold' type='number'></b-form-input>
                        </b-col>
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Conference</label></b-row>
                            <b-form-select v-model='conference' :options='conferences' @change='updateConference'>
                            </b-form-select>
                        </b-col>
                        <b-col />
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card v-if='!loading'>
                    <matchup-scatter :height='300' :chart-data='scatterData' :options='scatterOptions'>
                    </matchup-scatter>
                </b-card>
                <b-card v-else>
                    <b-row>
                        <b-col />
                        <b-col lg='2'>
                            <pacman-loader class='loader' color='#17a2b8'></pacman-loader>
                        </b-col>
                        <b-col />
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import MatchupScatter from '@/components/MatchupScatter.vue';

    export default {
        components: {
            MatchupScatter
        },
        data() {
            return {
                loading: false,
                years: [],
                year: 2021,
                threshold: 100,
                position: 'QB',
                positions: [
                    'QB',
                    'RB',
                    'WR',
                    'TE',
                    'FB'
                ],
                conference: 'All',
                conferences: [
                    {
                        value: "All",
                        text: "All"
                    },
                    {
                        value: "ACC",
                        text: "ACC"
                    },
                    {
                        value: "AAC",
                        text: "American Athletic"
                    },
                    {
                        value: "B12",
                        text: "Big 12"
                    },
                    {
                        value: "B1G",
                        text: "Big Ten"
                    },
                    {
                        value: "CUSA",
                        text: "Conference USA"
                    },
                    {
                        value: "Ind",
                        text: "FBS Independents"
                    },
                    {
                        value: "MAC",
                        text: "Mid-American"
                    },
                    {
                        value: "Mountain West",
                        text: "MWC"
                    },
                    {
                        value: "PAC",
                        text: "Pac-12"
                    },
                    {
                        value: "SEC",
                        text: "SEC"
                    },
                    {
                        value: "SBC",
                        text: "Sun Belt"
                    }
                ],
                teams: [],
                tooltips: [],
                scatterData: [],
                scatterOptions: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Player Usage vs PPA'
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Usage'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'PPA/play'
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return data.datasets[0].labels[tooltipItem.index];
                            }
                        }
                    }
                }
            }
        },
        methods: {
            updateYear(year) {
                this.year = year;
                this.reloadData();
            },
            getTeams() {
                return this.$axios.get('/teams');
            },
            updateConference(conference) {
                this.conference = conference;
                this.reloadData();
            },
            updateThreshold(threshold) {
                this.threshold = threshold;
                this.reloadData();
            },
            updatePosition(position) {
                this.position = position;
                this.reloadData();
            },
            reloadData() {
                this.loading = true;
                this.$axios.get('/player/usage', {
                    params: {
                        year: this.year,
                        conference: this.conference == 'All' ? '' : this.conference,
                        position: this.position,
                        excludeGarbageTime: true
                    }
                }).then(usageResults => {
                    this.$axios.get('/ppa/players/season', {
                        params: {
                            year: this.year,
                            conference: this.conference == 'All' ? '' : this.conference,
                            position: this.position,
                            threshold: this.threshold,
                            excludeGarbageTime: true
                        }
                    }).then(ppaResults => {
                        const usageData = usageResults.data;
                        const ppaData = ppaResults.data;
                        const playerData = usageData.map(r => {
                            let playerPPA = ppaData.find(p => p.id == r.id);
                            let team = this.teams.find(t => t.school == r.team);

                            if (!playerPPA || !team) {
                                return null;
                            }

                            return {
                                id: r.id,
                                name: r.name,
                                team: team,
                                usage: r.usage.overall,
                                ppa: playerPPA.averagePPA.all
                            };
                        }).filter(p => p);

                        this.tooltips = playerData.map(p => `${p.name} (${p.team.school})`);

                        this.scatterData = {
                            datasets: [{
                                labels: this.tooltips,
                                pointRadius: 5,
                                pointBorderWidth: 3,
                                pointBorderColor: playerData.map(r => r
                                    .team.color),
                                pointBackgroundColor: playerData.map(r => r.team.alt_color),
                                data: playerData.map(r => ({
                                    x: r.ppa,
                                    y: r.usage,
                                    tooltips: this.tooltips
                                }))
                            }]
                        };

                        this.loading = false;
                    });
                });
            }
        },
        created() {
            this.years = [];
            for (let year = 2021; year > 2013; year--) {
                this.years.push(year);
            }
            
            this.getTeams().then(result => {
                this.teams = result.data;
                this.reloadData();
            });
        }
    }

</script>

<style>

</style>
