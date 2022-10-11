<template>
  <div>
    <input type="text" v-model="userId" />
    <button @click="myFunction">click</button>
    <!-- @가 이벤트 리스너. 전달할 파라미터가 없을때는 myFunction() 가로 생략가능 -->
    <button @click="changeData">change</button>
    <br />
    <input type="text" v-model="num1" /> + <input type="text" v-model="num2" /> =
    <span>{{ num1 + num2 }}</span>
    <br />
    <input type="text" v-model.number="num3" /> + <input type="text" v-model.number="num4" /> =
    <span>{{ num3 + num4 }}</span>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userId: 'boram.choi',
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    // 구현할 함수는 method에 작성. function은 선언하지 않음
    myFunction() {
      console.log(this.userId)
      // object 안에 있는 key값에 접근할때는 this.'key값'
    },
    changeData() {
      this.userId = 'Boram'
    }
  }
}
</script>
