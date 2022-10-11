<template>
  <div>
    <!-- <input type="search" name="" id="" @keyup="checkEnter($event)" v-model="searchText" /> -->
    <input type="search" name="" id="" @keyup.enter="doSearch" v-model="searchText" />
    <button @click="doSearch">search</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchText: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    doSearch() {
      console.log(this.searchText)
    },
    checkEnter(event) {
      if (event.keyCode === 13) {
        this.doSearch()
      }
    }
  }
}
</script>
