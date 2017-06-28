# Typography

MDC typography는 [Material Design typography guidelines](https://material.io/guidelines/style/typography.html)을 구현한 CSS 전용 컴포넌트이며,  
CSS 클래스를 사용할 수 있도록 함

> [원문](https://material.io/components/web/catalog/typography/)

## CSS class 사용

```html
<head>
    <link href="https://fonts.googleapis.com/css?famil=Roboto:300,400,500" rel="stylesheet">
</head>
<body class="mdc-typography">
    <h1 class="mdc-typogrphy--display4">Big header</h1>
</body>
```

Material Design 타이포그래피는 Google 글꼴에서 로드하는 Roboto 글꼴을 사용한다.  

※원한다면 더 많은 weigth, style을 로드할 수 있지만, `mdc-typography`는 300, 400, 500만 사용한다.

`mdc-typography` 클래스는 서체와 안티 앨리어싱 설정 같은 텍스트의 기본 속성을 정의한다.

### 텍스트 서식 지정

#### Style
간단하게 해당 스타일 클래스를 추가하여 텍스트 서식을 지정

```html
<body class="mdc-typography">
    <h1 class="mdc-typography--display4">큰 제목</h1>
    <p class="mdc-typography--body1">
        <span class="mdc-typography--body2">강조</span>를 포함한 문장
    </p>
</body>
```

##### 스타일 리스트

+ `mdc-typography--display4`
+ `mdc-typography--display3`
+ `mdc-typography--display2`
+ `mdc-typography--display1`
+ `mdc-typography--headline`
+ `mdc-typography--title`
+ `mdc-typography--subheading2`
+ `mdc-typography--subheading1`
+ `mdc-typography--body2`
+ `mdc-typography--body1`
+ `mdc-typography--caption`

#### Margin과 Positioning

예기치 않은 동작을 최소화하기 위해 스타일 클래스는 size, weigth, line height과 같은 글꼴 속성만 지정함  


텍스트의 스타일(글꼴 속성)은 올바르지만 포지션은 올바르지 않을 수 있다.  
`mdc-typography--adjust-margin` 클래스를 추가한다면 스타일에 따른 포지션을 조정하게 된다.

```html
<body class="mdc-typography">
    <h1 class="mdc-typography--display4 mdc-typography--adjust-margin">큰 제목</h1>
    <p class="mdc-typography--body1 mdc-typography--adjust-margin">
        <span class="mdc-typography--body2 mdc-typography--adjust-margin">강조</span>
        를 포함한 문장
    </p>
</body>
```

※ 이름에서 알 수 있듯이 `mdc-typography--adjust-margin`은 올바른 텍스트 정렬을 위해 요소의 마진 속성을 변경한다.  
이 때문에 텍스트 컨텍스트 안에서만 사용되어야 한다.  
버튼같은 UI 요소에 이 속성을 사용하면 잘못 배치 될 수 있다. 

## Sass mixin 사용

### [mixin] mdc-typography-base

특정 글꼴 사이즈나 스타일을 정의하지 않고, Material Design typography의 기본 속성(폰트 이름, 앨리어싱 설정) 스타일을 정의함  

```scss
@mixin mdc-typography-base {
  font-family: $mdc-typography-font-family;
  -moz-osx-font-smoothing: grayscale; // Firefox - antialiasing 
  -webkit-font-smoothing: antialiased; // Chrome - antialiasing 
}
```

### [mixin] mdc-typography

```scss
@mixin mdc-typography($style) {
  // _variables.scss에 정의된 $mdc-typography-styles 맵에서
  // 인자 $style와 일치하는 키(예: display4) 값을 $style-props에 저장
  $style-props: map-get($mdc-typography-styles, $style);

  // 만약 $mdc-typography-styles 맵에 없는 키면 에러를 띄움
  @if not map-has-key($mdc-typography-styles, $style) {
    @error "Invalid style specified! Choose one of #{map-keys($mdc-typography-styles)}";
  }

  @include mdc-typography-base;

  // $style-props(예: display4) 맵의 각 키와 일치하는 값을 각 속성의 값으로 지정함
  font-size: map-get($style-props, font-size);
  font-weight: #{map-get($style-props, font-weight)};
  letter-spacing: map-get($style-props, letter-spacing);
  line-height: map-get($style-props, line-height);
}
```

#### 사용 예

```scss
.mdc-typography--display4 {
  @include mdc-typography(display4);
}
```

```css
/* css 컴파일 */
.mdc-typography--display4 {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 7rem;
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 7rem;
}
```
### [mixin] mdc-typography-adjust-margin

```scss
@mixin mdc-typography-adjust-margin($style) {
  // _variables.scss에 정의된 $mdc-typography-styles 맵에서
  // 인자 $style와 일치하는 키(예: display4)의 값 중 margin의 값을 속성 값으로 지정함
  margin: map-get(map-get($mdc-typography-styles, $style), margin);
}
```

#### 사용 예

```scss
.mdc-typography--adjust-margin.mdc-typography--display4 {
  @include mdc-typography-adjust-margin(display4);
}
```

```css
/* css 컴파일 */
.mdc-typography--adjust-margin.mdc-typography--display4 {
  margin: -1rem 0 3.5rem -0.085em;
}
```
***

+ [머티리얼 디자인 : 타이포그래피](http://davidlab.net/google-design-ko/style/typography.html)
+ [font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)

```css
/* Chrome, Firefox Antialiasing */
* {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
```