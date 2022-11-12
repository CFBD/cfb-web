<template>
    <b-container class='page-container text-left' id='AboutContainer'>
        <h1>About</h1>
        <hr />
        <p class='text-muted'>CollegeFootballData.com (CFBD) is a sports statistics and analytics website with no
            direct affiliation to the NCAA, its member conferences, or its member teams.</p>
        <p class='text-muted'>All data is unofficial and subject to change at any time. No guarantees are made regarding
            the accuracy of any data.</p>
        <p class='text-muted'>If you have any questions or notice any issues you can reach me via Twitter (<b-link href='https://twitter.com/cfb_data' target='_blank'>@CFB_Data</b-link>), email (<b-link href='mailto:admin@collegefootballdata.com'>admin@collegefootballdata.com</b-link>), Discord (BlueSCar), or reddit (/u/BlueSCar).</p>
        <hr />
        <h3>Data Updates</h3>
        <p class='text-muted'>Update frequency depends on the type of data. Generally, game level data is updated within minutes
            of a game being completed. This includes box score data, scores, drive data, and play data. Betting line
            data is updated every 15 minutes. Poll data usually goes live on the same day a new poll is released.
            Rosters, team talent, and returning production usually go live in August right before the start of a new season.
            Recruiting data is currently updated a few times a cycle. Draft data goes live right after completion of the NFL Draft.
        </p>
        <hr />
        <h3>Timeframes</h3>
        <p class='text-muted'>
            <ul>
                <li>Game schedules and scores go back 1869</li>
                <li>Drive, play, stats, and box score data generally go back to 2001</li>
                <li>Historical rosters go back to around 2004</li>
                <li>Polling data goes back to 1936</li>
                <li>Recruiting data goes back to 2000</li>
                <li>NFL Draft data starts in 1967</li>
            </ul>
        </p>
        <hr/>
        <h3>Cost and Usage</h3>
        <p class='text-muted'>This website and its companion API are completely free to use without restrictions. Attribution is always greatly appreciated. Some functionality may be available exclusively to Patreon subscribers. Patreon subscribers also are able to use the API with less frequent request throttling.</p>
        <p class='text-muted'>Please utilize good API usage habits when interacting with the API. This includes making efficient use of calls to grab greater chunks of data at a time as opposed to more frequent calls of smaller data chunks (i.e. "chunky" vs "chatty" calls). Abusing the free and public nature of the API may result in your key becoming blacklisted.</p>
        <hr/>
        <h3>Data Corrections and New Data</h3>
        <p class='text-muted'>If you have data corrections or even some new data you would like to submit for inclusion, please reach out to me at any of the methods mentioned at the top of the page. CSV files works best. To ensure speediest inclusion of your submission, please be sure to include any relevant id fields (e.g. game id, play id, athlete id, etc). This is a one-person operation and I try to get things included as quickly as I am able. Your patience is very much appreciated.</p>
        <hr/>
        <h3>Contributions</h3>
        <p class='text-muted'>
            There are many different ways to contribute:
            <ul>
                <li>Programming - Most of the infrastructure is open-sourced. Pull requests on repos <a href='https://github.com/cfbd'>
                in the CFBD GitHub org</a> are always welcome! CFBD is programmed in JavaScript using a NodeJS/Postgres stack.</li>
                <li>Data - If you have some data you would like to see included, please send it to me using one of the methods listed above.
                    Again, it is best to send datasets in CSV format listing any related id fields (e.g. game id, play id, etc).</li>
                <li>Writing - The <a href='https://blog.collegefootballdata.com'>CFBD blog</a> is always looking for writers, whether
                for a single article or for a series. We are looking for people of all backgrounds and skill levels, whether your are 
                a programmer, a data scientist, or CFB analytics enthusiast. We look to reach as wide an audience as possible. If you are
                interested, please reach out to me on reddit (/u/BlueSCar), in the Discord chat (BlueSCar), on Twitter (@CFB_Data), 
            or <a href='mailto:admin@collegefootballdata.com' target='_blank'>shoot me an email</a>.</li>
                <li>Ideas and suggestions - Please join the CFBD community. We are on Twitter (@CFB_Data), <a href="https://discord.gg/Eb3ex5a" target='_blank'>Discord</a>, and reddit (/r/CFBAnalysis)</li>
            </ul>
        </p>
    </b-container>
</template>

<script>
    export default {

    }

</script>

<style lang="scss">
    #AboutContainer {
        margin-top: 2em;
        padding: 1em;
        background: white;

        .contribute-icon {
            margin: 35px 0;
        }

        .right-contrib-column {
            margin-left: 2em;
        }
    }

</style>
