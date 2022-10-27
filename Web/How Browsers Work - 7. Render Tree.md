파싱 단계에서 구축된 트리들(DOM, CSSOM)은 **Render Tree**라는 것으로 결합된다. 이것은 보여지는 모든 요소의 레이아웃을 계산해주며 이후에 스크린에 페인트할 것이다. render tree는 페이지의 콘텐트가 정확한 순서에 따라 요소를 페인트하도록 해준다. 이는 화면에 픽셀들을 띄워주는 페인팅 프로세스의 입력 데이터가 될 것이다.

DOM과 CSSOM은 각각 HTML, CSS로 만들어졌다. 이 둘은 서로 다른 타입의 정보를 갖고 있으며 트리 또한 다른 구조로 되어있다. 그렇다면 렌더 트리는 어떻게 만들어지게 되는 것일까?

## Combining the DOM with the CSSOM

1. 브라우저는 먼저 DOM 트리의 루트로부터 시작해 모든 보여지는 노드를 가로지른다. 스크립트, 메타 태그와 같이 보이지 않는 노드들은 무시된다. CSS(`display:hidden`)로 인해 숨겨지는 노드도 무시된다. 이때 중요한것은 화면에 실제로 _보여지는_ 노드들이다.
2. DOM에서 찾아낸 보이는 노드에 각각 상응하는 규칙들을 CSSOM에서 찾아낼 것이며 그 규칙들이 적용될 것이다.

위의 단계의 결과물이 **render tree**가 될 것이며 보이는 노드들과 그에 대한 내용, 스타일을 포함할 것이다.

