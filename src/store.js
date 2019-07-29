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

    tabledata: [
      { id: 0, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: true},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Review', tag_items: '18 Emails', assigned_to: 'Mario Speedwagon', expunge_date: 'Nov 22, 2020', options: 'Not Set', date_created: 1499776147000, created_by: 'Mario Speedwagon'},

      { id: 1, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: true},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Assigned', tag_items: '2 Emails', assigned_to: 'Anna Sthesia', expunge_date: 'Not Set', options: 'Notifies', date_created: 1455542947000, created_by: 'Anna Sthesia'},

      { id: 2, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: true},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Something', tag_items: 'No Emails', assigned_to: 'Brock Lee', expunge_date: 'Not Set', options: 'Notifies', date_created: 1527251347000, created_by: 'Brock Lee'},

      { id: 3, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: true},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Legal', tag_items: '6 Emails', assigned_to: 'Terry Aki', expunge_date: 'Not Set', options: 'Notifies', date_created: 1563625747000, created_by: 'Terry Aki'},

      { id: 4, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: true}
      ], tag_name: 'Custom Tag', tag_items: '10 Emails', assigned_to: 'Pete Sariya', expunge_date: 'Indefinitely', options: '5 Rules', date_created: 1421846947000, created_by: 'Pete Sariya'},

      { id: 5, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: true},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Legal', tag_items: 'No Emails', assigned_to: 'Not Set', expunge_date: 'Sep 9, 2026', options: 'Notifies', date_created: 1559392147000, created_by: 'Barry Wine'},

      { id: 6, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: true},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Review', tag_items: '20 Emails', assigned_to: 'Zack Lee', expunge_date: 'Not Set', options: 'Notifies', date_created: 1410438547000, created_by: 'Zack Lee'},

      { id: 7, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: true},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Something', tag_items: '1 Emails', assigned_to: 'Not Set', expunge_date: 'Indefinitely', options: '4 Rules', date_created: 1525091347000, created_by: 'Peter Pants'},

      { id: 8, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: true},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Legal', tag_items: '50 Emails', assigned_to: 'Moe Fugga', expunge_date: 'Apr 10, 2024', options: '1 Rules', date_created: 1531395721000, created_by: 'Moe Fugga'},

      { id: 9, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: true},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Legal', tag_items: 'No Emails', assigned_to: 'Not Set', expunge_date: 'Apr 10, 2020', options: '4 Rules', date_created: 1444304521000, created_by: 'Wilma Mumduya'},

      { id: 10, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: true},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Something', tag_items: '5 Emails', assigned_to: 'Otto Matic', expunge_date: 'Mar 30, 2025', options: '5 Rules', date_created: 1546951321000, created_by: 'Otto Matic'},

      { id: 11, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: true}
      ], tag_name: 'Legal', tag_items: '25 Emails', assigned_to: 'Not Set', expunge_date: 'Feb 20, 2030', options: 'Notifies', date_created: 1563096959000, created_by: 'Hugh Briss'},

      { id: 12, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: true},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Review', tag_items: 'No Emails', assigned_to: 'Hans Olo', expunge_date: 'Sep 19, 2020', options: 'Notifies', date_created: 1555234559000, created_by: 'Hans Olo'},

      { id: 13, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: true},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Legal', tag_items: '10 Emails', assigned_to: 'Not Set', expunge_date: 'Mar 20, 2022', options: '4 Rules', date_created: 1560936959000, created_by: 'Tom Atoe'},

      { id: 14, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: true},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Something', tag_items: 'Not Set', assigned_to: 'Serj Protector', expunge_date: 'Mar 20, 2025', options: '7 Rules', date_created: 1560936959000, created_by: 'Serj Protector'},

      { id: 15, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: true}
      ], tag_name: 'Legal', tag_items: '2 Emails', assigned_to: 'Not Set', expunge_date: 'Mar 20, 2021', options: 'Not Set', date_created: 1294655759000, created_by: 'Tom Atoe'},

      { id: 16, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: true},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Review', tag_items: 'No Emails', assigned_to: 'Warren Peace', expunge_date: 'Mar 20, 2028', options: 'Notifies', date_created: 1294655759000, created_by: 'Warren Peace'},

      { id: 17, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: true},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Something', tag_items: '4 Emails', assigned_to: 'Chris P. Bacon', expunge_date: 'Not Set', options: 'Not Set', date_created: 1499679359000, created_by: 'Chris P. Bacon'},

      { id: 18, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: true},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Review', tag_items: '14 Emails', assigned_to: 'Ken Tucky', expunge_date: 'Indefinitely', options: 'Not Set', date_created: 1528796159000, created_by: 'Ken Tucky'},

      { id: 19, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: true}
      ], tag_name: 'Legal', tag_items: '2 Emails', assigned_to: 'Matt Uhrafact', expunge_date: 'Apr 22, 2026', options: 'Not Set', date_created: 1563183359000, created_by: 'Matt Uhrafact'},

      { id: 20, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: true},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Review', tag_items: '15 Emails', assigned_to: 'Mario Speedwagon', expunge_date: 'Nov 22, 2021', options: 'Not Set', date_created: 1499776147000, created_by: 'Mario Speedwagon'},

      { id: 21, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: true},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Assigned', tag_items: '22 Emails', assigned_to: 'Anna Sthesia', expunge_date: 'Not Set', options: 'Notifies', date_created: 1455542947000, created_by: 'Anna Sthesia'},

      { id: 22, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: true},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Something', tag_items: 'No Emails', assigned_to: 'Brock Lee', expunge_date: 'Not Set', options: '3 Rules', date_created: 1527251347000, created_by: 'Brock Lee'},

      { id: 23, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: true},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Legal', tag_items: 'No Emails', assigned_to: 'Terry Aki', expunge_date: 'Not Set', options: 'Notifies', date_created: 1563625747000, created_by: 'Terry Aki'},

      { id: 24, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: true}
      ], tag_name: 'Custom Tag', tag_items: '100 Emails', assigned_to: 'Pete Sariya', expunge_date: 'Indefinitely', options: '5 Rules', date_created: 1421846947000, created_by: 'Pete Sariya'},

      { id: 25, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: true},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Legal', tag_items: 'No Emails', assigned_to: 'Not Set', expunge_date: 'Sep 9, 2026', options: 'Notifies', date_created: 1559392147000, created_by: 'Barry Wine'},

      { id: 26, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: true},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Review', tag_items: '120 Emails', assigned_to: 'Zack Lee', expunge_date: 'Not Set', options: 'Notifies', date_created: 1410438547000, created_by: 'Zack Lee'},

      { id: 27, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: true},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Something', tag_items: '1 Emails', assigned_to: 'Not Set', expunge_date: 'Indefinitely', options: '14 Rules', date_created: 1525091347000, created_by: 'Peter Pants'},

      { id: 28, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: false},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: true},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Legal', tag_items: '50 Emails', assigned_to: 'Moe Fugga', expunge_date: 'Apr 10, 2027', options: '10 Rules', date_created: 1531395721000, created_by: 'Moe Fugga'},

      { id: 29, checked: false, colors: [
        {name: 'red', hex: '#CF202E', selected: true},
        {name: 'darkred', hex: '#A41E36', selected: false},
        {name: 'azure', hex: '#67C8C7', selected: false},
        {name: 'green', hex: '#00A88D', selected: false},
        {name: 'darkgreen', hex: '#006F63', selected: false},
        {name: 'lightgreen', hex: '#C1D42F', selected: false},
        {name: 'blue', hex: '#3DBCE7', selected: false},
        {name: 'orange', hex: '#FC9543', selected: false},
        {name: 'yellow', hex: '#FFE105', selected: false},
        {name: 'black', hex: '#000000', selected: false}
      ], tag_name: 'Legal', tag_items: 'No Emails', assigned_to: 'Not Set', expunge_date: 'Apr 10, 2035', options: '44 Rules', date_created: 1444304521000, created_by: 'Wilma Mumduya'},
    ],
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    tableData: state => {
      return state.tabledata;
    }
  }
})
