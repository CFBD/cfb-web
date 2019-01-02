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
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

        div.container {
            margin-top: 50px;
        }
    }

    // #nav {
    //     a {
    //         font-weight: bold;
    //         color: #2c3e50;

    //         &.router-link-exact-active {
    //             color: #42b983;
    //         }
    //     }
    // }

</style>
