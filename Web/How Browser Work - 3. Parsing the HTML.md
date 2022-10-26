# Parsing the HTML

리퀘스트 이후에 브라우저는 웹페이지의 HTML 리소스를 포함한 리스폰스를 받게 된다. 이제 브라우저는 데이터를 parsing을 시작 할 수 있다.

> ❕ Parse
> Parsing이란 실제로 실행될 수 있는 runtime environment의 내부 포맷으로 프로그램을 분석하고 변환하는 것을 의미
>
> 브라우저는 HTML을 DOM tree로 파싱함. HTML 파싱은 tokenization, tree construction으로 구성됨. HTML 토큰은 시작태그, 종료태그, 속성의 이름과 값들을 포함
>
> 파서는 토큰화된 인풋을 문서로 만듦, 즉 도큐먼트 트리를 구축
>
> https://developer.mozilla.org/en-US/docs/Glossary/Parse

즉, parsing은 우리가 텍스트로 작성한 코드를(HTML, CSS) 브라우저가 작업할 수 있는 형태로 바꾸는 작업을 의미한다. **parsing**은 `browser engine`이 하는 일이다(브라우저의 `Javascript engine`과는 다른 것).

**browser engine**은 모든 주요 브라우저의 핵심 컴포넌트로 structure(HTML)과 style(CSS)를 결합해 우리 화면에 웹 페이지를 그려주는 게 주된 역할이다.

다음은 주요 브라우저가 사용하는 브라우저 엔진이다.

### Gecko

Mozilla에서 만들었으며 **firefox**가 사용하는 엔진이다. 예전에는 파워폭스 이외에도 여러 브라우저에서 사용되었으나 지금은 Tor, Waterfox만 남았다. `C++`, `JavaScript` 로 작성되었고, 2016년 이후로는 `Rust`가 추가되었다.

### Webkit

**Safari**에 사용하기 위해 Apple이 개발했다. GNOME Web (Epiphany), Otter 에도 사용된다. iOS에서는 모든 브라우저(파이어폭스, 크롬을 포함)에서 Webkit가 사용된다. `C++`로 작성되었다.

### Blink, part of Chromium

Webkit의 포크(fork)로 시작하여 **Chrome**에 사용하기 위해 Google이 만든 엔진이다. Edge, Brave, Silk, Vivaldi, Opera 등 대부분의 브라우저 프로젝트에 사용된다. `C++`로 작성되었다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>This is my page</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <h1>This is my page</h1>
    <h3>This is a H3 header.</h3>
    <p>This is a paragraph.</p>
    <p>This is another paragraph,</p>
  </body>
