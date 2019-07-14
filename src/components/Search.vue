<template lang="pug">
  form(action='' method='' autcomplete='off' class='grid__header--form')
    i.grid__header--form--icon.fas.fa-search
    input(type='search' name='searchsomething' placeholder='Search by keywords, user, date or action' class='grid__header--form--search')
</template>

<script>
  export default {
    name: 'Search'
  }
</script>
