<template>
<div>
    <!-- html 태그 사용할때는 전체 태그들을 묶어주는 최상위 태그가 있어야 함 vue2까지는 에러 발생!! -->
    <h1>Hello {{ userName }}</h1>
    <p>{{ message }}</p>
</div>
</template>
<script>
export default {
// 함수 앞에 function 선언 안함
  data() {
    // 모든 데이터는 'data'라는 함수 안에 return 오브젝트 안에 정의
    return {
      userName: 'John Doe',
      message: 'Welcome 개발자의 품격',
      arr: [],
      obj: {}
    }
  }
}

</script>
<style scoped>
/* 해당 파일의 html 태그에만 적용됨. 다른 페이지는 적용 안됨. */
</style>