</html>
```

**HTML parsing**은 `tokenization`, `tree construction`(DOM Tree를 구축하는 것)이라는 단계를 포함한다.

## Tokenization

> ❕ Tokenization
> lexical analysis(어휘 분석)이라고도 하며, 데이터를 토큰(소스 코드의 기초 구성요소)으로 변환한다. 글의 본문을 단어(=토큰) 단위로 분석하는 것과 같다.

토큰화 과정을 거치면 `0` 또는 다음의 여러 토큰들이 된다.
DOCTYPE, 시작 태그(`<tag>`), 종료 태그(`</tag>`), self-closing 태그(`<tag/>`), 속성 이름과 값, 주석, 부호, end-of-file, 요쇼 내부의 텍스트.

![tokenization](https://res.cloudinary.com/practicaldev/image/fetch/s--yy-6k1E1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oy2l781kaik9tq6xvs4d.png)

## Building the DOM

토큰이 만들어지면 **tree building**을 시작한다. 이는 트리같은 구조(Document Object Model)를 만드는 것으로 파싱된 토큰들로 이루어진다.

> ❕ DOM(Document Object Model)
> **DOM**(문서 객체 모델)은 HTML, XML 문서의 프로그래밍 인터페이스이다. DOM은 문서의 구조화된 표현을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있도록 하여 그들이 문서 구조, 스타일, 내용 등을 변경할 수 있게 돕는다.
> DOM은 nodes와 objects로 문서를 표현한다. 이들은 웹 페이지를 스크립트 또는 프로그래밍 언어들에서 사용될 수 있게 연결시켜주는 역할을 담당한다.
> 웹페이지는 일종의 문서로, 웹 브라우저를 통해 그 내용이 해석되어 화면에 나타나거나 HTML 소스 자체로 나타나기도 한다. DOM은 동일한 문서를 표현하고, 저장하고, 조작하는 방법을 제공한다. DOM은 웹페이지의 객체 지향 표현이며, 자바스크립트와 같은 스크립팅 언어를 통해 수정할 수 있다.
>
> https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction

DOM tree는 HTML 문서의 내용을 기술한다.

`<html>`요소는 도큐먼트 트리의 첫 번째 태그이고 루트 노드이다. 트리는 태그들 사이의 관계와 계층구조를 나타낸다. **부모 노드**가 있고, 태그 안에 중첩된 태그를 **자식 노드**라고 한다. 노드가 많을수록 돔 트리 구축이 오래 걸릴 것이다.

![dom|400](https://res.cloudinary.com/practicaldev/image/fetch/s--Pd1hP5tb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8qdomt3z4u21pex1hhbw.png)

tree construction 단계는 `reentrant`(재진입 가능)하다.

> ✏️ example
>
> ```html
> <script>
>   document.write("<p>");
> </script>
> ```
>
> 위의 예제에서 tree construction 단계는
> 'script' 종료 태그 토큰을 처리하는 동안 'p' 시작태그 토큰을 처리하라는 요청을 받는다.
> 이런 경우를 위해 파서는 *script nesting level*과 *parser pause flag*를 갖고있다.

바이트부터 DOM이 만들어지기까지의 과정은 다음과 같다.

![html parser](https://res.cloudinary.com/practicaldev/image/fetch/s--AQryP0on--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9h659kk44fxd4ke0soez.png)

파서는 한줄 씩, 위에서 아래로 작동한다. **non-blocking resources**(예> 이미지)를 만나면 브라우저는 서버로부터 이미지를 요청하고 파싱을 계속 할 것이다. 반면 **blocking resources**(CSS stylesheets, `<head>`태그안의 Javascript 파일, CDN으로 추가된 폰트)를 만나면 파서는 blocking resources를 모두 다운받을 때까지 멈출것이다.

> 이것이 `<script>` 태그는 HTML 파일 끝에 추가하는것을 추천하는 이유이다. `<head>`태그에 추가하고싶다면 `defer` 혹은 `async` 속성을 추가해야 한다.
> `async`는 스크립트를 다운받는대로 비동기적 처리를 할 수 있게 한다. `defer`는 문서 전체가 파싱된 다음에 스크립트를 실행할 수 있게 한다.

## Preload scanner

Internet Explorer, Webkit, Mozilla는 모두 2008년에 블로킹 리소스(특히 스크립트, 스크립트는 파일이 다운되고 실행될 때까지 HTML 파싱을 멈춘다)를 처리하고자 pre-loader를 탑재하였다.  
브라우저가 블로킹 요소를 읽느라 멈춰있는 동안 보조 파서(preloader)가 HTML을 스캔하면서 필요한 리소스들을 찾아 백그라운드에서 로딩하기 시작한다.(리소스가 이미 캐시에 저장되어있다면 이 과정은 생략된다)

![preloader](https://web-dev.imgix.net/image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/6lccoVh4f6IJXA8UBKxH.svg)
 A diagram depicting how the preload scanner works in parallel with the primary HTML parser to speculatively load assets. Here, the primary HTML parser is blocked as it loads and processes CSS before it can begin processing image markup in the `<body>` element, but the preload scanner can look ahead in the raw markup to find that image resource and begin loading it before the primary HTML parser is unblocked. (https://web.dev/preload-scanner/)

Overview of the parsing model

![parsing model|](https://html.spec.whatwg.org/images/parsing-model-overview.svg)

참고자료
https://dev.to/arikaturika/how-web-browsers-work-parsing-the-css-part-4-with-illustrations-4c
