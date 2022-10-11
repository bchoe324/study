<template>
  <div>
    <div>
      <select name="" id="">
        <option value=""></option>
        <option :value="city.code" :key="city.code" v-for="city in cities">{{ city.title }}</option>
      </select>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>도서번호</th>
            <th>도서명</th>
            <th>가격</th>
            <th>수량</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(book, i) in bookList">
            <td>{{ book.bookId }}</td>
            <td>{{ book.bookTitle }}</td>
            <td>{{ book.price }}</td>
            <td><input type="number" name="" id="" v-model="book.qty" /></td>
            <td>{{ book.price * book.qty }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      cities: [
        { title: '서울', code: '02' },
        { title: '부산', code: '051' },
        { title: '제주', code: '064' }
      ],
      bookList: [
        {
          bookId: '1',
          bookTitle: '빌리 서머스',
          price: 10000,
          qty: 1
        },
        {
          bookId: '2',
          bookTitle: '딜레마 사전',
          price: 5000,
          qty: 1
        },
        {
          bookId: '3',
          bookTitle: '데일 카네기 인간관계론',
          price: 20000,
          qty: 1
        },
        {
          bookId: '4',
          bookTitle: '물고기는 존재하지 않는다',
          price: 4000,
          qty: 1
        },
        {
          bookId: '5',
          bookTitle: '하얼빈',
          price: 12000,
          qty: 1
        }
      ]
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
