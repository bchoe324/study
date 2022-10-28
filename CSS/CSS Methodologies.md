1. Atomic CSS
2. BEM
3. ITCSS
4. SMACSS
5. OOCSS

## Atomic CSS

한 가지 역할을 하는 클래스에 그 역할을 보여주는 이름을 붙이는 것

```css
.bg-blue {
  background-color: blue;
}
```

```html
<button class="b1 b--green bg-green white br-5 ma-10 f3 ttu fw-400 padding-10">
  Click Me!
</button>

<div class="Bgc(#0280ae.5) C(#fff) P(20px)">Lorem ipsum</div>
```

## BEM(Block element modifier)

#### Block

독립적인 개체로 그 자체로 의미를 가진다.(`header`, `container`, `menu`)

#### Element

블럭의 구성요소 중 하나로 그 자체로는 의미가 없으며, 블럭 밖에서 독립적으로 사용할 수 없다. (`menu item`, `list item`, `checkbox caption`)

#### Modifier

블럭이나 엘리먼트의 스타일이나 동작을 바꾸겠다는 표시 (`disabled`, `highlighted`, `enabled`, `checked`)

```css
.form {
} /* 블럭 */
.form--theme-xmas {
} /* 블럭 모듈 */
.form--simple {
}
.form__input {
} /* 엘리먼트 */
.form__submit {
}
.form__submit--disabled {
} /* 엘리먼트 모듈*/
```

```html
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input class="form__submit form__submit--disabled" type="submit" />
</form>
```

## ITCSS(Inverted Triangle CSS)

![ITCSS](https://www.arekibo.com/getattachment/Blog/Popular-CSS-methodologies-for-scaling-web-projects/ITCSS.jpg)
출처: <https://www.arekibo.com/blog/popular-css-methodologies-for-scaling-web-projects/>

#### Settings

Global SASS variables

#### Tools

SASS functions & mixins

#### Generic

Normalise or css resets. General global rules

#### Elements

typography elements like `h1`, `a`

#### Objects

Non cosmetic design patterns like layouts and grids

#### Components

Styling main UI components

#### Trumps

Overrides, utilities and helper classes (e.g hide helper class)

## SMACSS(Scalable Modular architecture)

#### Base

default typography, reset styles, global styles
element, attribute, pseudo-class, child, sibling selector 사용

#### Layout

페이지를 주요 섹션으로 나눈다. 예를 들면 headers, main content, footer 등을 레이아웃에서 설정한다. ID를 사용한다.

#### Module

모든 리유저블한 UI 컴포넌트들. accordion, modal, dialog, carousel 등

#### State

모듈의 특정한 상태 등을 설명한다. active tab, collapsed accordion 등

#### Theme

기존 컬러나 그림을 덮어쓴다.

## OOCSS(Object-Oriented CSS)

OOCSS는 다음 두 가지 규칙을 따른다.

1. separation of structure from skin
2. separation of containers and content

#### separation of structure from skin

`structure`(width, height, margins, paddings, etc)
`skins`(colors, fonts, shadows, gradients, etc)

#### separation of containers and content

컨테이너와 콘텐트를 분리시켜야 콘텐트를 어디서든 재사용할 수 있다.

- `.button` - 버튼의 기본 구조를 스타일(structure)
- `.grey-btn` - 다른 visual property를 적용(skin)

```css
.button {
  box-sizing: border-box;
  height: 50px;
  width: 100%;
}

.grey-btn {
  background: #eee;
  border: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.5) 1px 1px 3px;
  color: #555;
}
```

```html
<button class="button grey-btn">Click me!</button>
```

참조

- [Long-Standing CSS Methodologies](https://byby.dev/css-methodologies)
- [5 CSS methodologies you need to know in 2022](https://genicsblog.com/five-css-methodologies-you-need-to-know-in-2022)
