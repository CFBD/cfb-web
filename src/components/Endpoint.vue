<template>
    <div>
        <b-form @submit="onSubmit">
            <b-row class='text-justify-center'>
                <b-col />
                <b-col>
                    <p class='muted'>
                        {{ this.endpoint.path.get.summary }}
                    </p>
                </b-col>
                <b-col />
            </b-row>
            <b-row>
                <b-col sm="4" v-for='qp in this.queryParams' :key='qp.parameter.name'>
                    <b-form-row>
                        <b-col sm="4"><label for="input-default">{{qp.parameter.name | capitalize }}</label></b-col>
                        <b-col sm="8">
                            <autocomplete v-if="isTeamParameter(qp.parameter.name)" :items='teams'
                                v-on:selection='qp.value = $event' :placeholder="qp.parameter.description"
                                :is-required='qp.parameter.required'></autocomplete>
                            <autocomplete v-else-if="isConferenceParameter(qp.parameter.name)" :items='conferences'
                                displayProp='name' valueProp='abbreviation' v-on:selection='qp.value = $event'
                                :placeholder="qp.parameter.description" :is-required='qp.parameter.required'>
                            </autocomplete>
                            <autocomplete v-else-if="qp.parameter.name == 'playType'" :items='playTypes'
                                displayProp='text' valueProp='id' v-on:selection='qp.value = $event'
                                :placeholder="qp.parameter.description" :is-required='qp.parameter.required'>
                            </autocomplete>
                            <b-form-select v-else-if="qp.parameter.name == 'seasonType'" v-model="qp.value"
                                :options="['regular', 'postseason', 'both']" class="mb-3" />
                            <b-form-input v-else :placeholder='qp.parameter.description'
                                :required='qp.parameter.required' :type='getType(qp.parameter.type)' v-model="qp.value">
                            </b-form-input>
                        </b-col>
                    </b-form-row>
                </b-col>
            </b-row>
            <b-button type="submit" variant="primary" size='md' align='right'>Query</b-button>
        </b-form>
        <div v-if='loading' align='center'>
            <hr class='my-4'>
            <pacman-loader class='loader' color='#17a2b8'></pacman-loader>
        </div>
        <div v-if='!loading && error' align='center'>
            <hr class='my-4'>
            <b-alert variant="warning" show>
                Invalid query. Trying specifying another filter option and try again.
            </b-alert>
        </div>
        <div v-if='items.length > 0 && !loading && !error'>
            <hr class='my-4'>
            <div class='results-grid'>
                <h3 class='results-title'>Results Preview</h3>
                <b-row v-if="endpoint.key === '/game/box/advanced'">
                    <b-col />
                    <b-col>
                        <b-form-select v-model="boxSelected" :options="boxOptions" @change="updateBoxSelected">
                        </b-form-select>
                    </b-col>
                    <b-col />
                </b-row>
                <b-row class='export-form'>
                    <b-col sm="5">
                        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" align='left' />
                    </b-col>
                    <b-col sm="5">
                        <b-form-group horizontal="" label="Delimeter:">
                            <b-form-select v-model="selected" :options="options" class="mb-3" size="sm" />
                        </b-form-group>
                    </b-col>
                    <b-col sm="2">
                        <download-csv :data='items' :delimiter='selected' class='btn btn-info' @click='onExport'>
                            Download
                        </download-csv>
                    </b-col>
                    <b-col></b-col>
                </b-row>
                <b-table striped responsive hover small :items="items" :current-page="currentPage" :per-page="perPage">
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
    import Autocomplete from './Autocomplete.vue';

    export default {
        name: 'endpoint',
        components: {
            Autocomplete
        },
        props: {
            endpoint: Object,
            conferences: Array,
            teams: Array,
            playTypes: Array,
            query: Object
        },
        data() {
            return {
                queryParams: [],
                items: [],
                results: [],
                boxOptions: ['Teams', 'Players'],
                boxSelected: 'Teams',
                currentPage: 1,
                perPage: 50,
                totalRows: 0,
                selected: ',',
                loading: false,
                error: false,
                options: [{
                        value: ',',
                        text: 'Comma (,)'
                    },
                    {
                        value: '|',
                        text: 'Pipe (|)'
                    },
                    {
                        value: '\t',
                        text: 'Tab'
                    }
                ]
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault();

                this.$ga.event('data', 'query', this.endpoint.key);

                this.loading = true;
                let params = {};

                for (let qp of this.queryParams) {
                    if (qp.value) {
                        params[qp.parameter.name] = qp.value;
                    }
                }

                this.$emit('query', params);

                this.$axios.get(this.endpoint.key, {
                    params: params
                }).then(response => {
                    this.error = false;
                    this.results = response.data;
                    let flattened = this.flattentData(this.endpoint.key, response.data)
                        .map(f => {
                            if (f['clock.minutes'] && !f['clock.seconds']) {
                                f['clock.seconds'] = 0;
                            }

                            return f;
                        });
                    this.items = flattened;

                    this.currentPage = 1;
                    this.totalRows = this.items.length;
                }).catch(err => {
                    this.error = true;
                }).finally(() => {
                    this.loading = false;
                });
            },
            onExport() {
                this.$ga.event('data', 'export', this.endpoint.key);
            },
            getType(paramType) {
                let inputType = '';

                switch (paramType) {
                    case 'string':
                        inputType = 'text';
                    case 'integer':
                        inputType = 'number';
                    default:
                        inputType = 'text';
                }

                return inputType;
            },
            isTeamParameter(inputName) {
                return inputName.toLowerCase().indexOf('team') !== -1 || inputName == 'home' || inputName == 'away' ||
                    inputName == 'offense' || inputName == 'defense';
            },
            isConferenceParameter(inputName) {
                return inputName.toLowerCase().indexOf('conference') != -1;
            },
            updateBoxSelected(selection) {
                this.boxSelected = selection;
                this.items = this.flattentData(this.endpoint.key, this.results);
            },
            flattentData(key, data) {
                let flattened = [];

                switch (key) {
                    case '/coaches':
                        for (let coach of data) {
                            flattened.push(...coach.seasons.map(s => {
                                s.first_name = coach.first_name;
                                s.last_name = coach.last_name;

                                return s;
                            }));
                        }
                        break;
                    case '/games/players':
                        for (let game of data) {
                            for (let team of game.teams) {
                                for (let category of team.categories) {
                                    for (let type of category.types) {
                                        flattened.push(...type.athletes.map(a => {
                                            return {
                                                game_id: game.id,
                                                school: team.school,
                                                conference: team.conference,
                                                homeAway: team.homeAway,
                                                points: team.points,
                                                stat_category: category.name,
                                                stat_type: type.name,
                                                athlete: a.name,
                                                stat: a.stat
                                            }
                                        }));
                                    }
                                }
                            }
                        }
                        break;
                    case '/games/teams':
                        for (let game of data) {
                            for (let team of game.teams) {
                                flattened.push(...team.stats.map(s => {
                                    return {
                                        game_id: game.id,
                                        school: team.school,
                                        conference: team.conference,
                                        homeAway: team.homeAway,
                                        points: team.points,
                                        stat_category: s.category,
                                        stat: s.stat
                                    }
                                }));
                            }
                        }
                        break;
                    case '/rankings':
                        for (let week of data) {
                            for (let poll of week.polls) {
                                for (let rank of poll.ranks) {
                                    flattened.push({
                                        season: week.season,
                                        seasonType: week.seasonType,
                                        week: week.week,
                                        poll: poll.poll,
                                        rank: rank.rank,
                                        school: rank.school,
                                        conference: rank.conference,
                                        firstPlaceVotes: rank.firstPlaceVotes,
                                        points: rank.points
                                    })
                                }
                            }
                        }
                        break;
                    case '/teams/matchup':
                        flattened = data.games.map(g => this.flatten(g));
                        break;
                    case '/lines':
                        for (let game of data) {
                            for (let line of game.lines) {
                                flattened.push({
                                    id: game.id,
                                    homeTeam: game.homeTeam,
                                    homeScore: game.homeScore,
                                    awayTeam: game.awayTeam,
                                    awayScore: game.awayScore,
                                    lineProvider: line.provider,
                                    overUnder: line.overUnder,
                                    spread: line.spread,
                                    formattedSpread: line.formattedSpread
                                });
                            }
                        }
                        break;
                    case '/game/box/advanced':
                        if (this.boxSelected == 'Teams') {
                            flattened = data.teams.ppa.map(t => {
                                let successRates = data.teams.successRates.find(s => s.team == t.team);
                                let explosiveness = data.teams.explosiveness.find(s => s.team == t.team);
                                return {
                                    team: t.team,
                                    ppa_quarter_1: t.overall.quarter1,
                                    ppa_quarter_2: t.overall.quarter2,
                                    ppa_quarter_3: t.overall.quarter3,
                                    ppa_quarter_4: t.overall.quarter4,
                                    ppa_total: t.overall.total,
                                    ppa_passing_quarter_1: t.passing.quarter1,
                                    ppa_passing_quarter_2: t.passing.quarter2,
                                    ppa_passing_quarter_3: t.passing.quarter3,
                                    ppa_passing_quarter_4: t.passing.quarter4,
                                    ppa_passing_total: t.passing.total,
                                    ppa_rushing_quarter_1: t.rushing.quarter1,
                                    ppa_rushing_quarter_2: t.rushing.quarter2,
                                    ppa_rushing_quarter_3: t.rushing.quarter3,
                                    ppa_rushing_quarter_4: t.rushing.quarter4,
                                    ppa_rushing_total: t.rushing.total,
                                    success_rate_quarter1: successRates.overall.quarter1,
                                    success_rate_quarter2: successRates.overall.quarter2,
                                    success_rate_quarter3: successRates.overall.quarter3,
                                    success_rate_quarter4: successRates.overall.quarter4,
                                    success_rate_total: successRates.overall.total,
                                    success_rate_standard_downs_quarter1: successRates.standardDowns.quarter1,
                                    success_rate_standard_downs_quarter2: successRates.standardDowns.quarter2,
                                    success_rate_standard_downs_quarter3: successRates.standardDowns.quarter3,
                                    success_rate_standard_downs_quarter4: successRates.standardDowns.quarter4,
                                    success_rate_standard_downs_total: successRates.standardDowns.total,
                                    success_rate_passing_downs_quarter1: successRates.passingDowns.quarter1,
                                    success_rate_passing_downs_quarter2: successRates.passingDowns.quarter2,
                                    success_rate_passing_downs_quarter3: successRates.passingDowns.quarter3,
                                    success_rate_passing_downs_quarter4: successRates.passingDowns.quarter4,
                                    success_rate_passing_downs_total: successRates.passingDowns.total,
                                    explosiveness_quarter1: explosiveness.overall.quarter1,
                                    explosiveness_quarter2: explosiveness.overall.quarter2,
                                    explosiveness_quarter3: explosiveness.overall.quarter3,
                                    explosiveness_quarter4: explosiveness.overall.quarter4,
                                    explosiveness_total: explosiveness.overall.total
                                };
                            });
                        } else {
                            flattened = data.players.usage.map(p => {
                                let ppa = data.players.ppa.find(s => p.player == s.player && p.team == s.team &&
                                    p.position == s.position);
                                return {
                                    player: p.player,
                                    team: p.team,
                                    position: p.position,
                                    usage_quarter1: p.quarter1,
                                    usage_quarter2: p.quarter2,
                                    usage_quarter3: p.quarter3,
                                    usage_quarter4: p.quarter4,
                                    usage_rushing: p.rushing,
                                    usage_passing: p.passing,
                                    usage_total: p.total,
                                    avg_ppa_quarter1: ppa.average.quarter1,
                                    avg_ppa_quarter2: ppa.average.quarter2,
                                    avg_ppa_quarter3: ppa.average.quarter3,
                                    avg_ppa_quarter4: ppa.average.quarter4,
                                    avg_ppa_rushing: ppa.average.rushing,
                                    avg_ppa_passing: ppa.average.passing,
                                    avg_ppa_total: ppa.average.total,
                                    cum_ppa_quarter1: ppa.cumulative.quarter1,
                                    cum_ppa_quarter2: ppa.cumulative.quarter2,
                                    cum_ppa_quarter3: ppa.cumulative.quarter3,
                                    cum_ppa_quarter4: ppa.cumulative.quarter4,
                                    cum_ppa_rushing: ppa.cumulative.rushing,
                                    cum_ppa_passing: ppa.cumulative.passing,
                                    cum_ppa_total: ppa.cumulative.total
                                };
                            });
                        }
                        break;
                    default:
                        flattened = data.map(d => this.flatten(d));
                }

                return flattened;
            },
            flatten(data) {
                var result = {};

                function recurse(cur, prop) {
                    if (Object(cur) !== cur) {
                        result[prop] = cur;
                    } else if (Array.isArray(cur)) {
                        for (var i = 0, l = cur.length; i < l; i++)
                            recurse(cur[i], prop + "[" + i + "]");
                        if (l == 0)
                            result[prop] = [];
                    } else {
                        var isEmpty = true;
                        for (var p in cur) {
                            isEmpty = false;
                            recurse(cur[p], prop ? prop + "." + p : p);
                        }
                        if (isEmpty && prop)
                            result[prop] = {};
                    }
                }
                recurse(data, "");
                return result;
            }
        },
        created() {
            if (this.endpoint && this.endpoint.path && this.endpoint.path.get && this.endpoint.path.get.parameters) {
                for (let parameter of this.endpoint.path.get.parameters) {
                    let value = parameter.default ? parameter.default : null;

                    if (this.query) {
                        let queryParam = this.query[parameter.name];
                        if (queryParam) {
                            value = queryParam;
                        }
                    }

                    this.queryParams.push({
                        parameter,
                        value
                    });
                }
            }
        },
        watch: {
            endpoint: function (to, from) {
                if (to.key != from.key) {
                    this.queryParams = [];
                    this.results = [];
                    this.items = [];
                    if (to && to.path && to.path.get && to.path.get
                        .parameters) {
                        for (let parameter of to.path.get.parameters) {
                            let value = parameter.default ? parameter.default : null;
                            this.queryParams.push({
                                parameter,
                                value
                            });
                        }
                    }
                }
            },
            query: function (to, from) {
                if (to != from) {
                    this.queryParams = [];
                    this.results = [];
                    this.items = [];
                    if (this.endpoint && this.endpoint.path && this.endpoint.path.get && this.endpoint.path.get
                        .parameters) {
                        for (let parameter of this.endpoint.path.get.parameters) {
                            let value = parameter.default ? parameter.default : null;
                            let queryParam = to[parameter.name];
                            if (queryParam) {
                                value = queryParam;
                            }

                            this.queryParams.push({
                                parameter,
                                value
                            });
                        }
                    }
                }
            }
        }
    }

</script>

<style lang='scss'>
    button {
        &[type='submit'] {
            margin-top: 15px;
        }
    }

    .results-title {
        margin: 30px 0;
    }

    .loader {
        margin: 40px 0;
    }

    .tab-content {
        margin-left: 20px;
        margin-right: 20px;
    }

</style>
