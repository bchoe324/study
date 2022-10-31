# BEM: Block Element Modifier

규칙:

```css
.block {
}
.block__element {
}
.block--modifier {
}
```

- Block
  독립적인 개체로 그 자체로 의미를 가진다.(`header`, `container`, `menu`)

- Element
  블럭의 구성요소 중 하나로 그 자체로는 의미가 없으며, 블럭 밖에서 독립적으로 사용할 수 없다. 앞에 `__`를 붙여서 쓴다. (`menu item`, `list item`, `checkbox caption`)

- Modifier
  블럭이나 엘리먼트의 스타일이나 동작을 바꾸겠다는 표시이다. 앞에 `--`를 붙여서 쓴다. (`disabled`, `highlighted`, `enabled`, `checked`)

예시:

```css
.site-search {
} /* Block */
.site-search__field {
} /* Element */
.site-search--full {
} /* Modifier */
```

이름이 길면 **`-`** 를 사용한다. `site-search`까지가 블럭 이름이다.

BEM 규칙을 적용하지 않은 경우:

```html
<form class="site-search full">
  <input type="text" class="field" />
  <input type="submit" value="Search" class="button" />
</form>
```

BEM 규칙을 적용한 경우:

```html
<form class="site-search site-search--full">
  <input type="text" class="site-search__field" />
  <input type="submit" value="Search" class="site-search__button" />
</form>
```

태그 사이의 관계나 역할을 한눈에 알 수 있다.

## Block

- 블럭은 그 자체로 의미를 가지는 독립적인 개체이다.
- 다른 블럭을 포함할 수 있다.

예를 들어 아래의 `Search` 블럭은 `Head` 블럭 안에 속하는 또다른 블럭이다.
![search form block](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8fa03b3b-632f-4467-8758-facd7a7b9a6e/search-bar.jpg)

블럭 이름은 어떤 블럭을 가리키는지 명확히 알 수 있어야 하므로 프로젝트 내에서 유일해야 한다.

![arranging block](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b01ce790-a401-4da5-9ff5-9f78dd6098a6/list-of-goods.jpg)

한 페이지 안에 같은 블럭이 여러개 존재할 수 있다.

## Element

- 블럭의 한 부분으로 어떤 기능을 한다.
- 엘리먼트는 문맥의존(Context-dependent)적이다. 다시말해 블럭 안에서만 의미를 가질 수 있다.
- 블럭 안에 꼭 엘리먼트가 있을 필요는 없다.

`input`과 `button`은 `Search` 블럭의 엘리먼트이다.
![elements](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1d8766e0-df2a-4486-a3c9-b922eae2ca90/input-button.jpg)

엘리먼트 이름은 블럭 내에서 유일해야 한다. 엘리먼트는 다음 그림과 같이 여러번 사용할 수 있다.
![element naming](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5c99a0bf-6da0-4948-af13-4f29f74bf1de/elements-repeated.jpg)

> [!note] 모든 엘리먼트에 클래스를 추가해야 되나?
> 별도의 스타일이 필요 없으면 추가하지 않아도 된다. (예 `p`, `span` 태그 등)

## Modifier

**Modifier**는 블럭이나 엘리먼트의 속성이나 상태를 정의한다. 한 아이템에 여러 모디파이어를 사용할 수 있다.

모디파이어 이름은 아이템의 외관(사이즈 `big`, 테마 `islands-theme`), 상태(`disabled`, `focused`), 동작(`left-top`)을 표현한다.

이미 존재하는 블럭/엘리먼트와 매우 비슷하지만, 살짝 다른 스타일이나 동작의 블럭/엘리먼트가 필요할 수도 있다.
예를 들어, `Footer`에 `Menu`를 하나 추가하는데 이때 다른 레이아웃을 적용하고 싶다고 하자.

![Menu Blocks](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c6613141-0775-4fa6-87ec-513d5c37aee5/sitefootermenu.jpg)

`Footer`에 새로 `Footer Menu` 블록을 만드는 대신 Modifier를 사용하면 된다.

![look of current item modifier](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a5f86638-e2aa-49be-8d38-aeb5b7789a16/menu-current-items.jpg)
'current' 아이템의 스타일을 설정하는 엘리먼트 모디파이어

> [!caution] Modifier는 단독으로 사용할 수 없다.
>
> ```html
> <!-- Wrong -->
> <button class=".btn--blue">Click me!</button>
>
> <!-- Correct -->
> <button class=".btn .btn--blue">Click me!</button>
> ```
>
> 모디파이어는 확장의 개념으로 아이템을 대체할 수 없다.

> [!note] Modifier or New Component?
> 새 modifier를 스타일링하기 위해 기존의 block CSS를 전부 리셋해야한다면 새 컴포넌트로 분리하는것이 좋다.

