<template lang="pug">
  form(action='' method='' autcomplete='off' class='grid__header--form')
    i.grid__header--form--icon.fas.fa-search
    input(type='search' name='searchsomething' @input='searchBy()' v-model='query' placeholder='Search by tag items, assigned to or created date' class='grid__header--form--search')
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
        bus.$emit('search', this.query);
      }
    },
  }
</script>
