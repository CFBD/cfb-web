<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="primary">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand>CollegeFootballData.com</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link to="/" class='nav-link'>Home</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/about" class='nav-link'>About</router-link>
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class='ml-auto'>
                    <b-button href="https://api.collegefootballdata.com" target="_blank">
                        API
                    </b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {

}
</script>
