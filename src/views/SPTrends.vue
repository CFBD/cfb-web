<template>
    <b-container class="page-container">
        <b-card>
            <b-row>
                <b-col>
                    <h1>S&amp;P+ Team Trends</h1>
                    <p class='lead'>Select a team and a data points to begin generating trend visualizations.</p>
                </b-col>
            </b-row>
        </b-card>
        <b-row>
            <b-col>
                <b-card>
                    <b-row>
                        <b-col />
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Team</label></b-row>
                            <autocomplete display-prop='school' placeholder='Select a team...' :items='teams'
                                @selection='refreshData($event)'></autocomplete>
                        </b-col>
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Data Point</label></b-row>
                            <b-form-select v-model="dataPoint" :options='dataPoints' @change="updateDataPoint">
                                <option :value="null">Please select a data point</option>
                            </b-form-select>
                        </b-col>
                        <b-col />
                    </b-row>
                    <b-row>
                        <b-col />
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Comparison team (optional)</label></b-row>
                            <autocomplete display-prop='school' placeholder='Select a team...' :items='teams'
                                @selection='updateTeam2($event)'></autocomplete>
                        </b-col>
                        <b-col lg='3' />
                        <b-col />
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card>
                    <win-history :height='300' :chart-data='scatterData' :options='scatterOptions'>
                    </win-history>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Autocomplete from '@/components/Autocomplete.vue';
    import WinHistory from '@/components/WinHistory.vue';

    export default {
        components: {
            Autocomplete,
            WinHistory
        },
        data() {
            return {
                teams: [],
                conferences: [],
                dataPoints: [{
                    value: 'rating',
                    text: 'Overall Rating'
                }, {
                    value: 'offense.rating',
                    text: 'Offensive Rating'
                }, {
                    value: 'defense.rating',
                    text: 'Defensive Rating'
                }, {
                    value: 'specialTeams.rating',
                    text: 'Special Teams Rating'
                }, {
                    value: 'sos',
                    text: 'Strength of Schedule'
                }, {
                    value: 'secondOrderWins',
                    text: 'Second Order Wins'
                }, {
                    value: 'offense.success',
                    text: 'Offensive Success'
                }, {
                    value: 'offense.explosiveness',
                    text: 'Offensive Explosiveness'
                }, {
                    value: 'offense.rushing',
                    text: 'Rushing Offense'
                }, {
                    value: 'offense.passing',
                    text: 'Passing Offense'
                }, {
                    value: 'offense.standardDowns',
                    text: 'Standard Down Offense'
                }, {
                    value: 'offense.passingDowns',
                    text: 'Passing Down Offense'
                }, {
                    value: 'offense.runRate',
                    text: 'Run Rate'
                }, {
                    value: 'offense.pace',
                    text: 'Pace'
                }, {
                    value: 'defense.success',
                    text: 'Defensive Success'
                }, {
                    value: 'defense.explosiveness',
                    text: 'Defensive Exposiveness'
                }, {
                    value: 'defense.rushing',
                    text: 'Rushing Defense'
                }, {
                    value: 'defense.passing',
                    text: 'Passing Defense'
                }, {
                    value: 'defense.standardDowns',
                    text: 'Standard Down Defense'
                }, {
                    value: 'defense.passingDowns',
                    text: 'Passing Down Defense'
                }, {
                    value: 'defense.havoc.total',
                    text: 'Total Havoc'
                }, {
                    value: 'defense.havoc.frontSeven',
                    text: 'Front 7 Havoc'
                }, {
                    value: 'defense.havoc.db',
                    text: 'DB Havoc'
                }],
                results: null,
                results2: null,
                year: null,
                team: null,
                team2: null,
                dataPoint: null,
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
                            scaleLabel: {
                                display: true,
                                labelString: 'Rating'
                            }
                        }],
                        xAxes: [{
                            type: 'linear',
                            ticks: {
                                stepSize: 10
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Year'
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
            refreshData(team) {
                if (team) {
                    this.team = team;
                    this.$axios.get('/ratings/sp', {
                        params: {
                            team: this.team.school
                        }
                    }).then(results => {
                        this.results = results.data;

                        this.$axios.get('/ratings/sp/conferences', {
                            params: {
                                conference: this.conferences.find(c => c.name == this.team.conference).abbreviation
                            }
                        }).then(result => {
                            this.conferenceData = result.data;
                            this.reloadData();
                        });
                    });
                }
            },
            updateTeam2(team) {
                if (team) {
                    this.team2 = team;
                    this.$axios.get('/ratings/sp', {
                        params: {
                            team: this.team2.school
                        }
                    }).then(results => {
                        this.results2 = results.data;
                        this.reloadData();
                    });
                } else {
                    this.team2 = null;
                    this.results2 = null;
                    this.reloadData();
                }
            },
            updateDataPoint(key) {
                this.dataPoint = key;
                this.reloadData();
            },
            reloadData() {
                if (this.results && this.dataPoint && this.team) {
                    this.$ga.event('visualization', 'generation', 'sp-trends');
                    this.scatterOptions.title.text = `Team S&P+ Trends`;
                    let data = this.results.filter(r => r.team == this.team.school).map(r => ({ x: r.year, y: this.getValueByKey(r, this.dataPoint.split('.'))})).filter(r => r.y);
                    let averages = this.results.filter(r => r.team == 'nationalAverages').map(r => ({ x: r.year, y: this.getValueByKey(r, this.dataPoint.split('.'))})).filter(r => r.y);
                    let conferenceAverages = data.map(l => {
                        let item = this.conferenceData.find(d => d.year == l.x);
                        return item ? { x: l.x, y: this.getValueByKey(item, this.dataPoint.split('.')) } : null;
                    }).filter(l => l && l.y);

                    let datasets = [{
                            pointRadius: 5,
                            borderColor: this.team.color,
                            fill: false,
                            label: this.team.school,
                            data: data
                        },{
                            borderDash: [5, 10],
                            pointRadius: 0,
                            borderColor: '#cccccc',
                            fill: false,
                            label: 'National Average',
                            data: averages
                        }];

                    if (this.team2 && this.results2) {
                        datasets.push({
                            pointRadius: 5,
                            borderColor: this.team2.color,
                            fill: false,
                            label: this.team2.school,
                            data: this.results2.filter(r => r.team == this.team2.school).map(r => ({ x: r.year, y: this.getValueByKey(r, this.dataPoint.split('.'))})).filter(r => r.y)
                        })
                    }

                    if (!(this.team2 && this.results2) || (this.team2 && this.team.conference == this.team2.conference)) {
                        datasets.push({
                            borderDash: [10, 5],
                            pointRadius: 0,
                            borderColor: '#a9e7e8',
                            fill: false,
                            label: `${this.team.conference} Average`,
                            data: conferenceAverages
                        });
                    }

                    this.scatterData = {
                        datasets
                    };
                }
            },
            getValueByKey(obj, keys) {
                let first = keys.shift();
                let newObj = obj[first];

                return keys.length ? this.getValueByKey(newObj, keys) : newObj;
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

            this.getConferences().then(result => {
                this.conferences = result.data;
            });
        }
    }

</script>

<style lang='scss'>
    .grid-container {
        height: 800px;
    }

</style>
