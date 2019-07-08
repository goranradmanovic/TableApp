<template lang="pug">
  #app.grid
    header(class='grid__header')
      Search

    aside(class='grid__aside')
      Aside

    section(class='grid__content')
      //-router-view
      Table

    footer(class='grid__footer')
      Footer
</template>

<script>
  import Search from '@/components/Search.vue';
  import Aside from '@/components/Aside.vue';
  import Table from '@/components/Table.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    name: 'app',
    components: {
      Search, Aside, Table, Footer
    }
  }
</script>

<style lang="sass">
  #app
</style>
