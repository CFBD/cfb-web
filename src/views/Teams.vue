<template>
    <b-container class="page-container">
        <b-card title="Teams" sub-title="Select a team">
            <b-row>
                <b-col v-for='c in conferences' :key='c.name' sm='6' md='4'>
                    <h3>{{ c.name }}</h3>
                    <b-row v-for='t in c.teams' :key='t.name' class='ml-5 mt-1'>
                        <b-link :to='`/team/${t.name}`'>
                            <b-img :src='t.logo' /><span class='ml-2'>{{ t.name }}</span>
                        </b-link>
                    </b-row>
                </b-col>
            </b-row>
        </b-card>
    </b-container>
</template>

<script>
    export default {
        name: 'Teams',
        data() {
            return {
                conferences: []
            }
        },
        created() {
            this.$axios.get('/teams/fbs').then((result) => {
                let confs = Array.from(new Set(result.data.map(t => t.conference))).sort();
                this.conferences = confs.map(c => ({
                    name: c,
                    teams: result.data
                        .filter(t => t.conference == c)
                        .map(t => ({
                            id: t.id,
                            name: t.school,
                            logo: `/logos/${t.id}.png`
                        }))
                        .sort((a, b) => {
                            let teamA = a.name.toLowerCase();
                            let teamB = b.name.toLowerCase();

                            if (teamA < teamB) {
                                return -1;
                            } else {
                                return 1;
                            }
                        })
                }));
            });
        }
    }

</script>

<style>

</style>
