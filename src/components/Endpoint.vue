<template>
    <div>
        <b-form @submit="onSubmit">
            <b-row class="my-1" v-for='qp in this.queryParams' :key='qp.parameter.name'>
                <b-col sm="2"><label for="input-default">{{qp.parameter.name | capitalize }}</label></b-col>
                <b-col sm="10">
                    <b-form-input :placeholder='qp.parameter.description' :required='qp.parameter.required' :type='getType(qp.parameter.type)'
                        v-model="qp.value">
                    </b-form-input>
                </b-col>
            </b-row>
            <b-button type="submit" variant="primary" size='lg' align='right'>Submit</b-button>
        </b-form>
        <div v-if='loading' align='center'>
            <hr class='my-4'>
            <pacman-loader class='loader' color='#17a2b8'></pacman-loader>
        </div>
        <div v-if='items.length > 0 && !loading'>
            <hr class='my-4'>
            <div class='results-grid'>
                <h3 class='results-title'>Results Preview</h3>
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
                        <download-csv :data='items' :delimiter='selected' class='btn btn-info'>
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
    export default {
        name: 'endpoint',
        props: {
            endpoint: Object
        },
        data() {
            return {
                queryParams: [],
                items: [],
                currentPage: 1,
                perPage: 50,
                totalRows: 0,
                selected: ',',
                loading: false,
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
                this.loading = true;
                let params = {};

                for (let qp of this.queryParams) {
                    if (qp.value) {
                        params[qp.parameter.name] = qp.value;
                    }
                }

                this.$axios.get(this.endpoint.key, {
                    params: params
                }).then(response => {
                    let flattened = this.flattentData(this.endpoint.key, response.data);
                    this.items = flattened;
                    this.currentPage = 1;
                    this.totalRows = this.items.length;
                }).finally(() => {
                    this.loading = false;
                });
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
            if (this.endpoint) {
                for (let parameter of this.endpoint.path.get.parameters) {
                    let value = parameter.default ? parameter.default : null;
                    this.queryParams.push({
                        parameter,
                        value
                    });
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
        width: 80%;
    }

</style>
