
# CSS 전처리기 (CSS Preproccessor)

CSS 전처리기를 사용하면 기본 CSS에서는 제공하지 않는 확장된 기능을 쓸 수 있다. 예를 들어 변수, 조건문, 반복문 등을 제공한다.

## CSS Preproccessor Features

### Variables

자주 사용하는 스타일을 변수로 만들어 간편하게 쓸 수 있다.

```scss
$hoverColor: #33FF9B; 
button { background-color: $hoverColor; }
```


### If/Else Statement

조건에 따라 다른 스타일을 적용할 수 있다.

```scss
@if width(body) > 500px { 
	margin-top: 100px; 
} else { 
	margin-top: 10px; 
}
```


### Loops

```scss
$social: ( 
	'facebook': #4267B2, 
	'twitter': #1D9BF0 , 
	'linkedin': #0072b1, 
	'instagram': #8a3ab9, 
);

@each $name, $color in $social { 
	// selector based on href name 
	[href*='#{$name}'] {
		background: $color; 
	// apply the link for the relevant image file 
	&::before { 
		content: url(https://example.com/images/#{$name}.png); 
		} 
	} 
}
```



## Popular CSS Preproccessors


### SASS
SASS(Syntactically Awesome Style Sheet)는 두 가지 문법이 있다. 
**SASS(`.sass`)** 는 오래된 버전으로 세미콜론 `;` 과 중괄호 `{}` 를 사용하지 않는다. 최근 버전인 **SCSS(`.scss`)** 는 기본 CSS 문법과 동일하게 세미콜론과 중괄호를 사용한다.

#### Syntax
```scss
/* Sass */

$primary-color: seashell
$primary-bg: darkslategrey

body
  color: $primary-color
  background: $primary-bg
```

```scss
/* SCSS */

$primary-color: seashell;
$primary-bg: darkslategrey;

body {
  color: $primary-color;

  background: $primary-bg;

}
```

컴파일 결과는 같다.

```css
/* Compiled CSS */

body {
  color:seashell;
  background: darkslategrey;
}
```


### LESS
LESS(Leaner Style Sheets)

#### Syntax
```less
/* LESS */

@primary-color: seashell;
@primary-bg: darkslategrey;

body {
  color: @primary-color;
  background: @primary-bg;
}
```


### Stylus
- Stylus는 Sass와 LESS의 영향을 받아 탄생하였으며 Node.js로 작성되었다. 
- 확장자명은 `.styl` 이다. 
- 다양한 방식으로 코드를 작성할 수 있다. 기본 CSS 문법을 사용할 수 있고 세미콜론, 콜론, 중괄호를 각각 혹은 모두 생략할 수도 있다.

#### Syntax
```stylus
/* Stylus standard CSS syntax */

primary-color = seashell;
primary-bg = darkslategrey;

body {
  color: primary-color;
  background: primary-bg;
}
```

```stylus
/* Stylus syntax without brackets */

primary-color = seashell;
primary-bg = darkslategrey;

body
  color: primary-color;
  background: primary-bg;
```

```stylus
/* Stylus syntax without brackets and semicolons */

primary-color = seashell
primary-bg = darkslategrey

body
  color: primary-color
  background: primary-bg
```

```stylus
/* Stylus syntax without punctuation */

primary-color = seashell
primary-bg = darkslategrey

body
  color primary-color
  background primary-bg
```

그러나 할당 연산자 `=` 는 생략할 수 없다.

### PostCSS
- PostCSS는 정확하게는 전처리기가 아니라 transpiler이다. PostCSS 플러그인 구문을 CSS로 변환해준다.
- JS 플러그인이다. 필요한 기능으로만 커스터마이징할 수 있다.
	`PostCSS Import`, `Autoprefixer`, `PostCSS Nested` 등 


참조
- [The Complete Beginner’s Guide to CSS Preprocessors](https://careerfoundry.com/en/blog/web-development/css-preprocessors/)
- [Popular CSS Preprocessors With Examples: Sass, Less & Stylus](https://raygun.com/blog/css-preprocessors-examples/)
- [What is PostCSS? How to Use Plugins to Automate CSS Tasks](https://www.freecodecamp.org/news/what-is-postcss/)