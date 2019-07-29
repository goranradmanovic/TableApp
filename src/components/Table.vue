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
  import { bus } from '../main'

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
        querySearch: null,

        //Data
        items: []
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

      //Function for setting table data items from store
      setItems() {
        this.items = this.tableData;
      },

      //Function for searching table data
      searchTableData() {
        return this.items = this.items.filter(item => {
          //Search table data bay columns strings
          if (item.tag_items.indexOf(this.querySearch) > -1 || item.assigned_to.indexOf(this.querySearch) > -1 || this.formatDate(item.date_created).indexOf(this.querySearch) > -1) {
            return item;
          }
        });
      }
    },

    mounted() {
      this.setItems();
      this.setColor();
    },

    created() {
      //Listening for bus event
      bus.$on('search', data => {
        this.querySearch = data;
      });
    },

    computed: {
      //Getting tble data from store
      tableData() {
        return this.$store.getters.tableData;
      },

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

        //If there is some query string then search table data array, other wise set table data to initial array
        this.querySearch ? this.searchTableData() : this.items = this.tableData;

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