![render tree](https://res.cloudinary.com/practicaldev/image/fetch/s--wjomXwOR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/56cdizmlhcvpwgjx55k7.png)

## The Layout(Reflow) Stage

렌더 트리는 화면에 보여지는 노드와 그 스타일에 대한 정보는 있지만, 그들의 면적(dimensions)과 위치에 대한 정보는 갖고있지 않다.

다음 단계는 기기의 뷰포트에서 노드의 _정확한 위치와 크기를 계산_ 하는 것이다. 이를 **layout**(Chrome, Opera, Safari, IE에서) 혹은 **reflow**(Firefox에서)라고 한다. 브라우저는 이 작업을 렌더 트리의 루트에서부터 시작한다.

![layout/reflow](https://res.cloudinary.com/practicaldev/image/fetch/s--Fd0z3hc5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s6mzrk4t8wgh8zb1i61r.png)

리플로우는 한 번만 일어나지 않는다. DOM에 페이지의 레이아웃에 (일부라도)영향을 주는 변화가 생기면 리플로우가 발생한다. 아래는 요소의 위치(position)가 다시 계산되는 상황들이다.

- DOM에서 요소를 더하거나 삭제
- 브라우저 윈도우 리사이즈
- 요소의 width, position을 바꾸거나 플로팅을 줄 때

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Reflow</title>
  </head>
  <body>
    <div style="width: 100%; height: 50%">
      <div style="width: 50%; height: 50%">This is the reflow stage!</div>
    </div>
  </body>
</html>
```

위의 예제를 보면 뷰포트 안에는 두개의 `div`가 있고, 두 번째 `div`는 첫 번째 `div`에 중첩되어있다. 부모 `div`는 뷰포트의 100%를 차지하고, 자식 `div`는 부모의 50%를 차지한다.

이를 그림으로 표현하면 다음과 같을 것이다.

![viewport](https://res.cloudinary.com/practicaldev/image/fetch/s--Ao5r2I-e--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jnlctcq5tdzcq7v3nr9m.png)

이 작업의 출력물은 `box like model`이다. 각 요소가 스크린의 어디에 있어야 하며, 그 크기를 정확히 파악해 준다. 이 단계가 끝나고 나면, 결과는 `painting stage`라는 다음 단계로 전달된다.

## The Painting(Repainting) Stage

브라우저가 보이는 노드의 위치와 크기를 계산하고 나면, 이제 그들을 스크린에 칠할 차례이다(픽셀을 렌더링함). 이 단계는 **rasterization**이라고도 하며, 레이아웃 단계에서 계산된 박스들을 스크린의 실제 픽셀로 변환한다.

![paint/repaint](https://res.cloudinary.com/practicaldev/image/fetch/s--RXa-PYen--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9ki8iq5jvmprhdo3h2gt.png)

레이아웃과 마찬가지로 페인팅 또한 한 번만 일어나지 않는다.

- 요소의 outline을 변경
- background color 변경
- opacity 혹은 visibility를 변경

페인팅은 브라우저가 text, color, border, shadow, replaced element(`img`, `button`) 와 같이 요소의 보이는 부분을 모두 그려야 한다는 의미이다. 리페인팅이 최초의 페인팅보다 훨씬 빠르게 하기 위해서 스크린에 그리는 작업은 몇 개의 레이어로 나누어 일어난다. 이때, compositing이 필요하다.

> ❕ Replaced Elements
> Replaced elements는 content가 현재 문서의 스타일에 영향을 받지 않는 요소들을 의미한다. 즉, replaced elements의 position은 CSS로 변경이 가능하지만, 그 요소의 content는 변경할 수 없다.
>
> `iframe`, `video`, `embed`, `img` (`option`, `audio`, `canvas`, `object`, `applet`)
>
> https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element

## Layering and Compositing

예전의 웹브라우저는 웹페이지의 콘텐츠 렌더링을 전적으로 CPU에 맡겼다. 그러나 요즘에는 작은 기기에도 성능이 좋은 GPU가 내장되어있어 요즘에는 GPU를 사용해 더 성능을 낼 수 있는 방법을 찾는 것으로 관심이 기울었다.

![critical rendering path](https://res.cloudinary.com/practicaldev/image/fetch/s--GvgtxfN---/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8l7o8i1bsy78h67kud7c.png)

> ❕ Compositing
> Compositing은 페이지를 레이어로 나누어 그들을 따로 페인팅하고 **compositor thread**라는 별개의 쓰레드에서 하나의 페이지로 합성하는 기술이다. 문서의 섹션들이 다른 레이어에서 그려지고 서로 겹칠때, compositing은 그들이 바른 순서로 스크린에 그려지고 그 content가 똑바로 렌더링되도록 한다.

일반적으로 특정한 과제들만 GPU로 리다이렉트 되는데, 그 과제들은 `compositor thread` 혼자 처리할 수 있는 것들이다.

요소가 어떤 레이어에 있어야 하는지 찾기 위해서 메인 스레드는 layout tree를 쭉 훑어보며 layer tree를 만들어낸다. 기본적으로는 하나의 레이어만 있다. 하지만 우리는 리페인트를 유발할 수 있는 요소들을 찾아 각각 새 레이어를 만들 수 있다. 이렇게 하면 리페인팅은 전체 페이지에서 일어나지 않을 것이고, 이 과정은 GPU를 이용할 것이다.

![main and compositor threads](https://res.cloudinary.com/practicaldev/image/fetch/s--LF-8p1wo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/prpama9aqqnyurkm5kph.png)

만약 어떤 요소를 따로 분리된 레이어로 만들고싶다면 `will-change`라는 CSS 속성을 사용해 브라우저에게 힌트를 줄 수 있다. 이 외에도 새 레이어가 만들어지도록 하는 속성과 요소들이 있다. 예를 들어 `<video>, <canvas>`, 그리고 `opacity`, 3D `transform`, `will-change`속성이 있는 모든 요소들이 있다. 이 노드들은 자손들과 함께 별개의 레이어로 페인트될 것이다.

참고자료
https://dev.to/arikaturika/how-web-browsers-work-the-render-tree-part-7-with-illustrations-24h3
