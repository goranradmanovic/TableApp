<template lang="pug">
  .grid__content--container

    //-Page modal window
    .grid__content--container--modal(ref='modal')
      .grid__content--container--modal--box
        .grid__content--container--modal--box--header
          .grid__content--container--modal--box--header--title Delete Tag
          .grid__content--container--modal--box--header--close
            i.fas.fa-times(@click='toggleModal()')

        .grid__content--container--modal--box--content
          p.grid__content--container--modal--box--content--text Are you shure you want to
            strong delete this tag?

        .grid__content--container--modal--box--footer
          button.grid__content--container--modal--box--footer--btn.close(@click='toggleModal()') Cancel
          button.grid__content--container--modal--box--footer--btn.delete(@click='deleteMultipleTableRows(selected), toggleModal()') Delete

    .grid__content--container--delete
      button.grid__content--container--delete--btn(@click='toggleModal()' :disabled='!deleteBtnDisabled || isDataEmpty') Delete

    //- Page Table
    table.grid__content--container--table#grid-template
      colgroup.grid__content--container--table--colgroup
        col(v-for='item in cols' :id='"col-" + item')

      thead.grid__content--container--table--thead
        tr.grid__content--container--table--thead--tr
          th.grid__content--container--table--thead--tr--th
            input(type='checkbox' @click='selectAllRows' v-model='allSelected' id='allSelectedRows' class='grid__content--container--table--thead--tr--checkbox' :disabled='isDataEmpty')
            label(for='allSelectedRows' class='grid__content--container--table--thead--tr--label')

          th(v-for='item in tableHeaders' :key='item.id' class='grid__content--container--table--thead--tr--th') {{ item.label }}
            i.grid__content--container--table--thead--tr--th--sorticon(v-if='item.sortable' @click='sortedByDate()' :class='{desc: currentSortDir == "desc", asc: currentSortDir == "asc"}')

      tbody.grid__content--container--table--tbody
        tr.grid__content--container--table--tbody--tr(v-if='isDataEmpty')
          td(class='grid__content--container--table--tbody--tr--td--nodata' colspan='10') There is no data

        tr.grid__content--container--table--tbody--tr(v-for='(itemRow, index) in paginate' :key='itemRow.id' :class='{highlighted: selectedOne}' :id='itemRow.id')
          td.grid__content--container--table--tbody--tr--td
            input(type='checkbox' :id='"checkbox-" + index' :value='itemRow.id' @click='select($event)' v-model='selected' class='grid__content--container--table--tbody--tr--td--checkbox')
            label(:for='"checkbox-" + index' class='grid__content--container--table--tbody--tr--td--label')

          td.grid__content--container--table--tbody--tr--td
            .grid__content--container--table--dropdown
              span.grid__content--container--table--dropdown--circle(ref='dropdownCircle' :style='{backgroundColor: currentCircleColor[itemRow.id]}')
              i.fas.fa-chevron-down.grid__content--container--table--dropdown--icon(ref='tableDropdownIcon' @click='toggleColorDropdown($event)')

              .grid__content--container--table--dropdown--content(ref='tableColorDropdown' :id='itemRow.id')
                p.grid__content--container--table--dropdown--content--text Tag Color
                .grid__content--container--table--dropdown--content--colorwrapper(v-for='(item, i) in itemRow.colors')
                  button.grid__content--container--table--dropdown--content--colorwrapper--circlebtn(:id='"radioBtn-" + itemRow.id + "-" + i' v-model='selectedColor' :value='item.hex' @click='removeSelectedClass($event), selectColor($event)' :data-ischecked='item.selected' :data-parentid='itemRow.id' :style='{backgroundColor: item.hex, color: item.hex}' :class='{selected: item.selected}')

          td.grid__content--container--table--tbody--tr--td
            .grid__content--container--table--tbody--tr--td--tagname(:style='{backgroundColor: currentCircleColor[itemRow.id]}') {{ itemRow.tag_name }}
          td.grid__content--container--table--tbody--tr--td(:class='itemRow.tag_items == "No Emails" ? "light-text" : "strong-text"') {{ itemRow.tag_items }}
          td.grid__content--container--table--tbody--tr--td(:title='itemRow.assigned_to' :class='itemRow.assigned_to == "Not Set" ? "light-text" : "strong-text"') {{ formatName(itemRow.assigned_to) }}
          td.grid__content--container--table--tbody--tr--td(:class='itemRow.expunge_date == "Not Set" ? "light-text" : "strong-text"') {{ itemRow.expunge_date }}
          td.grid__content--container--table--tbody--tr--td(:class='itemRow.options == "Not Set" ? "light-text" : "strong-text"') {{ itemRow.options }}
          td.grid__content--container--table--tbody--tr--td {{ formatDate(itemRow.date_created) }}
          td.grid__content--container--table--tbody--tr--td(:title='itemRow.created_by') {{ formatName(itemRow.created_by) }}
          td.grid__content--container--table--tbody--tr--td
            button.grid__content--container--table--tbody--tr--td--delete(@click='toggleModal(), getItemId($event)' disabled='true' :data-itemid='itemRow.id') Delete

    //- Start of table paginataion and selection per row
    .grid__content--container--pagination
      .grid__content--container--pagination--dropdown
        .grid__content--container--pagination--dropdown--box
          .grid__content--container--pagination--dropdown--box--text Items per page&nbsp;
            span.grid__content--container--pagination--dropdown--box--text--active {{ itemsPerPage }}&nbsp;
              i.fas.fa-chevron-down.grid__content--container--pagination--dropdown--box--text--active--icon(@click='togglePerPageDropdown()' ref='perPageDropdownIcon')

          .grid__content--container--pagination--dropdown--box--content(ref='perPageDropdown')
            ul.grid__content--container--pagination--dropdown--box--content--list
              li.grid__content--container--pagination--dropdown--box--content--list--item(v-for='(item, index) in selectPerPage' :key='index' @click='setItemsPage(item), togglePerPageDropdown()') {{ item }}

      .grid__content--container--pagination--controls
        button.grid__content--container--pagination--controls--arrow(@click='currentPage = 1' :disabled='currentPage == 1' title='First Page')
          i.fas.fa-angle-double-left
        button.grid__content--container--pagination--controls--arrow(@click='currentPage--' :disabled='currentPage == 1' :class='{disabled: currentPage == 1}' title='Previus')
          i.fas.fa-chevron-left

        span.grid__content--container--pagination--controls--text
          span.grid__content--container--pagination--controls--text--active {{ currentPage }}&nbsp;
          | of {{ totalPages }}

        button.grid__content--container--pagination--controls--arrow(@click='currentPage++' :disabled='currentPage >= totalPages' :class='{disabled: currentPage >= totalPages}' title='Next')
          i.fas.fa-chevron-right
        button.grid__content--container--pagination--controls--arrow(@click='currentPage = totalPages' title='Last Page' :disabled='currentPage == totalPages')
          i.fas.fa-angle-double-right
