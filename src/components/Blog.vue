<template>
    <div id='blog-box'>
        <b-row class='mt-4 mb-4'>
            <blog-post v-for="post in posts" :key="post.url" :post="post" />
        </b-row>
    </div>
</template>

<script>
import BlogPost from './BlogPost.vue';

export default {
    components: {
        BlogPost
    },
    data() {
        return {
            posts: []
        };
    },
    created() {
        const api = new GhostContentAPI({
            url: 'https://blog.collegefootballdata.com',
            key: '027d8b9823dfc75ab0c1b9c2ca',
            version: 'v2'
        });
        api.posts
            .browse({
                limit: 6,
                include: 'tags'
            })
            .then((posts) => {
                this.posts = posts.map(post => ({
                    title: post.title,
                    subtitle: post.custom_excerpt,
                    href: post.url,
                    img: post.feature_image
                }));
            });
    }
};

</script>

<style lang='scss'>
#blog-box {
    padding: 2em;
}
</style>
