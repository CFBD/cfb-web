<template>
    <b-container id='ContributeContainer' class='text-left'>
        <b-card bg-variant="dark" text-variant="white" title='What data is provided by CFBD?'>
            <b-card-text>
                This is always changing as new types of data are constantly being added. Main types of data include:
                <ul>
                    <li>
                        Game data
                        <ul>
                            <li>Team stats</li>
                            <li>Players stats</li>
                            <li>Drive level data</li>
                            <li>Play level data</li>
                            <li>Betting lines</li>
                            <li>Historical weather</li>
                            <li>Advanced box scores</li>
                        </ul>
                    </li>
                    <li>
                        Team data
                        <ul>
                            <li>Historical rosters</li>
                            <li>Recruiting ratings and rankings</li>
                            <li>Team talent composite ratings</li>
                            <li>Team and conference information</li>
                        </ul>
                    </li>
                    <li>
                        Player data
                        <ul>
                            <li>Game and season stats</li>
                            <li>Recruit information</li>
                            <li>Hometown and geographic information</li>
                        </ul>
                    </li>
                    <li>
                        Advanced metrics (season and game level)
                        <ul>
                            <li>EPA/PPA</li>
                            <li>Win probabilities</li>
                            <li>SRS</li>
                            <li>Player play usage</li>
                            <li>Returning production</li>
                            <li>etc</li>
                        </ul>
                    </li>
                    <li>NFL Draft data</li>
                    <li>Coaching history and records</li>
                    <li>Historical polls</li>
                    <li>Stadium and venue information</li>
                </ul>
                The full list of data provided can be found on the <router-link to='/exporter'>data export page</router-link> and in the <b-link href="https://api.collegefootballdata.com"> interactive API docs</b-link>.
            </b-card-text>
        </b-card>
        <b-card bg-variant="dark" text-variant="white" title='How often is data updated?'>
            <b-card-text>
                Update frequency depends on the type of data. Generally, game level data is updated within minutes 
                of a game being completed. This includes box score data, scores, drive data, and play data. Betting line 
                data is updated every 15 minutes. Poll data usually goes live on the same day a new poll is released. Rosters,
                team talent, and returning production usually go live in August right before the start of a new season. Recruiting
                data is currently updated a few times a cycle. Draft data goes live right after completion of the NFL Draft.
            </b-card-text>
        </b-card>
        <b-card bg-variant="dark" text-variant="white" title='How far back does the data go?'>
            <b-card-text>
                This is also highly dependent on the type of data. In general, almost all data goes back at least 5-10 years with most data going back further than that.
                <ul>
                    <li>Game schedules and scores go back 1869</li>
                    <li>Drive, play, stats, and box score data generally go back to 2001</li>
                    <li>Historical rosters go back to around 2004</li>
                    <li>Polling data goes back to 1936</li>
                    <li>Recruiting data goes back to 2000</li>
                    <li>NFL Draft data starts in 1967</li>
                </ul>
            </b-card-text>
        </b-card>
        <b-card bg-variant="dark" text-variant="white" title='How do I get at API key and how much does it cost?'>
            <b-card-text>
                The API is open and free. You can get your free key by <router-link to='/key'>registering on this site</router-link>. Your key will be sent to the provided email. Patreon subscribers receive additional benefits, such as higher rate limits and early access to new features and data.
            </b-card-text>
        </b-card>
        <b-card bg-variant="dark" text-variant="white" title='I noticed an issue with some of the data. What do I do?'>
            <b-card-text>
                Unfortunately, it is an impossible task for one person to police the sheer amount of data that comes in here. There are 
                several automated processes which run to clean up various known data issues, but there are always things that fall through 
                the cracks. If you notice an issue, please reach out to me on reddit (u/BlueSCar), in the Discord chat (BlueSCar), on Twitter (@CFB_Data), 
                or <a href='mailto:admin@collegefootballdata.com' target='_blank'>shoot me an email</a>.
            </b-card-text>
        </b-card>
        <b-card bg-variant="dark" text-variant="white" title='I cleaned up some data issues that I found. What is the best way to get it to you?'>
            <b-card-text>
                Data corrections are always very much appreciated. The best way to send corrections is via any of the methods listed in the previous box.
                In order to ensure speedy inclusion, the best format to send in corrected data is in CSV or spreadsheet format listing the id for the type of
                data being corrected (e.g. play id, game id, etc) as well as any updated fields.
            </b-card-text>
        </b-card>
        <b-card bg-variant="dark" text-variant="white" title='I have some technical skills. Are there any ways to contribute to CFBD?'>
            <b-card-text>
                Absolutely. There are many different ways to contribute:
                <ul>
                    <li>Programming - Most of the infrastructure is open-sourced. Pull requests on repos <a href='https://github.com/cfbd'>
                    in the CFBD GitHub org</a> are always welcome! CFBD is programmed in JavaScript using a NodeJS/Postgres stack.</li>
                    <li>Data - If you have some data you would like to see included, please send it to me using one of the methods listed above.
                        Again, it is best to send datasets in CSV format listing any related id fields (e.g. game id, play id, etc).</li>
                    <li>Writing - The <a href='https://blog.collegefootballdata.com'>CFBD blog</a> is always looking for writers, whether
                    for a single article or for a series. We are looking for people of all backgrounds and skill levels, whether your are 
                    a programmer, a data scientist, or CFB analytics enthusiast. We look to reach as wide an audience as possible. If you are
                    interested, please reach out to me on reddit (u/BlueSCar), in the Discord chat (BlueSCar), on Twitter (@CFB_Data), 
                or <a href='mailto:admin@collegefootballdata.com' target='_blank'>shoot me an email</a>.</li>
                    <li>Ideas and suggestions - Please join the CFBD community. We are on Twitter (@CFB_Data), <a href="https://discord.gg/Eb3ex5a" target='_blank'>Discord</a>, and reddit (r/CFBAnalysis)</li>
                </ul>
            </b-card-text>
        </b-card>
        <b-card bg-variant="dark" text-variant="white" title="I don't have anything skills-wise to contribute at the moment but would still like to support your work.">
            <b-card-text>
                Subscriptions to the <a href='https://www.patreon.com/collegefootballdata'>CFBD Patreon</a> are never expected but always very
                much appreciated. You can subscribe for as little as $1 a month and you will be contributing to helping to keep the site up and running
                while receiving several perks, such as increased access, higher API rate limits, and early and exclusive feature access.
            </b-card-text>
        </b-card>
    </b-container>
</template>

<script>
    export default {

    }

</script>

<style lang="scss">

    #ContributeContainer {
        margin-top: 2em;
        
        .contribute-icon {
            margin: 35px 0;
        }

        .right-contrib-column {
            margin-left: 2em;
        }
    }

</style>
