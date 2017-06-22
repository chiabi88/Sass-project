# Theme

> [원문](https://material-components-web.appspot.com/theme.html)  
> [참고: Theme 데모](https://material-components-web.appspot.com/theme.html)

MDC Theme는 MDC-Web 컴포넌트에 테마를 제공하고 개발자가  
Sass 함수와 믹스인, CSS 사용자 정의 속성 및 CSS 클래스 세트를 사용할 수 있도록 하는 기본 모듈

이 모듈 색상은 MDC-Web의 세가지 테마 색상에서 파생된다.

* **Primary** : 기본 색상, 앱 막대와 같은 여러 UI 요소에 적용됨
* **Accent** : 강조색상, [FAB](http://davidlab.net/google-design-ko/components/buttons-floating-action-button.html)와 같은 UI 요소에 적용됨
* **Background** : 배경색, UI위에 그려지는 색

테마 색상을 배경으로 사용할 때 대비가 충분한 텍스트 색상을 선택하는 것이 중요함  
또한 텍스트 스타일을 고려하는 것도 중요함

* **Primary** : 대부분의 텍스트에 사용됨
* **Secondary** : 시각적 계층 구조에서 더 낮은 텍스트에 사용됨
* **Hint** :  텍스트 힌트에 사용 됨(텍스트 필드와 라벨 같은)
* **Disabled** : 컴포넌트와 컨텐츠에서 비활성화 된 텍스트에 사용
* **Icon** : 아이콘에 사용됨

※ 기본 색상과 기본 텍스트를 혼동하지 말 것,  
전자는 시각적인 정체성을 확립하고 애플리케이션에 많은 부분을 색칠하는 데 사용되는 기본 테마색을 나타냄  
후자는 가장 눈에 띄는(낮은 불투명도, 높은 대비) 텍스트 스타일을 말하며 대부분의 컨텐츠를 표시하는 데 사용됨

텍스트 대조 색상은 Sass level에서 자동으로 계산되고 이 모듈의 일부로 노출 됨

## 사용

**Sass 구성**
> _constants.scss  
> _functions.scss  
> _variables.scss  
> _mixins.scss  

### 테마 컬러 변경

MDC Theme를 사용하면 애플리케이션의 테마 색상을 쉽게 변경하고  
모든 MDC-Web 구성 요소에 변경사항을 적용할 수 있음

```scss
// _variables.scss
$mdc-theme-primary: #3f51b5 !default; /* Indigo 500 */
$mdc-theme-accent: #ff4081 !default; /* Pink A200 */
$mdc-theme-background: #fff !default; /* White */

// .....
// .....

$mdc-theme-primary: #9c27b0;
$mdc-theme-accent: #ffab40;
$mdc-theme-background: #fff;

@import "@material/theme/mdc-theme";
```

※ 제공된 텍스트 색은 제공된 테마 색을 기반으로 자동으로 계산 됨

### [mixin] mdc-theme-prop

속성에 테마 색상을 적용하는 데 사용  
믹스인은 _속성이름을 첫번째 매개변수_ 로 사용하고 원하는 _색상을 두번째 매개 변수_ 로 사용  
`!important`를 값에 적용하는지 여부를 결정하는 Boolean 매개 변수(선택 사항)가 있음

`$property`는 일반적으로 `color`나 `background-color`이지만 색상 값을 허용하는 CSS 속성일 수 있음  
`$style`는 `$mdc-theme-property-values`(_variables.scss) 맵의 키 중 하나여야한다.

```scss
// _variables.scss
// 각 테마 색상의 기본 텍스트 색상
$mdc-theme-property-values: (
  primary: $mdc-theme-primary,
  accent: $mdc-theme-accent,
  background: $mdc-theme-background,
  // .....
)

// mixins.scss
@mixin mdc-theme-prop($property, $style, $important: false) {
  // 만약 $mdc-theme-property-valuse(맵)에 $style(키)이 없으면 에러를 출력
  @if not map-has-key($mdc-theme-property-values, $style) {
    @error "Invalid style specified! Choose one of #{map-keys($mdc-theme-property-values)}";
  }

  // $important가 true이면 속성에 '!important'추가
  @if $important {
    #{$property}: map-get($mdc-theme-property-values, $style) !important;
    #{$property}: var(--mdc-theme-#{$style}, map-get($mdc-theme-property-values, $style)) !important;
  }

  // 아니면 '!important'없는 값을 출력함
  // '$property'속성에 '$mdc-theme-property-values' 맵에서 $style키의 값을 출력
  @else {
    #{$property}: map-get($mdc-theme-property-values, $style);
    #{$property}: var(--mdc-theme-#{$style}, map-get($mdc-theme-property-values, $style));
  }
}
```

#### 사용 예

`.foo`의 배경색을 기본 색상으로 설정하고 텍스트 색상을 기본 텍스트에 맞게 설정하려고 할 때

```scss
$mdc-theme-primary: #9c27b0;
$mdc-theme-accent: #ffab40;
$mdc-theme-background: #ffffff;

.foo {
  @include mdc-theme-prop(background-color, primary);
  @include mdc-theme-prop(color, text-primary-on-primary);
}
```
```css
/* css 컴파일 */
.foo {
  background-color: #9c27b0;
  background-color: var(--mdc-theme-primary);
  color: #ffffff;
  color: var(--mdc-theme-text-primary-on-primary);
}
```

※ 생성된 코드는 CSS를 지원하는 브라우저에 CSS 사용자 정의속성을 사용함  
지원하지 않는 경우 사전 처리 된 정적 색상으로 대체된다.

### [mixin] mdc-theme-dark

MDC-Web 컴포넌트 개발에 대부분 사용되며, 컴포넌트에 어두운 테마를 적용하는 표준 방법을 제공한다.  
(※ `mdc-theme-dark`는 테마와 관련 된 배경색을 변경하지 않는다.)

대신 `mdc-theme-dark`와 CSS 클래스는 페이지의 특정 섹션이나 페이지 처리가 배경처럼 어두운 색상을 사용한 경우 사용하도록 되어 있다.  
여기서 우리가 사용하는 기본 색상은 의미가 없다.

구성 요소에 적합한 선택자를 만들고 내부에 제공된 내용을 적용한다.

```scss
// $root-selector: 베이스 선택자가 아닐 경우 전달
// $compound: Modifier 클래스와 함께 사용하는 경우 true전달

@mixin mdc-theme-dark($root-selector: null, $compound: false) {
  // 만약 지정한 베이스 선택자가 있으면
  @if ($root-selector) {
    // 루트에 다음 블록 구문을 추가
    @at-root {
      // compound가 true이면
      // [베이스 선택자]--theme-dark[부모요소참조], .mdc-theme-dark [부모요소 참조]에 구문을 추가
      @if ($compound) {
        #{$root-selector}--theme-dark#{&},
        .mdc-theme--dark & {
          @content;
        }
      }
      // [베이스 선택자]--theme-dark [부모요소 참조], .mdc-theme-dark [부모요소 참조]
      @else {
        #{$root-selector}--theme-dark &,
        .mdc-theme--dark & {
          @content;
        }
      }
    }
  }
  // 베이스 선택자 없으면 
  // [부모요소참조]--theme-dark, .mdc-theme--dark [부모요소참조]에 구문을 추가
  @else {
    &--theme-dark,
    .mdc-theme--dark & {
      @content;
    }
  }
}
```

#### 사용 예

```scss
.mdc-foo {
  color: black;

  @include mdc-theme-dark {
    color: white;
  }
  &__bar {
    background: black;
    // 베이스 선택자가 아닌 다른 것에 믹스인을 사용하는 경우 베이스 선택자를 매개 변수로 지정해야함
    @include mdc-theme-dart(".mdc-foo") {
      background: white;
    }
  }
}
.mdc-foo--disabled {
  opacity: 0.38;
  // Modifier 클래스에 믹스인을 사용하는 경우 두번째 인자에 true를 전달  
  // 믹스인에 혼합 클래스를 자손선택자가 아닌 멀티 클래스로 취급하도록 함
  @include mdc-theme-dark(".mdc-foo", /* $compound: */ true) {
    opacity: 0.5;
  }
}
```
```css
/* css 컴파일 */
.mdc-foo {
  color: black;
}
.mdc-foo--theme-dark ,
.mdc-theme--dark .mdc-foo {
  color: white;
}
.mdc-foo__bar {
  background: black;
}
.mdc-foo--theme-dark .mdc-foo__bar,
.mdc-theme--dark .mdc-foo__bar {
  background: white;
}

.mdc-foo--disabled {
  opacity: 0.38;
}
.mdc-foo--theme-dark.mdc-foo--disabled,
.mdc-theme--dark .mdc-foo-disabled {
  opacity: 0.5;
}
```

사용자는 다음과 같이 구체적으로 타켓팅해서 어두운 테마를 컴포넌트에 적용할 수 있다.

```html
<div class="mdc-foo mdc-foo--theme-dark"></div>
```

또는 mdc-theme--dark 전역 Modifier 클래스를 사용하여 부모 요소 아래의 모든 항목에 적용한다. 

```html
<body class="mdc-theme--dark">
  <div class="mdc-foo"></div>
</body>
```


***

+ [Sass Scrip Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)
  - map-has-key($map, $key) : 맵이 지정된 키를 가지는 지 여부를 확인
  - map-get($map, $key) : 지정된 키에 관련된 맵 내의 값을 리턴함 (키가 없을 경우 null 리턴)
  -  map-keys($map) : 맵 내의 모든 키 리스트를 리턴함

+ var() :  
CSS 변수는 CSS작성자가 정의한 문서 전체에서 재사용 할 특정 값을 포함하는 엔티티  
커스텀 속성 표기법(예: --main-color: black;) 을 사용하여 설정되면  
var() 함수(예: var(--main-color);) 를 사용하여 액세스 할 수 있다.
※ No support - IE, IE Phone  
  - [var()](https://developer.mozilla.org/ko/docs/Web/CSS/var)  
  - [Using CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)

```css
.element1 {
  --main-bg-color: brown;
}
.element2 {
  background-color: var(--main-bg-color);
}
```