## 예제

### 후손 요소

```html
<div class="c-card">
  <div class="c-card__header">
    <!-- Here comes the grandchild… -->
    <h2 class="c-card__header__title">Title text here</h2>
  </div>

  <div class="c-card__body">
    <img class="c-card__body__img" src="some-img.png" alt="description" />
    <p class="c-card__body__text">Lorem ipsum dolor sit amet, consectetur</p>
    <p class="c-card__body__text">
      Adipiscing elit.
      <a href="/somelink.html" class="c-card__body__text__link"
        >Pellentesque amet</a
      >
    </p>
  </div>
</div>
```

위의 예시와 같이 중첩된 태그가 많아질수록 클래스 이름을 짓기 힘들어진다.

엘리먼트끼리 중첩되어 `Block__Element1__Element2`와 같은 형태가 되어있는데, 이는 BEM(`Block__Element--Modifier`)의 취지에 어긋난다.

후손 엘리먼트가 얼마나 중첩되어있는지는 상관 없다. BEM의 네이밍 컨벤션은 block과의 관계를 알기 쉽게 도와주기 위한 것이다. (위의 예시에서는 `c-card`)

```html
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h2>
  </div>

  <div class="c-card__body">
    <img class="c-card__img" src="some-img.png" alt="description" />
    <p class="c-card__text">Lorem ipsum dolor sit amet, consectetur</p>
    <p class="c-card__text">
      Adipiscing elit.
      <a href="/somelink.html" class="c-card__link">Pellentesque amet</a>
    </p>
  </div>
</div>
```

위와 같이 클래스 이름을 지으면 모든 후손 요소들은 `c-card` 블록에만 영향을 받는다. 따라서 구문 구조를 해치지 않고 엘리먼트를 자유롭게 추가/수정/삭제할 수 있다.
위의 코드로 예를 들면, text, img를 `c-card__header`로 옮길수도 있고, `c-card__footer`라는 아예 새로운 엘리먼트를 추가할 수도 있다.

### Namespace

위의 예시에서 card 앞에 prefix(`c-`)를 붙이는 것을 Namespace라고 한다. [namespacing technique](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) 를 적용하면 코드를 이해하는게 더 쉬워진다.

| Type          | Prefix        | Examples                   | Description                                                |
| ------------- | ------------- | -------------------------- | ---------------------------------------------------------- |
| Component     | `c-`          | `c-card`, `c-checklist`    | 페이지의 핵심 틀을 구성. 컴포넌트의 미적인 스타일링을 포함 |
| Layout module | `l-`          | `l-grid`, `l-container`    | 미적인 스타일링 x. `c-`의 positioning, 페이지 레이아웃     |
| Helpers       | `h-`          | `h-show`, `h-hide`         | 하나의 기능을 함(주로 positioning, visibility)             |
| States        | `is-`, `has-` | `is-visible`, `has-loaded` | `c-`의 다른 상태                                           |
| JS hooks      | `js-`         | `js-tab-switcher`          | JS동작만. 스타일은 적용하면 안됨                           |

### Wrapper

다음과 같이 컴포넌트를 감싸는 부모가 필요할 때

```html
<ul class="l-grid">
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">[…]</div>
      <div class="c-card__body">[…]</div>
    </div>
  </li>
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">[…]</div>
      <div class="c-card__body">[…]</div>
    </div>
  </li>
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">[…]</div>
      <div class="c-card__body">[…]</div>
    </div>
  </li>
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">[…]</div>
      <div class="c-card__body">[…]</div>
    </div>
  </li>
</ul>
```

`l-grid` 레이아웃 모듈을 만든다. `l-grid__item` 엘리먼트 안에 `c-card` 컴포넌트를 담는다.

```
l-grid → Block
	l-grid__item → Element
		c-card → Block
```

#### 컴포넌트 중첩

`c-card` 안에 체크리스트를 만들고 싶다고 해보자.

```html
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h2>
  </div>

  <div class="c-card__body">
    <p>I would like to buy:</p>

    <!-- Uh oh! A nested component -->
    <ul class="c-card__checklist">
      <li class="c-card__checklist__item">
        <input
          id="option_1"
          type="checkbox"
          name="checkbox"
          class="c-card__checklist__input"
        />
        <label for="option_1" class="c-card__checklist__label">Apples</label>
      </li>
      <li class="c-card__checklist__item">
        <input
          id="option_2"
          type="checkbox"
          name="checkbox"
          class="c-card__checklist__input"
        />
        <label for="option_2" class="c-card__checklist__label">Pears</label>
      </li>
    </ul>
  </div>
  <!-- .c-card__body -->
</div>
<!-- .c-card -->
```

