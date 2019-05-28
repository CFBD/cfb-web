<template>
    <b-container id='ContributeContainer'>
        <div>
            <h1>Contribute to the Project</h1>
            <p class='lead'>There are several ways you can contribute to this project, whether by your feedback on the project, through participation in the community for college football analytics, or other means.  This project is stronger when it is community driven.  Please see below for all of the different ways to collaborate.  If you would like to collaborate in a manner not listed below, please <a href="mailto:admin@collegefootballdata.com" target="_blank"> contact me</a> or comment in the <a href="https://discord.gg/Eb3ex5a" target='_blank'>Discord community</a> as I am always looking for more opportunities for collaboration.  For quickest response time, <a href="https://discord.gg/Eb3ex5a" target='_blank'>Discord</a> is the preferred method of contact.</p>
        </div>
        <hr>
        <div>
            <h3>Want to participate?</h3>
            <font-awesome-icon class="contribute-icon text-danger" :icon="['fab', 'reddit-alien']" size='3x'></font-awesome-icon>
            <p>Please consider joining reddit's community for college football analytics, <a href="https://old.reddit.com/r/cfbanalysis" target='_blank'>r/CFBAnalysis</a>.  In partnership with <a href="https://old.reddit.com/r/cfb" target='_blank'>r/CFB</a>, the larget collection of college football fans anywhere on the internet, r/CFBAnalysis is a place for data scientists of all levels to come together to discuss any methodologies, data sources, and projects relating to college football data analytics.</p>
            <p>Please also consider joining our <a href="https://discord.gg/Eb3ex5a" target='_blank'>Discord community</a>, made up of CFB analysis enthusiasts of all levels, from those just starting out to experts who have been doing this sort of stuff for a long time.  Everyone is welcome!</p>
        </div>
        <hr>
        <div>
            <h3>Suggestions?</h3>
            <font-awesome-icon class="contribute-icon text-warning" icon='lightbulb' size='3x'></font-awesome-icon>
            <p>I am always looking for ways to add new functionality and incorporate new data or maybe you have some feedback on the existing functionality.  Either way, your ideas are very much welcome.  You can view the project's current list of planned enchancements and fixes on the project <a href='https://tree.taiga.io/project/bluescar-college-football-data-api' target='_blank'>Taiga board</a>.  Or you can feel free to <a href='mailto:admin@collegefootballdata.com' target='_blank'>contact me directly</a>.</p>
        </div>
        <hr>
        <div>
            <h3>Find an issue?</h3>
            <font-awesome-icon class="contribute-icon text-info" icon='broom' size='3x'></font-awesome-icon>
            <p>With such a large, ever-growing volume of data, it can be difficult to track down potential issues and areas that may need to be cleaned up.  If you encounter such a scenario, please <a href='mailto:admin@collegefootballdata.com' target='_blank'>shoot me an email</a>.</p>
        </div>
        <hr>
        <div>
            <h3>Have other data?</h3>
            <font-awesome-icon class="contribute-icon text-primary" icon='database' size='3x'></font-awesome-icon>
            <p>Do you have some data laying around that you'd like to see incorporated?  Please <a href='mailto:admin@collegefootballdata.com' target="_blank"> email me</a> to see about it's inclusion.  I can't promise I will use the exact format you send me, but what you do have will be a great starting point in addition to any conversation about how to retrieved said data.  My import tools are also open source, so there could be some opportunity for collaboration as well.</p>
        </div>
        <hr>
        <div>
            <h3>Donate?</h3>
            <font-awesome-icon class="contribute-icon text-success" icon='donate' size='3x'></font-awesome-icon>
            <p>Has my work helped you out in any way?  Maybe you'd like to buy me a beer or help with the costs of hosting this infrastructure?  You can do so via <a href='https://paypal.me/BillRadjewski' target="_blank"> my PayPal link</a>.  There is no obligation whatsoever and any donation will not be without great appreciation.  Lots of time and effort go towards building up all of this functionality and continuing to improve it.  Server costs are relatively inexpensive at the moment, but certainly not free.  That said, this is a labor of love that I am more than happy to continue regardless.</p>
        </div>
    </b-container>
</template>

<script>
    export default {

    }

</script>

<style lang="scss">
    #ContributeContainer {
        margin-bottom: 30px;

        .contribute-icon {
            margin: 35px 0;
        }
    }
</style>
