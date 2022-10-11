<template>
  <div>
    <input type="text" name="" id="" v-bind:value="userId" readonly />
    <input type="text" name="" id="" :value="userId" readonly />
    <br />
    <img :src="imgSrc" alt="" style="width: 100px; height: auto" />
    <br />
    <input type="search" name="" id="" v-model="txt1" />
    <button :disabled="txt1 === ''">search</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userId: 'boram.choi',
      imgSrc: 'https://i.pinimg.com/564x/16/17/a1/1617a16123f566842b096873ecd6c75f.jpg',
      txt1: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
