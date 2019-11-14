<template>
    <div class="page-container container">
        <b-card class='title-card shadow-lg'>
            <b-row class='justify-content-between'>
                <b-col>
                    <h1>College Football Data</h1>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <p class='text-muted'>Comprehensive source of college football data, no matter your analytical or
                        data needs</p>
                </b-col>
            </b-row>
            <hr />
            <b-row>
                <b-col />
                <b-col>
                    <a class='brand-link text-info' href='https://twitter.com/cfb_data' target="_blank">
                        <b-row class='justify-content-center'>
                            <font-awesome-icon class="text-info" :icon="['fab', 'twitter']" size='4x'>
                            </font-awesome-icon>
                        </b-row>
                        <b-row class='justify-content-center'>Follow us on Twitter</b-row>
                    </a>
                </b-col>
                <b-col>
                    <a class='brand-link text-danger' href="https://www.patreon.com/collegefootballdata"
                        target="_blank">
                        <b-row class='justify-content-center'>
                            <font-awesome-icon :icon="['fab', 'patreon']" size='4x'>
                            </font-awesome-icon>
                        </b-row>
                        <b-row class='justify-content-center'>Become a Patron</b-row>
                    </a>
                </b-col>
                <b-col>
                    <a class='blurple' href="https://discord.gg/Eb3ex5a" target="_blank">
                        <b-row class='justify-content-center'>
                            <font-awesome-icon :icon="['fab', 'discord']" size='4x'>
                            </font-awesome-icon>
                        </b-row>
                        <b-row class='justify-content-center'>Join us on Discord</b-row>
                    </a>
                </b-col>
                <b-col />
            </b-row>
        </b-card>
        <b-row class='home-details'>
            <b-col>
                <b-card>
                    <b-row>
                        <b-col align='center' class='right-divider'>
                            <h5 class='note-header'>Frequent updates</h5>
                            <font-awesome-icon icon='sync' size='3x' class='note-icon text-info'></font-awesome-icon>
                            <p>Most game-related data is updated with the completion of each college football game. Such
                                data
                                includes game results, drive-level data, play by play, and box score data.</p>
                        </b-col>
                        <b-col align='center' class='right-divider'>
                            <h5 class='note-header'>Comprehensive coverage</h5>
                            <font-awesome-icon icon='database' size='3x' class='note-icon text-primary'>
                            </font-awesome-icon>
                            <p>The data hosted here is not only limited to game results and box scores. Other forms of
                                data include
                                team information and rosters, coaching history, conference affiliations, and venue data.
                            </p>
                        </b-col>
                        <b-col align='center' class='right-divider'>
                            <h5 class='note-header'>New data added frequently</h5>
                            <font-awesome-icon icon='bolt' size='3x' class='note-icon text-warning'></font-awesome-icon>
                            <p>This project is in active development and new types of data are frequently being added.
                                Types of data
                                currently on the roadmap includes recruiting data, weather information, and betting
                                lines.</p>
                        </b-col>
                        <b-col align='center' class='right-divider'>
                            <h5 class='note-header'>Export to file</h5>
                            <font-awesome-icon icon='file-export' size='3x' class='note-icon text-success'>
                            </font-awesome-icon>
                            <p>Most forms of data can be cleanly queried through this side and exported to a flat file
                                format. Get
                                started by selecting the 'Data' category from the site menu.</p>
                        </b-col>
                        <b-col align='center'>
                            <h5 class='note-header'>Built with our public API</h5>
                            <font-awesome-icon icon='code' size='3x' class='note-icon text-secondary'>
                            </font-awesome-icon>
                            <p>If you are more programmatically inclined, you may consider utilizing our <a
                                    href='https://api.collegefootballdata.com'>public API</a>. The API is built on the
                                OpenAPI
                                specification using Swagger. Visit the link for comprehensive documentation.</p>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'home',
        components: {

        }
    }

</script>

<style lang="scss">
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
