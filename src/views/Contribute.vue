<template>
    <b-container id='ContributeContainer' class='page-container'>
        <b-card class='title-card'>
            <b-row>
                <b-col>
                    <h1>Contribute</h1>
                    <p class='lead'>There are many different ways to contribute!</p>
                </b-col>
            </b-row>
        </b-card>
        <b-row>
            <b-col lg='6'>
                <b-row>
                    <b-card title='Participate' sub-title="Join the community">
                        <font-awesome-icon class="contribute-icon text-danger" :icon="['fab', 'reddit-alien']"
                            size='3x'>
                        </font-awesome-icon>
                        <p>This project all got started on <a
                                href='https://old.reddit.com/r/cfbanalysis'>r/CFBAnalysis</a>,
                            a community on reddit for CFB analytics enthusiasts of all levels and types</p>
                        <font-awesome-icon class="contribute-icon blurple" :icon="['fab', 'discord']" size='3x'>
                        </font-awesome-icon>
                        <p>r/CFBAnalysis also has its own <a href="https://discord.gg/Eb3ex5a" target='_blank'>Discord
                                community</a>, enabling collaboration on an even deeper level. Everyone is welcome to
                            join!
                        </p>
                    </b-card>
                </b-row>
                <b-row>
                    <b-card title='Find an issue?' sub-title="Please let me know" class='mt-4'>
                        <font-awesome-icon class="contribute-icon text-info" icon='broom' size='3x'></font-awesome-icon>
                        <p>This is currently a one person operation, so it can be hard to keep up with things. If you
                            find
                            an issue, please feel free to reach out to me on reddit (u/BlueSCar), in the Discord chat,
                            on
                            Twitter, or <a href='mailto:admin@collegefootballdata.com' target='_blank'>shoot me an
                                email</a>
                        </p>
                    </b-card>
                </b-row>
            </b-col>
            <b-col lg='6'>
                <b-row>
                    <b-card title="Donate" sub-title="Become a Patron" class='right-contrib-column'>
                        <font-awesome-icon class="contribute-icon text-danger" :icon="['fab', 'patreon']" size='3x'>
                        </font-awesome-icon>
                        <p>This data, API, and website will always be open and free. That said, maybe you want to help
                            with
                            server costs, buy me a beer or coffee, or just show your appreciation with a financial
                            contribution. You can become a Patron by checking out our <a
                                href='https://www.patreon.com/collegefootballdata'>Patreon page</a>.</p>
                        <p>Your contribution will be very much appreciated. While everyone's input is appreciated and
                            considered, Patron input and feature requests will be heavily considered. There may also be
                            opportunity to share more of what's in the works</p>
                    </b-card>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {

    }

</script>

<style lang="scss">
    #ContributeContainer {
        .contribute-icon {
            margin: 35px 0;
        }

        .right-contrib-column {
            margin-left: 2em;
        }
    }

</style>
