<template>
    <b-container>
        <h1>Matchup Tool</h1>
        <p class='lead'>Select two teams to get matchup results and history.</p>
        <b-row>
            <b-col>
                <b-row>
                    <b-col sm='4'>
                        <label class='team-label'>Team 1:</label>
                    </b-col>
                    <b-col sm='8'>
                        <autocomplete display-prop='school' placeholder='Select a team...' :items='teams'
                            v-on:selection='updateTeam(1, $event)'></autocomplete>
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-row>
                    <b-col sm='4'>
                        <label class='team-label'>Team 2:</label>
                    </b-col>
                    <b-col sm='8'>
                        <autocomplete display-prop='school' placeholder='Select a team...' :items='teams'
                            v-on:selection='updateTeam(2, $event)'></autocomplete>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <div v-if='results'>
            <b-row v-if='results' class='record-container'>
                <b-col auto></b-col>
                <b-col>
                    <b-img :src='team1.logos[0]' class='logo' />
                    <h2 class='team-name' :style='{ color: getColor(team1.color) }'>{{ team1.school }}</h2>
                </b-col>
                <b-col class='record'>
                    <div class='record-div'>
                        <h1 class='text-center'>
                            <strong>
                                <span :style='{ color: getColor(team1.color) }'>{{results.team1Wins}}</span>-<span
                                    class='text-muted'>{{results.ties}}</span>-<span :style='{ color: getColor(team2.color) }'>{{results.team2Wins}}</span>
                            </strong>
                        </h1>
                    </div>
                </b-col>
                <b-col>
                    <b-img :src='team2.logos[0]' class='logo' />
                    <h2 class='team-name' :style='{ color: getColor(team2.color) }'>{{ team2.school }}</h2>
                </b-col>
                <b-col auto></b-col>
            </b-row>
            <b-row class='data-container'>
                <b-col sm='6'>
                    <h1>Results</h1>
                    <b-table hover small :items='results.games' :fields='fields' :current-page="currentPage" :per-page="perPage"></b-table>
                    <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" align='center' />
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
    import Autocomplete from '@/components/Autocomplete.vue';

    export default {
        components: {
            Autocomplete
        },
        data() {
            return {
                teams: [],
                team1: null,
                team2: null,
                results: null,
                fields: [{
                        key: 'date',
                        label: 'Date',
                        formatter: d => new Date(d).toDateString()
                    },
                    {
                        key: 'homeTeam',
                        label: 'Home'
                    },
                    {
                        key: 'homeScore',
                        label: 'Points'
                    },
                    {
                        key: 'awayTeam',
                        label: 'Away'
                    },
                    {
                        key: 'awayScore',
                        label: 'Points'
                    }
                ],
                currentPage: 1,
                perPage: 10,
                totalRows: 0,
            }
        },
        methods: {
            getTeams() {
                return this.$axios.get('/teams');
            },
            getMatchup() {
                this.$axios.get('/teams/matchup', {
                    params: {
                        team1: this.team1.school,
                        team2: this.team2.school
                    }
                }).then(result => {
                    result.data.games = result.data.games.sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf() >
                        0 ? 1 : -1);

                    for (let game of result.data.games) {
                        if (game.winner == game.homeTeam) {
                            game._cellVariants = {
                                homeTeam: 'info',
                                homeScore: 'info'
                            };
                        } else if (game.winner == game.awayTeam) {
                            game._cellVariants = {
                                awayTeam: 'info',
                                awayScore: 'info'
                            };
                        }
                    }

                    this.results = result.data;

                    this.currentPage = 1;
                    this.totalRows = this.results.games.length;
                });
            },
            updateTeam(index, team) {
                if (!team) {
                    return;
                }

                if (index == 1 && (!this.team1 || team.school !== this.team1.school)) {
                    this.team1 = team;
                    this.getMatchup();
                } else if (!this.team2 || team.school !== this.team2.school) {
                    this.team2 = team;
                    this.getMatchup();
                }
            },
            getColor(color) {
                return color ? color : '#000000';
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

<style lang='scss' scoped>
    .logo {
        width: 250px;
    }

    .record-container {
        margin-top: 50px;
    }

    .team-name {
        margin-top: 12px;
    }

    .record {
        display: flex;
        align-items: center;
    }

    .record-div {
        width: 100%;
    }

    .data-container {
        margin-top: 50px;
    }

    .team-label {
        height: 38px;
        line-height: 38px;
    }

</style>
