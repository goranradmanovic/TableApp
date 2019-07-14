<template lang="pug">
  nav.grid__aside--container--nav
      router-link.grid__aside--container--nav--link(v-for='navigationLink in navigationLinks' :key='navigationLink.name' :to='navigationLink.path' :class='navigationLink.default_active' @click.native='toggleAsideMenu()') {{ navigationLink.name }}
</template>

<script>
  export default {
    name: 'Navigation',
    data() {
      return {

      }
    },

    methods: {
      removeActiveLinkClass() {
        let navLinks = document.querySelectorAll('.grid__aside--container--nav--link'),
            defaultActiveNavLink = document.querySelector('.grid__aside--container--nav--link.active');

        //Remove default active class from the link on click on inactive link
        navLinks.forEach(item => {
          item.addEventListener('click', () => {
            defaultActiveNavLink.classList.remove('active');
          });
        });
      },

      toggleAsideMenu() {
        let asideMenu = document.querySelector('.grid__aside'),
            hamburgerMenuBtn = document.querySelector('.grid__header--barsbtn');

        asideMenu.classList.toggle('open');
        hamburgerMenuBtn.classList.toggle('fa-times');
      }
    },

    computed: {
      navigationLinks() {
        return this.$store.state.navLinks; //Return navigation links from store
      }
    },

    mounted() {
      this.removeActiveLinkClass();
    }
  }
</script>
