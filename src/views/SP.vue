<template>
    <b-container class="page-container">
        <b-card>
            <b-row>
                <b-col>
                    <h1>S&amp;P+ Visualizations</h1>
                    <p class='muted'>SP+ is a rating system created by Bill Connelly (<a href='https://twitter.com/ESPN_BillC'>@ESPN_BillC</a>) that are meant to be a predictive comparison of teams. For a more detailed explanation, <a href='https://www.sbnation.com/college-football/2017/10/13/16457830/college-football-advanced-stats-analytics-rankings'>see this article</a>.</p>
                    <p class='lead'>Select a year and two data points to begin generating visualizations.</p>
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
                            <b-row class='justify-content-center'><label>Data Point 1</label></b-row>
                                <b-form-select v-model="dataPoint1" :options='dataPoints' @change="updateDataPoint1">
                                    <option :value="null">Please select a data point</option>
                                </b-form-select>
                        </b-col>
                        <b-col lg='3'>
                            <b-row class='justify-content-center'><label>Data Point 2</label></b-row>
                                <b-form-select v-model="dataPoint2" :options='dataPoints' @change="updateDataPoint2">
                                    <option :value="null">Please select a data point</option>
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
                teams: [],
                years: [],
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
                    text: 'Special Teams Rating',
                    disabled: false
                }, {
                    value: 'sos',
                    text: 'Strength of Schedule',
                    disabled: true
                }, {
                    value: 'secondOrderWins',
                    text: 'Second Order Wins',
                    disabled: true
                }, {
                    value: 'offense.success',
                    text: 'Offensive Success',
                    disabled: true
                }, {
                    value: 'offense.explosiveness',
                    text: 'Offensive Explosiveness',
                    disabled: true
                }, {
                    value: 'offense.rushing',
                    text: 'Rushing Offense',
                    disabled: true
                }, {
                    value: 'offense.passing',
                    text: 'Passing Offense',
                    disabled: true
                }, {
                    value: 'offense.standardDowns',
                    text: 'Standard Down Offense',
                    disabled: true
                }, {
                    value: 'offense.passingDowns',
                    text: 'Passing Down Offense',
                    disabled: true
                }, {
                    value: 'offense.runRate',
                    text: 'Run Rate',
                    disabled: true
                }, {
                    value: 'offense.pace',
                    text: 'Pace',
                    disabled: true
                }, {
                    value: 'defense.success',
                    text: 'Defensive Success',
                    disabled: true
                }, {
                    value: 'defense.explosiveness',
                    text: 'Defensive Exposiveness',
                    disabled: true
                }, {
                    value: 'defense.rushing',
                    text: 'Rushing Defense',
                    disabled: true
                }, {
                    value: 'defense.passing',
                    text: 'Passing Defense',
                    disabled: true
                }, {
                    value: 'defense.standardDowns',
                    text: 'Standard Down Defense',
                    disabled: true
                }, {
                    value: 'defense.passingDowns',
                    text: 'Passing Down Defense',
                    disabled: true
                }, {
                    value: 'defense.havoc.total',
                    text: 'Total Havoc',
                    disabled: true
                }, {
                    value: 'defense.havoc.frontSeven',
                    text: 'Front 7 Havoc',
                    disabled: true
                }, {
                    value: 'defense.havoc.db',
                    text: 'DB Havoc',
                    disabled: true
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
                results: null,
                year: 2019,
                dataPoint1: null,
                dataPoint2: null,
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
                return this.$axios.get('/teams');
            },
            refreshData(year) {
                if (year) {
                    this.year = year;
                    for (let dataPoint of this.dataPoints.filter(dp => dp.disabled !== undefined)) {
                        dataPoint.disabled = (year === 2019 && dataPoint.value != 'specialTeams.rating') || year < 2005;
                    }

                    this.$axios.get('/ratings/sp', {
                        params: {
                            year: this.year
                        }
                    }).then(results => {
                        this.results = results.data.filter(r => r.team != 'nationalAverages');
                        this.reloadData();
                    });
                }
            },
            updateDataPoint1(key) {
                this.dataPoint1 = key;
                this.reloadData();
            },
            updateDataPoint2(key) {
                this.dataPoint2 = key;
                this.reloadData();
            },
            updateConferenceFilter(key) {
                this.conference = key;
                this.reloadData();
            },
            reloadData() {
                if (this.results && this.dataPoint1 && this.dataPoint2) {
                    this.$ga.event('visualization', 'generation', 'sp');

                    let options = Object.assign({}, this.scatterOptions);
                    options.title.text = `${this.year} SP+${this.conference == 'All' ? '' : ` (${this.conference})`}`;
                    options.scales.yAxes[0].scaleLabel.labelString = this.dataPoints.find(d => d.value == this.dataPoint2).text;
                    options.scales.xAxes[0].scaleLabel.labelString = this.dataPoints.find(d => d.value == this.dataPoint1).text;
                    this.scatterOptions = options;

                    let points = this.results.filter(r => this.conference == 'All' || r.conference == this.conference).map(r => {
                        let img = new Image();
                        img.src = `/logos/${this.teams.find(t => t.school == r.team).id}.png`
                        return img;
                    });

                    this.scatterData = {
                        datasets: [{
                            pointStyle: points,
                            data: this.results.filter(r => this.conference == 'All' || r.conference == this.conference).map(r => ({
                                x: this.getValueByKey(r, this.dataPoint1.split('.')),
                                y: this.getValueByKey(r, this.dataPoint2.split('.'))
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
            this.years = [];
            for (let year = 2019; year > 1971; year--) {
                this.years.push(year);
            }

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

                this.$axios.get('/ratings/sp', {
                        params: {
                            year: this.year
                        }
                    }).then(results => {
                        this.results = results.data.filter(r => r.team != 'nationalAverages');
                        this.reloadData();
                    });
            });
        }
    }

</script>

<style lang='scss'>

</style>
