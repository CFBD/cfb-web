<template>
    <div id="app">
        <navigation id='nav'></navigation>
        <router-view />
    </div>
</template>

<script>
    import Navigation from './components/Navigation.vue';

    export default {
        components: {
            Navigation
        }
    }

</script>


<style lang="scss">
    body {
        background: url('./assets/bg.jpg') scroll;
        background-repeat: repeat-x;
        background-attachment: fixed;
    }

    #app {
        background: rgba(255, 255, 255, .5);
    }

    .spinner-container {
        margin-top: 4em;
    }

    div[class*="col-"],
    .col {
        margin-top: 2em;
    }

    .bottom-row {
        margin-bottom: 2em;
    }

    .page-container {
        margin-top: 2em;
        padding-bottom: 500px;

        .title-card {
            .row {
                margin-bottom: 0;
            }

            div[class*="col-"],
            .col {
                margin-top: 0;
            }
        }

        .card,
        .card-body {
            height: 100%;
        }
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }

    #nav {
        margin-bottom: 2.5em;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #38b0ff;
            }
        }
    }

</style>
