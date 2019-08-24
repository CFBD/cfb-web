<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="secondary">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href='/'>
                <img src='/Logo.png' class='brand-image' />
                CollegeFootballData.com
            </b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link to="/" class='nav-link'>Home</router-link>
                    </b-nav-item>
                    <b-nav-item-dropdown text="Data" class='nav-link'>
                        <b-dropdown-item v-for="tag in this.docs.tags" :key="tag.name">
                            <router-link :to="`/category/${tag.name}`" class='nav-link text-primary'>{{tag.name |
                                capitalize}}</router-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text='Tools' class='nav-link'>
                        <b-dropdown-item>
                            <router-link to='/sp' class='nav-link text-primary'>S&amp;P+</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/sp/trends' class='nav-link text-primary'>S&amp;P+ Team Trends</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link to='/matchup' class='nav-link text-primary'>Matchups</router-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item>
                        <router-link to="/contribute" class='nav-link'>Contribute</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/about" class='nav-link'>About</router-link>
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class='ml-auto'>
                    <b-button id='api-link' href="https://api.collegefootballdata.com" target="_blank">
                        API
                    </b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                docs: {}
            }
        },
        created() {
            let self = this;
            this.$axios.get('/api-docs.json').then((response) => {
                self.docs = response.data;
            });
        }
    }

</script>

<style lang="scss">
    .brand-image {
        height: 30px;
        width: 30px;
    }

    #api-link {
        background-color: #38b0ff;
    }

</style>
