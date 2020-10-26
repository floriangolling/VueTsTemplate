<template lang="pug">
    .box
        article.media
            .media-content
                .content
                    p
                    strong.user {{idea.user}}
                    small.time {{idea.createdAt}}
                    p.title {{idea.title}}
                    p.cut-text(v-bind:id="idea.id") {{idea.text}}
                    button(v-on:click="showMore()")
                        p.show {{ show }}
            .media-right
                .level-right(style="padding-bottom:10px")
                    p(style="padding-right:10px") {{idea.like}}
                    button(v-on:click="addLike(idea)")
                        span
                            i(class="fas fa-thumbs-up")
</template>

<script lang="ts">

import Vue from 'vue'
import axios from 'axios'
import Iidea from '../../src/interfaces/interfaces'

export default Vue.extend({
    name: "posts",
    props: {
        idea: Object as () => Iidea,
    },
    data() {
        return {
            show: "Afficher plus..",
        }
    },
    methods: {
        async addLike(idea: Iidea) {
            try {
                await axios.put('/api/ideas/' + idea.id, {
                    like: idea.like + 1
                })
                idea.like += 1;
            } catch (err) {
                console.log(err);
            }
        },
        async showMore() {
            if (this.show === "Afficher plus..") {
                document.getElementById(this.idea.id.toString())!.style.webkitLineClamp = "unset";
                this.show = "Afficher moins.."
            } else if (this.show === "Afficher moins..") {
                document.getElementById(this.idea.id.toString())!.style.webkitLineClamp = "2";
                this.show = "Afficher plus.."
            }
        }
    },
});

</script>

<style lang="scss" scoped>


body {
    .time {
        margin-left: 20px;
    }
    .cut-text {
        margin-top: 10px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
    }
    .level-right p {
        color: black;
    }
    .level-right {
        align-items: baseline;
    }
    .box {
        padding-bottom: 20px;
    }
    button {
        border-style: none;
        background-color: unset;
    }
    button:focus {
        border: none;
        box-shadow: none;
        outline: none;
    }
    svg {
        transition: color 0.2s;
    }
    svg:hover {
        color: gray;
    }
    .title {
        font-size: 24px;
    }
    .user {
        font-size: 17px;
        font-weight: 500;
    }
    .show {
        color: rgb(0, 0, 0);
    }
    .show:hover {
        text-decoration: underline;
    }
}

</style>