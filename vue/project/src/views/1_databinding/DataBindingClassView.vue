<template>
  <div>
    <div :class="{ 'text-red': hasError, active: isActive }">클래스 바인딩</div>
    <!-- 클래스는 오브젝트를 선언해서 넣을 수 있음 -->
    <!-- 오브젝트의 key는 클래스 이름 클래스 명이 한 단어이면 '' 필요 없음 -->
    <!-- 어떤 이벤트에 따라 클래스가 달라지게 설정하는 경우가 많으므로 첫 번째 div와 같은 형태로 많이 사용 -->
    <div :class="class2">클래스 바인딩2</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      isActive: false,
      hasError: false,
      class2: ['active', 'hasError']
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
<style scoped>
.active {
  background-color: greenyellow;
  font-weight: bold;
}
.text-red {
  color: red;
}
</style>
