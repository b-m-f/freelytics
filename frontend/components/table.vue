<template>
  <table class="table">
    <thead class>
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          scope="col"
          class="text-xl"
          style="text-align: left; width: 10rem;"
        >
          <a :name="col.key">{{col.display}}</a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="value in values" :key="value[value.key]" class="border">
        <td v-for="col in columns" :key="col.key" class="pl-6">{{ value[col.key]}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  /**
   * Value should be
   * {
   *  id: 2,
   *  name: '123'
   * }
   *
   * Columns should be :
   *[
   *  {
   *     key: id,
   *     display: "ID"
   *  },
   *  {
   *     key: name,
   *     display: "Name"
   *  }
   *]
   */
  props: {
    values: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    get() {
      return this.getValue
    },
    methods: {
      getValue(array, key) {
        return array[key]
      },
      getSortIcon() {
        if (this.currentDirection === 'ascending') {
          return '▲'
        } else {
          return '▼'
        }
      }
    }
  }
}
</script>