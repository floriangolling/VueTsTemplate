<template lang="pug">
    .box
        article.media
            .media-content
                .content
                    .control
                        p(style="align-items:baseline;font-weight:500") Anonyme:
                            input.checkbox(type="checkbox" v-model="checkbox")
                        input.input(type="text" placeholder="Titre.." v-model="title" style="margin-right:2%")
                        input.input(type="text" placeholder="Utilisateur" :disabled="checkbox" v-model="user")
                        textarea.textarea(v-model="text" class="has-fixed-size")
                        input.button(type="button" value="Ajouter" v-on:click="addIdea()")
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
    name: "adder",
    methods: {
        async addIdea() {
            try {
                if (this.title === "" || this.text === "" || (this.user === "" && this.checkbox === false)) {
                    this.$alert("Des champs ne sont pas remplis")
                    return;
                }
                let obj = await this.$store.dispatch('addIdea');
                await this.$root.$emit('ideaAdded', obj.data)
                this.$alert("Idée bien proposée !")
                this.title = "";
                this.user = "";
                this.checkbox = false;
                this.text = "";
            } catch (err) {
                console.log(err);
            }
        }
    },
    computed: {
        title: {
            get() {
                return this.$store.state.title
            },
            set(value) {
                return this.$store.commit('updateTitle', value);
            }
        },
        user: {
            get() {
                return this.$store.state.user
            },
            set(value) {
                return this.$store.commit('updateUser', value);
            }
        },
        text: {
            get() {
                return this.$store.state.text
            },
            set(value) {
                return this.$store.commit('updateText', value);
            }
        },
        checkbox: {
            get() {
                return this.$store.state.check
            },
            set(value) {
                return this.$store.commit('updateCheck', value);
            }
        }
    }
});

</script>

<style lang="scss">

body {
    .container {
        max-width: 1100px;
    }
    .input {
        max-width:200px;
    }
    .checkbox {
        width: 20px;
    }
    .textarea {
        margin-top: 10px;
    }
    .button {
        margin-top: 10px;
        transition: color 1s, background-color 1s;
    }
    .button:hover {
        color: white;
        background-color: rgb(46, 46, 46);
    }
}
</style>