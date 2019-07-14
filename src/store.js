import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navLinks: [
      {
        name: 'Dashboard',
        path: '#1',
        default_active: ''
      },
      {
        name: 'Search',
        path: '#2',
        default_active: ''
      },
      {
        name: 'Saved Searches',
        path: '#3',
        default_active: ''
      },
      {
        name: 'Clipboard',
        path: '#4',
        default_active: ''
      },
      {
        name: 'Reacent Searches',
        path: '#5',
        default_active: ''
      },
      {
        name: 'Keywords',
        path: '#6',
        default_active: ''
      },
      {
        name: 'Tag Manager',
        path: '#7',
        default_active: 'active'
      },
      {
        name: 'Settings',
        path: '#8',
        default_active: ''
      },
    ],

    tableHeadFields: {
      color: {
        label: 'Color',
        sortable: false
      },
      tag_name: {
        label: 'Tag Name',
        sortable: false
      },
      tag_items: {
        label: 'Tag Items',
        sortable: false
      },
      assigned_to: {
        label: 'Assigned To',
        sortable: false
      },
      expunge_date: {
        label: 'Expunge Date',
        sortable: false
      },
      options: {
        label: 'Options',
        sortable: false
      },
      date_created: {
        label: 'Date Created',
        sortable: true
      },
      created_by: {
        label: 'Created By',
        sortable: false
      },
      actions: {
        label: 'Actions',
        sortable: false
      },
    },
  },
  mutations: {

  },
  actions: {

  },
  getters: {

  }
})
