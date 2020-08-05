<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="secondary">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href='/'>
                <img src='/Logo.png' class='brand-image' />
                CollegeFootballData.com
            </b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link to="/" class='nav-link'>Home</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to='/exporter' class='nav-link'>Data</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to='/boxscore' class='nav-link'>Box Scores</router-link>
                    </b-nav-item>
                    <b-nav-item-dropdown text='Charts' class='nav-link'>
                        <b-dropdown-item>
                            <router-link to='/metrics/season' class='nav-link text-primary'>Team Metrics
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/ppa/passing/cumulative' class='nav-link text-primary'>Passing Trends
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/ppa/usage' class='nav-link text-primary'>Player Efficiency
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/wp' class='nav-link text-primary'>Win Probability</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/matchup' class='nav-link text-primary'>Historical Matchups</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/sp' class='nav-link text-primary'>SP+</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/sp/trends' class='nav-link text-primary'>SP+ Team Trends</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/sp/recruiting' class='nav-link text-primary'>SP+ and Recruiting
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/predictedpoints' class='nav-link text-primary'>Predicted Points
                            </router-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item>
                        <router-link to="/Glossary" class='nav-link'>Glossary</router-link>
                    </b-nav-item>
                    <b-nav-item href='https://blog.collegefootballdata.com' target='_blank'>
                        <a href='https://blog.collegefootballdata.com' class='nav-link' target='_blank'>Blog</a>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/contribute" class='nav-link'>Contribute</router-link>
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class='ml-auto'>
                    <b-button id='api-link' href="https://api.collegefootballdata.com" target="_blank">
                        API
                    </b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {

    }

</script>

<style lang="scss">
    .brand-image {
        height: 30px;
        width: 30px;
    }

    #api-link {
        background-color: #38b0ff;
    }

</style>
