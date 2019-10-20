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
                        <router-link to='/data' class='nav-link'>Data</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to='/boxscore' class='nav-link'>Box Scores</router-link>
                    </b-nav-item>
                    <b-nav-item-dropdown text='Charts' class='nav-link'>
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
                            <router-link to='/matchup' class='nav-link text-primary'>Matchups</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/predictedpoints' class='nav-link text-primary'>Predicted Points
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/wp' class='nav-link text-primary'>Predicted Win %</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/ppa/passing/cumulative' class='nav-link text-primary'>Cumulative Avg PPA
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/ppa/usage' class='nav-link text-primary'>Player PPA &amp; Usage
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/metrics/season' class='nav-link text-primary'>Team Metrics
                            </router-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item href="https://predictions.collegefootballdata.com">
                        <a href="https://predictions.collegefootballdata.com" class='nav-link'>Pick'em Contest</a>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/contribute" class='nav-link'>Contribute</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/about" class='nav-link'>About</router-link>
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
