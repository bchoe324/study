CSS가 파싱되면서 CSSOM이 만들어지는 동안, 자바스크립트를 포함한 다른 asset들이 다운로드된다. 이는 preloader 덕분에 가능한 것이다.

> ❕ preloader
> preloader는 파서와 같다. 메인 파서가 HTML 코드를 처리하는 동안 HTML 파일을 스캔한다. 이는 스타일시트, 스크립트, 이미지(서버로부터 받아와야 하는 것)와 같은 리소스들을 찾아내고 미리 서버에 요청하여 메인파서가 이 코드를 읽을 때 바로 처리할 수 있게 한다.

# Javascript Execution

서버로부터 자바스크립트 파일을 받으면 코드를 해석하고, 컴파일하고, 파싱한 뒤 실행한다. 컴퓨터는 자바스크립트 코드를 이해할 수 없다. 따라서 코드를 컴퓨터가 작업할 수 있는 형태로 바꿔야 하는데 이를 **Javascript browser engine**이 해준다. 브라우저에 따라 JS engine의 이름이나 동작 방식이 다르다.

## Javascript engines

자바스크립트 엔진(**ECMAScript engine**이라고도 한다)은 브라우저에서 자바스크립트 코드를 실행시켜주는 소프트웨어이다.

자바스크립트 엔진은 일반적으로 브라우저 벤더가 개발하며, 주요 브라우저는 모두 탑재하고 있다. 오늘날 가장 많이 사용되는 브라우저인 Chrome, Safari, Edge, Firefox는 모두 다른 자바스크립트 엔진을 사용하고 있다.

### V8

V8은 Google이 개발한 고성능 자바스크립트 엔진이다. `C++`로 작성되었으며 Chrome과 Node.js 등에 사용된다. V8은 **ECMAScript**(자바스크립트 표준, ECMA-262)와 `WebAssembley`를 실행할 수 있다.

### JavaScriptCore

JavaScriptCore는 Webkit의 built-in 자바스크립트 엔진으로 Safari 브라우저, 메일, 그리고 macOS의 어플리케이션에서 사용된다. 현재 ECMAScript(ECMA-262)를 실행한다. 또한 `SquirrelFish` 또는 `ScuirrelFish Extreme`이라고도 불린다.

### Chakra

Chakra는 Microsoft에서 개발한 자바스크립트 엔진으로 Microsoft Edge 웹 브라우저와 다른 Windows 어플리케이션에 사용된다. ECMAScript 5.1을 실행하며, 부분적으로 ECMA 6을 지원한다(점차 늘리고있다). `C++`로 작성되었다.

### SpiderMonkey

SpiderMonkey는 Mozilla의 자바스크립트와 웹어셈블리 엔진이다. `C++`, `Javascript`, `Rust`로 작성되었으며, Firefox, Servo 등에서 사용되고 있다.

---

초기의 자바스크립트 엔진은 단순한 인터프리터였다. 현재 우리가 사용하는 모던 브라우저는 **Just-In-Time(JIT) compilation**이라고 하는 기능이 있는데, `compilation`과 `interpretation`의 혼합체이다.

### Compilation

**compiler**라고 하는 소프트웨어가 high-level language로 작성된 코드를 machine 코드로 동시에 변환한다. **object file**이라고 하는 중간단계의 파일이 만들어지고 이 파일은 어느 장치에서든 실행할 수 있다. 이 단계들을 거치고 난 뒤에 코드가 실행될 수 있다.

![compilation](https://res.cloudinary.com/practicaldev/image/fetch/s--eGJzDRif--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qtlubp70yhfm734zj9f9.png)

### Interpretation

`interpreter`가 자바스크립트 코드를 한 줄씩 읽으며 _바로 실행_ 시킬 것이다. compilation이 없으므로 Object Code가 생기지 않는다(코드의 결과는 interpreter 내부의 매커니즘을 사용하여 직접 만들어낸다). 자바스크립트의 예전 버전은 이 방식으로 코드를 실행한다.

![interpretation](https://res.cloudinary.com/practicaldev/image/fetch/s--x_y6_Y7y--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kvw7pmbm6c7temfb2ov3.png)

### JIT Compilation

**Just in Time compilation**의 특징은 프로그래밍 언어를 해석해주고, `compilation`과 `interpretation`의 장점을 모두 가진다는 것이다. 기존의 compilation에서는 실행 전에 번역되어야 하는 반면, JIT compilation에서는 코드가 실행되면서 변역된다(**run time**에서). 자바스크립트의 최신 버전은 이 방식으로 코드를 실행한다.

![jit compilation](https://res.cloudinary.com/practicaldev/image/fetch/s--mvKpJcgb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/coqiinfyz48luucra2a4.png)

JIT compilation은 소스 코드를 실행중인 기계의 기계어 명령으로 번역해준다. 즉, 작동하는 기계의 CPU 구조에 최적화된 기계어로 변환해준다는 것이다.

위의 세가지 프로세스를 요약하며 다음과 같다.

- Compiler: 코드를 번역함
- Interpreter:코드를 실행함
- JIT Compiler: 코드를 실행하면서 번역함

## How is the Javascript code processed

첫 번째 단계는 파싱이다. 자바스크립트 엔진이 코드를 읽고 동시에 **Abstract Syntax Tree**(AST)라는 데이터 구조로 변환된다. 코드는 의미를 갖는 조각들(`function` 이나 `const` 키워드)로 쪼개진다. 그리고 그 조각들은 Abstract Syntax Tree로 구축된다.

```js
const age = 25;
```

위의 코드가 Abstract Syntax Tree로 변환되었을 떄:

![Abstract Syntax Tree|450](https://res.cloudinary.com/practicaldev/image/fetch/s--qxZkgQtw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wsh5a1fdgq4uspeos108.png)

모던 자바스크립트는 JIT compilation을 사용하기 떄문에, AST가 구축된 후에 기계어로 변환되고 바로 실행된다. 기계어를 실행시키는 것은 자바스크립트 엔진의 "call stack"이라고 하는 매커니즘을 통해 이루어진다.

> ❕ call stack
> call stack은 interpreter의 매커니즘으로 여러 함수가 호출되는 스크립트에서(지금 실행되고있는 함수와 그 함수로부터 호출된 함수는 어떤 것인지 등) 위치를 계속 추적한다.

참고자료
https://dev.to/arikaturika/how-web-browsers-work-executing-the-javascript-part-5-with-illustrations-21ok