```
c-card
	c-card__body
		<ul> c-card__checklist
			<li> c-card__checklist__item
				c-card__checklist__input
				c-card__checklist__label
```

`c-card__checklist__item`처럼 클래스를 만들면, 위에서 보았던 `block__elem1_elem2` 형태이고, 재사용이 어려울 것이다.

`<ul>`태그를 `l-list`라는 블록으로 분리하고, `<div>` 태그를 `c-checkbox`블록으로 만들고 `l-list_item`엘리먼트 안에 담는다.

```html
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h2>
  </div>

  <div class="c-card__body">
    <p>I would like to buy:</p>

    <!-- Much nicer - a layout module -->
    <ul class="l-list">
      <li class="l-list__item">
        <!-- A reusable nested component -->
        <div class="c-checkbox">
          <input
            id="option_1"
            type="checkbox"
            name="checkbox"
            class="c-checkbox__input"
          />
          <label for="option_1" class="c-checkbox__label">Apples</label>
        </div>
      </li>
      <li class="l-list__item">
        <div class="c-checkbox">
          <input
            id="option_2"
            type="checkbox"
            name="checkbox"
            class="c-checkbox__input"
          />
          <label for="option_2" class="c-checkbox__label">Pears</label>
        </div>
      </li>
    </ul>
    <!-- .l-list -->
  </div>
  <!-- .c-card__body -->
</div>
<!-- .c-card -->
```

```
c-card
	c-card__body
		<ul> l-list
			<li> l-list__item
				c-checkbox
					c-checkbox__input
					c-checkbox__label
```

이렇게 하면 `l-list`, `c-checkbox` 모두 다시 사용할 수 있다.

### Cross-Component

컴포넌트의 스타일링이나 포지셔닝이 부모 컨테이너의 영향을 받는 경우:

이전의 예제에서 `card__body` 안에 `c-button`을 추가하고 싶다고 하자.

```html
<button class="c-button c-button--primary">Click me!</button>
```

만약 버튼 디자인이 기본 디자인과 같다면 다음과 같이 하면 된다.

```html
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h2>
  </div>
  <div class="c-card__body">
    [...]
    <!-- Our nested button component -->
    <button class="c-button c-button--primary">Click me!</button>
  </div>
</div>
```

하지만 만약 버튼의 디자인이 달라야 한다면? 예를 들어 `c-card` 컴포넌트 안의 버튼만 작게, 모서리를 둥글게 만들고 싶다면?

#### Cross-Component / mixes

```html
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h2>
  </div>
  <div class="c-card__body">
    [...]
    <!-- My *old* cross-component approach -->
    <button class="c-button c-card__c-button">Click me!</button>
  </div>
</div>
```

`c-card__c-button`이라는 클래스를 만들고 c-card 안에서만 적용할 스타일을 입력한다.

```css
.c-button {
  /* default button settiings */
}
.c-card__c-button {
  /* size: small */
  /* rounded */
}
```

#### style modifier

다른 스타일마다 모디파이어를 추가하여 분리한다.

```html
<button class="c-button c-button--rounded c-button--small">Click me!</button>
```

```css
.c-button {
  /* default button settiings */
}
.c-button--rounded {
  /* rounded */
}
.c-button--small {
  /* size: small */
}
```

이 방식은 해당 스타일이 필요할 때 어디서든 다시 쓸 수 있다.

### State

`active`, `open`과 같이 컴포넌트의 상태를 스타일링할 때

```html
<!-- standalone state hook -->
<div class="c-card is-active">[…]</div>

<!-- or BEM modifier -->
<div class="c-card c-card--is-active">[…]</div>
```

첫 번째 방식은 js에서 `is-active` 클래스가 있는 컴포넌트를 한꺼번에 선택할 수 있어 편하다.
https://github.com/chris-pearce/css-guidelines#state-hooks

### 반응형 디자인

스크린 크기에 따라 디자인이 달라진다면?

예를들어, 화면에 따라 메뉴 디자인이 다음과 같이 바뀌어야 한다면
드롭다운 메뉴 → 탭 메뉴 → 메뉴 버튼

```html
<ul class="c-image-list@small-screen c-carousel@large-screen"></ul>
```

```css
.c-image-list\@small-screen {
  /* styles here */
}
```

CSS에서 @를 사용한다면, `\` 를 사용해서 `@` escape 해야한다.

참조

- [BEM: A New Front-End Methodology](https://www.smashingmagazine.com/2012/04/a-new-front-end-methodology-bem/)
- [The Evolution Of The BEM Methodology](https://www.smashingmagazine.com/2013/02/the-history-of-the-bem-methodology/)
- [Scaling Down The BEM Methodology For Small Projects](https://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/)
- [Battling BEM CSS: 10 Common Problems And How To Avoid Them](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/)
- [BEM](https://en.bem.info/)
