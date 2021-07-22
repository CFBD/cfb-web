<template>
    <div>
        <div id='title-box'>
            <b-row class='justify-content-between'>
                <b-col>
                    <h1>CollegeFootballData.com</h1>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <img width='200px' src='/Logo.png' />
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h3>Comprehensive source of college football data, no matter your analytical or
                        data needs</h3>
                </b-col>
            </b-row>
        </div>
        <div id='key-box'>
            <b-row class='mt-4 mb-4'>
                <b-col />
                <b-col>
                    <router-link class='brand-link text-warning' to="/key">
                        <b-row class='justify-content-center'>
                            <font-awesome-icon :icon="['fas', 'key']" size='4x'>
                            </font-awesome-icon>
                        </b-row>
                        <b-row class='justify-content-center'><h3 class='display-5'>Register for a free API key</h3></b-row>
                    </router-link>
                </b-col>
                <b-col />
            </b-row>
            <b-row>
                <b-col />
                <b-col md='6'>
                    <b-alert show variant="warning">API keys will be required starting April 1st</b-alert>
                </b-col>
                <b-col />
            </b-row>
        </div>
        <b-row class='mb-4'>
            <b-col>
                    <b-row>
                        <b-col />
                        <b-col sm='8'>
                            <h3>Official CFBD API client libraries</h3>
                        </b-col>
                        <b-col />
                    </b-row>
                    <hr />
                    <b-row class='mt-3 mb-4'>
                        <b-col />
                        <b-col>
                            <a class='brand-link text-warning' href='https://pypi.org/project/cfbd/' target="_blank">
                                <b-row class='justify-content-center'>
                                    <font-awesome-icon :icon="['fab', 'python']" size='4x'>
                                    </font-awesome-icon>
                                </b-row>
                                <b-row class='justify-content-center'><h3>Python</h3></b-row>
                            </a>
                        </b-col>
                        <b-col>
                            <a class='brand-link text-success' href="https://www.npmjs.com/package/cfb.js"
                                target="_blank">
                                <b-row class='justify-content-center'>
                                    <font-awesome-icon :icon="['fab', 'node-js']" size='4x'>
                                    </font-awesome-icon>
                                </b-row>
                                <b-row class='justify-content-center'><h3>NodeJS</h3></b-row>
                            </a>
                        </b-col>
                        <b-col>
                            <a class='blurple' href="https://www.nuget.org/packages/CFBSharp/" target="_blank">
                                <b-row class='justify-content-center'>
                                    <img src='dotnet-logo.svg' height='64px' width='56px' />
                                </b-row>
                                <b-row class='justify-content-center'><h3>C#</h3></b-row>
                            </a>
                        </b-col>
                        <b-col />
                    </b-row>
            </b-col>
        </b-row>
        <hr />
        <b-row>
            <b-col>
                    <b-row>
                        <b-col />
                        <b-col sm='8'>
                            <h3>CFBD on Social Media</h3>
                        </b-col>
                        <b-col />
                    </b-row>
                    <hr />
                    <b-row>
                        <b-col />
                        <b-col>
                            <a class='brand-link text-info' href='https://twitter.com/cfb_data' target="_blank">
                                <b-row class='justify-content-center'>
                                    <font-awesome-icon class="text-info" :icon="['fab', 'twitter']" size='3x'>
                                    </font-awesome-icon>
                                </b-row>
                                <b-row class='justify-content-center'><h3>Twitter</h3></b-row>
                            </a>
                        </b-col>
                        <b-col>
                            <a class='brand-link text-danger' href="https://www.patreon.com/collegefootballdata"
                                target="_blank">
                                <b-row class='justify-content-center'>
                                    <font-awesome-icon :icon="['fab', 'patreon']" size='3x'>
                                    </font-awesome-icon>
                                </b-row>
                                <b-row class='justify-content-center'><h3>Patreon</h3></b-row>
                            </a>
                        </b-col>
                        <b-col>
                            <a class='blurple' href="https://discord.gg/Eb3ex5a" target="_blank">
                                <b-row class='justify-content-center'>
                                    <font-awesome-icon :icon="['fab', 'discord']" size='3x'>
                                    </font-awesome-icon>
                                </b-row>
                                <b-row class='justify-content-center'><h3>Discord</h3></b-row>
                            </a>
                        </b-col>
                        <b-col />
                    </b-row>
            </b-col>
        </b-row>
        <blog />
    </div>
</template>

<script>
    // @ is an alias to /src
    import Blog from '../components/Blog.vue';

    export default {
        name: 'home',
        components: {
            Blog
        }
    }

</script>

<style lang="scss">
    #nav {
        margin-bottom: 0;
    }

    #title-box {
        background: #555555;
        color: #38b0ff;
        padding-bottom: 3em;
    }

    #key-box {
        background: #38b0ff;
        padding: 3em;
    }

    .right-divider {
        border-right: 1px solid black;
    }

    .home-details {
        margin-bottom: 50px;

        h5 {
            height: 75px;
        }

        .note-icon {
            margin-bottom: 25px;
        }
    }

    .blurple {
        color: #7289DA;

        &:hover {
            text-decoration: none;
        }
    }

    .brand-link {
        &:hover {
            text-decoration: none;
        }
    }

</style>
