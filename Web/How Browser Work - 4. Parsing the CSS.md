# CSS Parsing

브라우저가 CSS stylesheet를 만나면, 레이아웃을 스타일링하는데 사용할 수 있는 형태로 파싱해야한다. 브라우저에서 CSS를 변환한 데이터 구조를 CSSOM이라고 한다. DOM과 CSSOM은 둘 다 트리 구조라는 점에서 비슷하다. HTML로부터 DOM을 구축하는 것과 마찬가지로, CSS로부터 CSSOM을 구축하는 것은 _render-blocking process_ 에 해당한다.

> ❕ CSSOM(CSS Object Model)
> CSSOM은 문서의 스타일 정보(CSS)를 읽고 수정하는 API로, 자바스크립트로부터 문서의 스타일링을 읽고 수정할 수 있게 함

## Tokenization & Building the CSSOM

HTML 파싱과 마찬가지로 CSS 파싱은 **tokenization**부터 시작한다. CSS parser가 바이트를 문자로 변환하고, 그 다음 차례대로 문자, 토큰, 노드, 마지막으로 CSSOM이 된다. 브라우저는 **selector matching**이라는 작업을 통해 각각의 스타일을 페이지의 노드(요소)와 매치한다.

![css tokenization](https://res.cloudinary.com/practicaldev/image/fetch/s--pnop7Cu_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qyiwv33dqna9wai2p2wm.png)

먼저 가장 일반적인 규칙을 노드에 적용시킨다(body의 자식인 노드가 있다고 치면, body의 모든 스타일들이 그 노드에 상속된다). 그 뒤에 더 구체적인 규칙들을 적용하여 계산된 스타일을 다시 적용한다. 이런 방식을 **cascading**이라고 한다.

아래와 같은 CSS가 있다고 가정해보자

```css
body {
  font-size: 16px;
  color: white;
}

h1 {
  font-size: 32px;
}

section {
  color: tomato;
}

section .mainTitle {
  margin-left: 5px;
}

div {
  font-size: 20px;
}

div p {
  font-size: 8px;
  color: yellow;
}
```

위 코드의 CSSOM은 아래와 같이 나타날 것이다.

![cssom](https://res.cloudinary.com/practicaldev/image/fetch/s--dbDf1J0I--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6udct34olw9ekkwqbxws.png)

위의 도식에서 중첩된 요소들은 **상속된 스타일**(`h1`은 `body`로부터 `color`을 상속받고, `section`은 `body`로부터 `font-size`를 상속받는다)과 **자신의 스타일**(상속받은 스타일을 덮어 쓸 수 있다. - `p`는 `div`로부터 상속받은 `color`와 `font-size`를 자기 스타일로 덮어썼다)을 둘 다 갖는다.

CSS는 다중의 소스를 가질 수 있고, 그들은 동일한 노드에 적용되는 규칙을 포함할 수 있다. 따라서 브라우저는 최종적으로 적용할 규칙을 정해야 한다. 이를 정하는 알고리즘을 **specificity(명시도)**라고 한다. [more](https://developer.mozilla.org/ko/docs/Web/CSS/Specificity)

예를 들어 다음과 같은 HTML과 CSS 코드를 보면:

```html
<p>
  <a href="https://dev.to/">This is just a link!</a>
</p>
```

```css
a {
  color: red;
}

p a {
  color: blue;
}
```

위의 CSS 코드 중 브라우저가 적용하는 스타일은 두 번째 규칙이다. 첫 번째 규칙은 모든 `a`태그라는 의미이고 두 번째는 `p`태그 안에 있는 모든 `a`태그 라는 의미이다. 두 번째 규칙이 더 명시도를 갖는다.

CSS 규칙은 _오른쪽에서 왼쪽으로_ 읽는다. `section p { color: blue; }`라는 코드를 예로 들어보면, 브라우저는 먼저 모든 `p`태그를 찾는다. 찾은 `p`태그 중 `section`이 부모인 태그가 있는지 찾는다. 있다면 그 태그에는 위의 규칙이 적용될 것이다.

참고자료
https://dev.to/arikaturika/how-web-browsers-work-parsing-the-css-part-4-with-illustrations-4c
