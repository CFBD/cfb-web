<template>
    <div>
        <b-row>
            <b-col lg='9' class='mt-0'>
                <blog />
            </b-col>
            <b-col lg='3'>
                <b-row class='mb-5 justify-content-center'>
                        <a href="https://www.patreon.com/bePatron?u=23067681" data-patreon-widget-type="become-patron-button">Become a Patreon!</a>
                </b-row>
                <b-row class='justify-content-center mb-5'>
                    <router-link class='brand-link' to="/key">
                        <b-row class='justify-content-center text-warning'>
                            <font-awesome-icon :icon="['fas', 'key']" size='3x'>
                            </font-awesome-icon>
                        </b-row>
                        <b-row class='justify-content-center'>
                            <strong>Register for a free API key</strong>
                        </b-row>
                    </router-link>
                </b-row>
                <b-row class='justify-content-center mb-5'>
                    <a class="twitter-timeline" data-width="350" data-height="600" data-theme="dark"
                        href="https://twitter.com/CFB_Data?ref_src=twsrc%5Etfw">Tweets by CFB_Data</a>
                </b-row>
                <b-row class='justify-content-center mb-5'>
                    <iframe src="https://discord.com/widget?id=578652864793018368&theme=dark" width="350" height="500"
                        allowtransparency="true" frameborder="0"
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </b-row>
            </b-col>
        </b-row>
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
