import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        text: "",
        title: "",
        user: "",
        check: false
    },
    mutations: {
        updateText (state, text) {
            state.text = text
        },
        updateTitle (state, title) {
            state.title = title;
        },
        updateUser (state, user) {
            state.user = user;
        },
        updateCheck (state, check) {
            state.check = check;
        }
    },
    actions: {
        addIdea: async function () {
            try {
                let user = this.state.user;
                if (this.state.check === true) {
                    user = "Anonyme"
                }
                let obj = await axios.post('/api/ideas/', {
                    text: this.state.text,
                    user: user,
                    title: this.state.title,
                });
                return (obj);
            } catch (err) {
                console.log(err);
            }
        }
    },
    getters: {
        getText: state => {
            return state.text
        },
        getUser: state => {
            return state.user
        },
        getTitle: state => {
            return state.title
        },
        getCheck: state => {
            return state.check
        }
    }
});