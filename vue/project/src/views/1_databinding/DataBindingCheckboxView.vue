<template>
  <div>
    <div>
      <input type="checkbox" name="" id="html" value="HTML" v-model="favoriteLang" />
      <label for="html">HTML</label>
    </div>
    <div>
      <input type="checkbox" name="" id="css" value="CSS" v-model="favoriteLang" />
      <label for="css">CSS</label>
    </div>
    <div>
      <input type="checkbox" name="" id="js" value="JS" v-model="favoriteLang" />
      <label for="js">JavaScript</label>
    </div>
    <!-- 체크박스를 하나의 그룹으로 묶으려면 name 값 통일해야 함. vue에서는 name 필요 없음 -->
    <div>선택한 언어: {{ favoriteLang }}</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      // 체크박스는 여러개 선택 가능하므로 배열로 선언
      favoriteLang: ['JS']
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
