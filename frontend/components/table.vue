<template>
  <table class="table">
    <slot></slot>
    <slot name="head"></slot>
    <slot name="body" :values="sortedValues"></slot>
    <slot name="foot"></slot>
  </table>
</template>

<script>
// Taken from https://github.com/BernhardtD/vue-sorted-table/blob/master/src/components/SortedTable.vue
export default {
  name: 'SortedTable',
  props: {
    values: {
      type: Array,
      required: true,
      default: null
    },
    dir: {
      type: String,
      default: 'asc'
    },
    sort: {
      type: String,
      default: 'id'
    },
    ascIcon: {
      type: String,
      default: ''
    },
    descIcon: {
      type: String,
      default: ''
    },
    onSort: {
      type: null,
      default: null
    }
  },
  data() {
    return {
      currentDir: this.dir,
      currentSort: this.sort
    }
  },
  computed: {
    get() {
      if (this.$_) {
        return this.$_.get
      } else {
        return this.getValue
      }
    },
    sortedValues() {
      if (this.onSort) {
        return this.values
      } else {
        return this.values.slice().sort(
          function(a, b) {
            let modifier = 1
            if (this.currentDir === 'desc') {
              modifier = -1
            }
            if (this.get(a, this.currentSort) < this.get(b, this.currentSort)) {
              return -1 * modifier
            }
            if (this.get(a, this.currentSort) > this.get(b, this.currentSort)) {
              return 1 * modifier
            }
            return 0
          }.bind(this)
        )
      }
    },
    asc() {
      if (this.ascIcon === '') {
        return this.$sortedTable.ascIcon
      } else {
        return this.ascIcon
      }
    },
    desc() {
      if (this.descIcon === '') {
        return this.$sortedTable.descIcon
      } else {
        return this.descIcon
      }
    }
  },
  methods: {
    getValue(array, key) {
      return array[key]
    },
    getCurrentSort() {
      return this.currentSort
    },
    getSortIcon() {
      if (this.currentDir === 'asc') {
        return this.asc
      } else {
        return this.desc
      }
    },
    sortBy(s) {
      // if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentDir = this.currentDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
      this.$emit('sort-table', this.currentSort, this.currentDir)
      if (this.onSort) {
        this.onSort(this.currentSort, this.currentDir)
      }
    }
  }
}
</script>