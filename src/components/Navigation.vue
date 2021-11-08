<template>
    <div>
        <b-navbar toggleable="md" type="light" variant="secondary">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav align='center'>
                    <b-nav-item>
                        <router-link to="/" class='nav-link'>Home</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to='/exporter' class='nav-link'>Data</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to='/teams' class='nav-link'>Teams</router-link>
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
                    <b-nav-item-dropdown text='API' class='nav-link'>
                        <b-dropdown-item href='https://api.collegefootballdata.com' target='_blank'>
                            <a href='https://api.collegefootballdata.com' class='nav-link' target='_blank'>Docs</a>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/key' class='nav-link text-primary'>API Keys
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-header>Wrappers</b-dropdown-header>
                        <b-dropdown-item href='https://pypi.org/project/cfbd/' target='_blank'>
                            <a href='https://pypi.org/project/cfbd/' class='nav-link' target='_blank'>Python</a>
                        </b-dropdown-item>
                        <b-dropdown-item href='https://www.npmjs.com/package/cfb.js' target='_blank'>
                            <a href='https://www.npmjs.com/package/cfb.js' class='nav-link' target='_blank'>JavaScript</a>
                        </b-dropdown-item>
                        <b-dropdown-item href='https://www.nuget.org/packages/CFBSharp/' target='_blank'>
                            <a href='https://www.nuget.org/packages/CFBSharp/' class='nav-link' target='_blank'>C#</a>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text='About' class='nav-link'>
                        <b-dropdown-item>
                            <router-link to='/glossary' class='nav-link text-primary'>Glossary
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/about' class='nav-link text-primary'>FAQ &amp; Info
                            </router-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
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
    #nav {
        font-size: 1.3em;
        margin-bottom: 2.5em;

        .dropdown-menu {
            background: #6c757d;
        }

        .dropdown-item:focus,
        .dropdown-item:hover {
            background-color: #38b0ff;
        }

        a {
            font-weight: bold;
            color: white !important;
            text-transform: uppercase !important;

            &.router-link-exact-active {
                color: #38b0ff !important;
            }
        }

        .dropdown-header {
            font-size: .8em;
            color: #38b0ff;
            font-weight: bolder;
        }
    }

</style>
