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
                year: null,
                team: null,
                dataPoint: null,
                scatterData: [],
                scatterOptions: {
                    legend: {
                        display: true
                    },
                    title: {
                        display: true,
                        text: ''
                    }
                }
            }
        },
        methods: {
            getTeams() {
                return this.$axios.get('/teams');
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
                        this.reloadData();
                    });
                }
            },
            updateDataPoint(key) {
                this.dataPoint = key;
                this.reloadData();
            },
            reloadData() {
                if (this.results && this.dataPoint && this.team) {
                    this.scatterOptions.title.text = `Team S&P+ Trends`;
                    let labels = this.results.filter(r => r.team == this.team.school).map(r => r.year);
                    let data = this.results.filter(r => r.team == this.team.school).map(r => this.getValueByKey(r, this.dataPoint.split('.')));
                    let averages = this.results.filter(r => r.team == 'nationalAverages').map(r => this.getValueByKey(r, this.dataPoint.split('.')));

                    this.scatterData = {
                        labels: labels,
                        datasets: [{
                            pointRadius: 10,
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
    .grid-container {
        height: 800px;
    }

</style>
