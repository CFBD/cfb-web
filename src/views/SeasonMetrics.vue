<template>
    <b-container class="page-container">
        <b-card>
            <b-row>
                <b-col>
                    <h1>Team Metrics</h1>
                    <p class='lead'>Select metric criteria to compare</p>
                </b-col>
            </b-row>
        </b-card>
        <b-row>
            <b-col>
                <b-card>
                    <b-row>
                        <b-col />
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Data Point 1</label></b-row>
                            <b-form-select v-model="dataPoint1.statType" :options='statTypes' @change="updateStatType1">
                                <option :value="null">Please select a type</option>
                            </b-form-select>
                            <b-form-select v-model="dataPoint1.playFilter" :options='playFilters' @change="updatePlayFilter1">
                            </b-form-select>
                            <b-form-select v-model="dataPoint1.metricType" :options='metricTypes1' @change="updateMetricType1">
                                <option :value="null">Please select a metric</option>
                            </b-form-select>
                        </b-col>
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Data Point 2</label></b-row>
                            <b-form-select v-model="dataPoint2.statType" :options='statTypes' @change="updateStatType2">
                                <option :value="null">Please select a type</option>
                            </b-form-select>
                            <b-form-select v-model="dataPoint2.playFilter" :options='playFilters' @change="updatePlayFilter2">
                            </b-form-select>
                            <b-form-select v-model="dataPoint2.metricType" :options='metricTypes2' @change="updateMetricType2">
                                <option :value="null">Please select a metric</option>
                            </b-form-select>
                        </b-col>
                        <b-col />
                    </b-row>
                    <b-row>
                        <b-col />
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Conference filter</label></b-row>
                            <b-form-select v-model='conference' :options='conferences' @change='updateConferenceFilter'>
                            </b-form-select>
                        </b-col>
                        <b-col />
                    </b-row>
                    <b-row>
                        <b-col />
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Start Week</label></b-row>
                            <b-form-input type='number' v-model='startWeek' @change='updateStartWeek'></b-form-input>
                        </b-col>
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>End Week</label></b-row>
                            <b-form-input type='number' v-model='endWeek' @change='updateEndWeek'></b-form-input>
                        </b-col>
                        <b-col />
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card>
                    <matchup-scatter :height='300' :chart-data='scatterData' :options='scatterOptions'></matchup-scatter>
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
                startWeek: null,
                endWeek: null,
                teams: [],
                years: [],
                statTypes: [{
                    value: 'offense',
                    text: 'Offense'
                }, {
                    value: 'defense',
                    text: 'Defense'
                }],
                playFilters: [{
                    value: '',
                    text: 'All'
                }, {
                    value: 'standardDowns',
                    text: 'Standard Downs'
                }, {
                    value: 'passingDowns',
                    text: 'Passing Downs'
                }, {
                    value: 'rushingPlays',
                    text: 'Rushing Plays'
                }, {
                    value: 'passingPlays',
                    text: 'Passing Plays'
                }],
                metricTypes1: [{
                    value: 'rate',
                    text: 'Rate',
                    disabled: true
                }, {
                    value: 'ppa',
                    text: 'PPA'
                }, {
                    value: 'successRate',
                    text: 'Success Rate'
                }, {
                    value: 'explosiveness',
                    text: 'Explosiveness'
                }, {
                    value: 'powerSuccess',
                    text: 'Power Success',
                    disabled: false
                }, {
                    value: 'stuffRate',
                    text: 'Stuff Rate',
                    disabled: false
                }, {
                    value: 'lineYards',
                    text: 'Line Yards',
                    disabled: false
                }, {
                    value: 'secondLevelYards',
                    text: 'Second Level Yards',
                    disabled: false
                }, {
                    value: 'openFieldYards',
                    text: 'Open Field Yards',
                    disabled: false
                }, {
                    value: 'pointsPerOpportunity',
                    text: 'Pts/Scoring Opportunity',
                    disabled: false
                }],
                metricTypes2: [{
                    value: 'rate',
                    text: 'Rate',
                    disabled: true
                }, {
                    value: 'ppa',
                    text: 'PPA'
                }, {
                    value: 'successRate',
                    text: 'Success Rate'
                }, {
                    value: 'explosiveness',
                    text: 'Explosiveness'
                }, {
                    value: 'powerSuccess',
                    text: 'Power Success',
                    disabled: false
                }, {
                    value: 'stuffRate',
                    text: 'Stuff Rate',
                    disabled: false
                }, {
                    value: 'lineYards',
                    text: 'Line Yards',
                    disabled: false
                }, {
                    value: 'secondLevelYards',
                    text: 'Second Level Yards',
                    disabled: false
                }, {
                    value: 'openFieldYards',
                    text: 'Open Field Yards',
                    disabled: false
                }, {
                    value: 'pointsPerOpportunity',
                    text: 'Pts/Scoring Opportunity',
                    disabled: false
                }],
                conferences: [
                    "All",
                    "ACC",
                    "American Athletic",
                    "Big 12",
                    "Big Ten",
                    "Conference USA",
                    "FBS Independents",
                    "Mid-American",
                    "Mountain West",
                    "Pac-12",
                    "SEC",
                    "Sun Belt"
                ],
                conference: 'All',
                dataPoint1: {
                    statType: null,
                    playFilter: '',
                    metricType: null
                },
                dataPoint2: {
                    statType: null,
                    playFilter: '',
                    metricType: null
                },
                results: null,
                scatterData: [],
                scatterOptions: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: ''
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Data Point 2'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Data Point 1'
                            }
                        }]
                    }
                }
            }
        },
        methods: {
            getTeams() {
                return this.$axios.get('/teams/fbs');
            },
            updateStatType1(key) {
                this.dataPoint1.statType = key;
                this.reloadData();
            },
            updatePlayFilter1(key) {
                this.dataPoint1.playFilter = key;
                this.metricTypes1[0].disabled = key == '' ? true : false;
                this.metricTypes1[4].disabled = key == '' ? false : true;
                this.metricTypes1[5].disabled = key == '' ? false : true;
                this.metricTypes1[6].disabled = key == '' ? false : true;
                this.metricTypes1[7].disabled = key == '' ? false : true;
                this.metricTypes1[8].disabled = key == '' ? false : true;
                this.reloadData();
            },
            updateMetricType1(key) {
                this.dataPoint1.metricType = key;
                this.reloadData();
            },
            updateStatType2(key) {
                this.dataPoint2.statType = key;
                this.reloadData();
            },
            updatePlayFilter2(key) {
                this.dataPoint2.playFilter = key;
                this.metricTypes2[0].disabled = key == '' ? true : false;
                this.metricTypes2[4].disabled = key == '' ? false : true;
                this.metricTypes2[5].disabled = key == '' ? false : true;
                this.metricTypes2[6].disabled = key == '' ? false : true;
                this.metricTypes2[7].disabled = key == '' ? false : true;
                this.metricTypes2[8].disabled = key == '' ? false : true;
                this.reloadData();
            },
            updateMetricType2(key) {
                this.dataPoint2.metricType = key;
                this.reloadData();
            },
            updateConferenceFilter(key) {
                this.conference = key;
                this.reloadData();
            },
            updateStartWeek(week) {
                this.startWeek = week;
                this.refreshData();
            },
            updateEndWeek(week) {
                this.endWeek = week;
                this.refreshData();
            },
            reloadData() {
                if (this.results && this.dataPoint1.statType && this.dataPoint1.metricType && this.dataPoint2.statType && this.dataPoint2.metricType) {
                    this.$ga.event('visualization', 'generation', 'season-metrics');

                    let points = this.results.filter(r => this.conference == 'All' || r.conference == this.conference).map(r => {
                        let img = new Image();
                        img.src = `/logos/${this.teams.find(t => t.school == r.team).id}.png`
                        return img;
                    });

                    let data1Label = this.getDataPointLabel(this.dataPoint1);
                    let data2Label = this.getDataPointLabel(this.dataPoint2);

                    this.scatterData = {
                        datasets: [{
                            pointStyle: points,
                            data: this.results.filter(r => this.conference == 'All' || r.conference == this.conference).map(r => ({
                                x: this.getValueByKey(r, data1Label.split('.')),
                                y: this.getValueByKey(r, data2Label.split('.'))
                            }))
                        }]
                    };
                }
            },
            getDataPointLabel(dataPoint) {
                return `${dataPoint.statType}.${dataPoint.playFilter == '' ? '' : `${dataPoint.playFilter}.`}${dataPoint.metricType}`
            },
            getValueByKey(obj, keys) {
                let first = keys.shift();
                let newObj = obj[first];

                return keys.length ? this.getValueByKey(newObj, keys) : newObj;
            },
            refreshData() {
                this.$axios.get('/stats/season/advanced', {
                    params: {
                        year: 2019,
                        excludeGarbageTime: true,
                        startWeek: this.startWeek,
                        endWeek: this.endWeek
                    }
                }).then(results => {
                    this.results = results.data.filter(d => this.teams.find(t => t.school === d.team));
                    this.reloadData();
                });
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

                this.refreshData();
            });
        }
    }

</script>

<style lang='scss'>
</style>