</template>

<script>
  export default {
    name: 'Table',

    data() {
      return {
        currentPage: 1,
        itemsPerPage: 10,
        resultCount: 0,
        selectPerPage: [5, 10, 20, 30, 40, 50],
        cols: [1, 2, 3, 4, 5, 6, 7, 9, 10],
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        currentSortDir: 'desc',
        selected: [],
        allSelected: false,
        selectedOne: false,
        deleteBtnDisabled: false,
        selectedColor: null,
        singleItemId: null,
        currentCircleColor: [],

        //Data
        items: [
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
      }
    },
    methods: {

      setItemsPage(itemsNumber) {
          this.itemsPerPage = itemsNumber; //Current page number
      },

      setPage(pageNumber) {
          this.currentPage = pageNumber; //Current page number
      },

      sortType() {
        //Set current type of sorting (desc/asc)
        this.currentSortDir = this.currentSortDir === 'desc' ? 'asc' : 'desc';
      },

      formatDate(timestamp) {
          //Format date for table cell
          let date = new Date(timestamp);
          return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      },

      //Format user name
      formatName(name) {
        if (name !== 'Not Set') {
          let splitedName = name.split(' ');
          return `${splitedName[0]} ${splitedName[1].charAt(0)}`;
        }

        return name;
      },

      //Sorting data by date/time
      sortedByDate() {

        //If there is only one row in table
        if (this.itemsPerPage == 1) return;

        //Set order type (desc/asc)
        this.sortType();

        //Loop over paginated results on current page and sort them by creation date (asc/desc)
        return this.paginate.sort((a, b) => {

          let modifier = 1;
          if (this.currentSortDir === 'desc') modifier = -1;

          if (a.date_created < b.date_created) return -1 * modifier;
          if (a.date_created > b.date_created) return 1 * modifier;
          return 0;
        });
      },

      //Function for sellecting all table rows
      selectAllRows() {
          this.selected = []; //Clear array

          //Highlighted all rows
          //this.deleteBtnDisabled = !this.allSelected;
          this.selectedOne = !this.allSelected;
          let tableRows = document.querySelectorAll('table > tbody > tr');

          //Check if table row has 'highlighted' class when all rows are selected and one row is unselected manualy
          tableRows.forEach(tableRow => {
            if (!tableRow.classList.contains('highlighted')) {
              tableRow.classList.add('highlighted');
            }
          })

          //Select all checkboxs
          if (!this.allSelected) {
            this.deleteBtnDisabled = true;
            this.items.forEach(item => this.selected.push(item.id))
          } else {
            this.deleteBtnDisabled = false;
          }
      },

      //Function for selection current row by clicking on the row checkbox
      select(event) {

        if (event.target.checked) {
          this.deleteBtnDisabled = true;
          event.target.parentNode.parentNode.cells[9].children[0].disabled = false; //Current Delete button in the current table row
          event.target.parentElement.parentElement.classList.add('highlighted');
        } else if (!event.target.checked) {
          this.deleteBtnDisabled = false;
          event.target.parentNode.parentNode.cells[9].children[0].disabled = true; //Current Delete button in the current table row
          event.target.parentElement.parentElement.classList.remove('highlighted');
        }

        this.allSelected = false; //Set all select to false
      },

      //Delete single table row
      deleteTableRow(id) {
        this.items = this.items.filter(obj => obj.id != id); //Delete single table row
      },

      //Delete multiple table rows
      deleteMultipleTableRows(ids) {
        ids.forEach(id => this.deleteTableRow(id)); //Delete multiple table rows
        this.deleteBtnDisabled = false;
      },

      //Toggle modal window open/close
      toggleModal() {
        this.$refs.modal.classList.toggle('open');
      },

      //Get item id
      getItemId(event) {
        this.singleItemId = event.target.dataset.itemid;
      },

      //Toggle perpage dropdown window open/close
      togglePerPageDropdown() {
        this.$refs.perPageDropdown.classList.toggle('open');
        this.$refs.perPageDropdownIcon.classList.toggle('fa-chevron-up');
      },

      //Toggle color dropdown window open/close
      toggleColorDropdown(event) {
        event.target.classList.toggle('fa-chevron-up');
        event.target.parentElement.children[2].classList.toggle('open');
      },

      //Set color on color column on page load
      setColor() {
        this.items.forEach(item => {
          item.colors.forEach(itemcolor => {
            if (itemcolor.selected) {
              this.currentCircleColor.push(itemcolor.hex);
            }
          });
        });
      },

      //Select color from color dropdown and set color to color column and tag name column
      selectColor(event) {

        let parentid = event.target.dataset.parentid,
            selectedColor = event.target.value;

        event.target.classList.add('selected');

        this.selectedColor = selectedColor;
        this.currentCircleColor[parentid] = selectedColor;
      },

      //Function for romving selected class from circle color button
      removeSelectedClass(event) {
        let colorWrappers = event.target.parentElement.parentElement.children;

        for (let i = 1; i < colorWrappers.length; i++) {
          if (colorWrappers[i].children[0].classList.contains('selected')) {
            colorWrappers[i].children[0].classList.remove('selected');
          }
        }
      },
    },

    mounted() {
      this.setColor();
    },

    computed: {
      //Calculate total page fro pagination
      totalPages() {
          return Math.ceil(this.resultCount / this.itemsPerPage); //Get total pages for pagination
      },

      //Paginate page data
      paginate() {
        //Check if items array is empty
        if (!this.items || this.items.length == 0) {
            return;
        }

        this.resultCount = this.items.length;

        if (this.currentPage >= this.totalPages) {
          this.currentPage = this.totalPages
        }

        let index = this.currentPage * this.itemsPerPage - this.itemsPerPage;

        //Slice the items array
        return this.items.slice(index, index + this.itemsPerPage);
      },

      isDataEmpty() {

        if (this.items.length == 0) {
          this.resultCount = 1;
          this.allSelected = false;
          return true;
        }

        return false;
      },

      //Function for getting table header fields from vuex store
      tableHeaders() {
        return this.$store.state.tableHeadFields;
      }
    }
  }
</script>
