<template lang="pug">
  form(action='' method='' autcomplete='off' class='grid__header--form')
    i.grid__header--form--icon.fas.fa-search
    input(type='search' name='searchsomething' @input='searchBy()' v-model='query' placeholder='Search by tag items, assigned to or created date' title='Enter two or more characters' class='grid__header--form--search')
</template>

<script>
  import { bus } from '../main'

  export default {
    name: 'Search',
    data() {
      return {
        query: null
      }
    },
    methods: {
      searchBy() {
        if (this.query.length >= 2) {
          bus.$emit('search', this.query);
        } else if (this.query.length == 0) {
          bus.$emit('search', this.query);
        }
      }
    },
  }
</script>
