<template>
    <div id="app">
        <div id='banner-image'>
            <b-row class='text-left'>
                <b-col class='ml-2'>
                    <img class='mr-2' src='/LetterLogo.png' />
                </b-col>
                <b-col />
            </b-row>
        </div>
        <navigation id='nav'></navigation>
        <router-view />
        <footer>Copyright &copy; 2021 CollegeFootballData.com</footer>
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
    footer {
        margin-top: 2em;
        background: #555555;
        color: white;
    }

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

    .wide-container {
        margin: 2em;
    }

    #app {
        font-family: "proxima-nova", "Arial", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }

    #banner-image {
        // background: white;
        margin-bottom: 2em;
        margin-left: 2em;
    }

</style>
