<template lang="pug">
  div
    section.masthead(style="margin-bottom:20px")
      .title-reymann Reymann Communication CSE
    div(class="container")
      adder
      section.level.level-right
        button(v-on:click="filterByDate()")
          span(style="width:100%")
            i(class="fas fa-sort-numeric-up-alt" id="date")
          p trier par date
        button(v-on:click="filterByLike()")
          span(style="widht:100%")
            i(class="fas fa-sort-numeric-up-alt" id="like")
          p trier par like(s)
      posts(v-for="item in ideas" :idea="item" :key="item.id")
</template>

<script lang="ts">

import Vue from 'vue';
import Posts from '../../components/Posts.vue'
import Adder from '../../components/Adder.vue'
import axios from 'axios'
import { store } from './store';
import Iidea from '../../../src/interfaces/interfaces'

export default Vue.extend({
  store: store,
  name: 'app',
  components: {
    Posts,
    Adder
  },
  data () {
    return {
      ideas: [] as Iidea[],
      dateCall: 0,
      likeCall: 0
    }
  },
  methods: {
    async filterByDate() {
      let obj = this.ideas;

      if (this.dateCall === 0) {
        obj.sort(compareDate);
        this.dateCall = 1;
      } else if (this.dateCall === 1) {
        obj.sort(compareDateReverse)
        this.dateCall = 0;
      }
      this.ideas = obj;
      },
      async filterByLike() {
        let obj = this.ideas

        if (this.likeCall === 0) {
          obj.sort(compareLike);
          this.likeCall = 1;
        } else if (this.likeCall === 1) {
          obj.sort(compareLikeReverse)
          this.likeCall = 0;
        }
        this.ideas = obj;
    },
  },
  mounted: async function() {
    try {
      let {data: ideas} = await axios.get('api/ideas/')
      for (let idea of ideas) {
        idea.createdAt = convertDate(idea.createdAt);
      }
      this.ideas = ideas;
    } catch (err) {
      console.log(err);
    }
    this.$root.$on('ideaAdded', async(idea: Iidea) => {
      let objs: Iidea[];
      objs = this.ideas;
      idea.createdAt = convertDate(idea.createdAt as Date);
      objs.push(idea);
      objs = swap(objs);
      this.ideas = objs;
    })
  },
})

function convertDate(inputFormat: Date) {
  function pad(s : number) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}

function compareDate(a: Iidea, b: Iidea) {
  if (a.createdAt > b.createdAt) {
    return (-1);
  } else if (a.createdAt < b.createdAt) {
    return (1);
  } else {
    return (0);
  }
}

function compareDateReverse(a: Iidea, b: Iidea) {

  if (a.createdAt > b.createdAt) {
    return (1);
  } else if (a.createdAt < b.createdAt) {
    return (-1);
  } else {
    return (0);
  }
}

function compareLike(a: Iidea, b: Iidea) {
  if (a.like > b.like)
    return (1);
  else if (a.like < b.like) {
    return (-1);
  } else {
    return (0);
  }
}

function compareLikeReverse(a: Iidea, b: Iidea) {
  if (a.like > b.like)
    return (-1);
  else if (a.like < b.like) {
    return (1);
  } else {
    return (0);
  }
}

function swap(arra: Iidea[]) {
    [arra[0], arra[arra.length - 1]] = [arra[arra.length - 1], arra[0]];
    return arra;
}

</script>

<style lang="scss" scoped>

body {
  button {
    border: none;
    background: none;
    transition: color 1s;
  }
  button:focus {
    outline: none;
  }
  svg:hover {
    color: gray;
  }
  svg {
    font-size: 17px;
  }
  button:hover {
    color: gray;
  }
  .masthead {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    overflow: hidden;
    width: 100%;
    height: 40vh;
    background: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 37%, rgba(0,0,0,0.65) 100%), url("/assets/wallpaper.jpg")
  }
  .title-reymann {
    font-weight:800;
    font-size:45px;
    color:white;
    font-family: 'Noto Sans JP', sans-serif;
  }
}

</style>
