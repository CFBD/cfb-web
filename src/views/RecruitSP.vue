<template>
    <b-container class="page-container">
        <b-card>
            <b-row>
                <b-col>
                    <h1>SP+ and Recruiting</h1>
                    <p class='lead'>Select a year, an SP+ metric, and a recruiting position grouping to begin generating
                        visualizations.</p>
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
                            <b-form-select v-model="year" :options='years' @change="refreshData">
                                <option :value="null">Please select a year</option>
                            </b-form-select>
                        </b-col>
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>SP+ Metric</label></b-row>
                            <b-form-select v-model="spMetric" :options='dataPoints' @change="updateSPMetric">
                                <option :value="null">Please select a data point</option>
                            </b-form-select>
                        </b-col>
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Recruiting Rating Averages (4 yr)</label>
                            </b-row>
                            <b-form-select v-model="recruitingMetric" :options='positionGroups'
                                @change="updatePositionGroup">
                                <option :value="null">Please select a recruiting metric</option>
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
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card>
                    <matchup-scatter :height='300' :chart-data='scatterData' :options='scatterOptions'>
                    </matchup-scatter>
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
                teams: [],
                years: [
                    2008,
                    2009,
                    2010,
                    2011,
                    2012,
                    2013,
                    2014,
                    2015,
                    2016,
                    2017,
                    2018
                ],
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
                positionGroups: [
                    "All Positions",
                    "Defensive Backs",
                    "Defensive Line",
                    "Linebackers",
                    "Offensive Line",
                    "Quarterbacks",
                    "Receivers",
                    "Running Backs"
                ],
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
                spResults: null,
                recruitingResults: null,
                year: null,
                spMetric: null,
                recruitingMetric: null,
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
                                labelString: 'Recruiting Metric'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'SP+ Metric'
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
            refreshData(year) {
                if (year) {
                    this.year = year;
                    this.$axios.get('/ratings/sp', {
                        params: {
                            year: this.year
                        }
                    }).then(results => {
                        this.spResults = results.data.filter(r => r.team != 'nationalAverages');

                        this.$axios.get('/recruiting/groups', {
                            params: {
                                endYear: this.year,
                                startYear: (this.year - 3)
                            }
                        }).then(results => {
                            this.recruitingResults = results.data;
                            this.reloadData();
                        });
                    });
                }
            },
            updateSPMetric(key) {
                this.spMetric = key;
                this.reloadData();
            },
            updatePositionGroup(key) {
                this.recruitingMetric = key;
                this.reloadData();
            },
            updateConferenceFilter(key) {
                this.conference = key;
                this.reloadData();
            },
            reloadData() {
                if (this.spResults && this.spMetric && this.recruitingResults && this.recruitingMetric) {
                    this.$ga.event('visualization', 'generation', 'recruiting-sp');
                    this.scatterOptions.title.text = `SP+ and Recruiting`;

                    let points = this.spResults.filter(s => this.conference == 'All' || s.conference == this.conference)
                        .map(r => {
                            let img = new Image();
                            img.src = `/logos/${this.teams.find(t => t.school == r.team).id}.png`
                            return img;
                        });

                    this.scatterData = {
                        datasets: [{
                            pointStyle: points,
                            data: this.spResults.filter(s => this.conference == 'All' || s.conference ==
                                this.conference).map(r => ({
                                x: this.getValueByKey(r, this.spMetric.split('.')),
                                y: this.recruitingResults.find(rr => rr.team == r.team && rr
                                    .positionGroup == this.recruitingMetric).averageRating
                            }))
                        }]
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
        }
    }

</script>

<style lang='scss'>

</style>
