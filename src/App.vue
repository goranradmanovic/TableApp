<template lang="pug">
  #app.grid
    header(class='grid__header')
      Search
      i.fas.fa-bars.grid__header--barsbtn(@click='toggleAsideMenu' ref='hamburgerMenuBtn')

    aside(class='grid__aside' ref='asideMenu')
      Aside

    section(class='grid__content')
      Table
</template>

<script>
  import Search from '@/components/Search.vue';
  import Aside from '@/components/Aside.vue';
  import Table from '@/components/Table.vue';

  export default {
    name: 'app',
    components: {
      Search, Aside, Table
    },

    methods: {

      toggleAsideMenu() {
        this.$refs.asideMenu.classList.toggle('open');
        this.$refs.hamburgerMenuBtn.classList.toggle('fa-times');
      },
    }
  }
</script>

<style lang="sass">
  #app
</style>
