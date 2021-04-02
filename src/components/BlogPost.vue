<template>
    <b-col md='4'>
        <b-card :title="post.title" :sub-title="post.subtitle" :img-src="`${post.img}?image=25`" :img-alt="post.title" img-top
            tag="article">
            <b-button :href="post.href" target="_blank" variant="primary">Read more</b-button>
        </b-card>
    </b-col>
</template>

<script>
    export default {
        props: {
            post: Object
        }
    }

</script>

<style>

</style>
