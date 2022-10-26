---
created:2022-10-25 00:49
title: Web Front-End & Web Back-End
tags: []
aliases: []
related: []
cssClass: 
---

# 웹 프론트 엔드 & 웹 백엔드의 역할과 기술적 구성

![frontend & backend](https://blog.kakaocdn.net/dn/bCJsOp/btqwyC8LBPH/WM069XZ4h1xc7jKutuVxf0/img.jpg)

## Web Front-End

사용자에게 웹을 통해 다양한 콘텐츠(문서, 동영상, 사진 등 = _리소스_)를 제공한다. 또한 사용자의 요청(요구사항)에 반응해서 동작한다.


### 웹 프론트엔드의 역할

- 웹 콘텐츠를 잘 보여주기 위해서는 구조를 만들어야 한다.(신문, 책 등과 같이) - **HTML**
- 적절한 배치와 일관된 디자인 등을 제공해야 한다.(보기 좋게) - **CSS**
- 사용자 요청을 잘 반영해야 한다.(소통하듯이) - **Javascript**

#### html 코드 예시
원하는 문서의 구조를 프로그래밍 언어로 표현해야 한다.
HTML은 그 구조를 잘 표현 해 준다.
```html
<h1> 우리집에 오신걸 환영합니다 </h1>
<section>
   <h2> 위치</h2>
    <p> 경기도 시흥시 어딘가 위치하고 있어요~</p>
    <h2> 특징</h2>
    <p>  우리집은 마루가 아주 작아요~  하지만 옹기종기 모여있기 좋은 구조에요</p>
</section>
<footer>email : crong@kdd123.com</footer>
```

#### 스타일 - CSS 코드 예시
웹페이지를 꾸미기 위해서는 각각의 HTML 태그(문서의 구조를 표현한 각 조각 단위)를 꾸미기 위한 규칙이 필요하다.
CSS는 이를 표현할 수 있는 프로그래밍 언어이다.
```css
.window-header-icon {
	left: -28px;
	position: absolute;
	top: 8px
}

.window-header-inline-content {
	cursor: default;
	display: inline-block;
	margin: 4px 6px 0 0
}
```

#### 동작 - javascript 코드 예시
HTML, CSS를 이리저리 움직이고 변경할 필요가 있다.
Javascript가 그걸 해준다.
```javascript
let aCardList = [];
for (var i = 0; i < cardList.length; i++) {
	let str =`${cardList[i]}번째 카드`;
	let id = `list-${cardList[i]}`;
	aCardList.push(<li id={id} key={i} draggable='true' onDragStart={dragStart}> {str} </li>)
}
```


## Web Back-End

Backend는 정보를 처리하고 저장하며, 요청에 따라 정보를 내려주는 역할을 한다. 가령 쇼핑몰이라면 상품 정보를 가지고 있고, 주문을 받아서 저장하고, 사용자가 관심있어 하는 상품을 골라주는 역할을 한다.

### 백엔드 개발자가 알아야 할 것들
- 프로그래밍 언어(JAVA, Python, PHP, Javascript 등)
- 웹의 동작 원리
- 알고리즘(algorithm), 자료구조 등 프로그래밍 기반 지식
- 운영체제, 네트워크 등에 대한 이해
- 프레임워크에 대한 이해(Spring)
- DBMS에 대한 이해와 사용방법(MySQL, Oracle 등)


참조
[boostcourse - 웹 프로그래망 기초](https://www.boostcourse.org/web316/lecture/254254/?isDesc=false)
[웹프론트엔드의 역할](https://html-css-js.com/)