# RTL

MDC-web 컴포넌트 내에서 RTL(Right-to-Left)/ 양방향 레이아웃을 지원하기 위해 Sass 믹스인을 제공한다.

> [참고 : 구글 디자인 양 방향성](http://davidlab.net/google-design-ko/usability/bidirectionality.html)

## mdc-rtl

MDC-web 컴포넌트가 RTL 레이아웃의 컨텍스트 내에 있을 때 적용 될 규칙을 만듦

```scss
@mixin mdc-rtl($root-selector: null) { // 지정된 루트 셀렉터를 받아서
  // 지정된 루트 셀렉터가 있으면
  @if ($root-selector) { 
    // 최상위 루트에 블록 안 구문을 내보낸다.
    // '[dir="rtl"] 지정루트셀렉터 부모요소참조, 지정루트셀렉터[dir="trl"] 부모요소참조'
    @at-root {
      [dir="rtl"] #{$root-selector} &,
      #{$root-selector}[dir="rtl"] & {
        @content;
      }
    }
  }
  // 지정된 루트 셀렉터가 없으면 '[dir="rtl"] 부모요소참조, 부모요소참조[dir="trl"]' 에 스타일을 지정한다.
  @else { 
    [dir="rtl"] &,
    &[dir="rtl"] {
      @content;
    }
  }
}
```

### 사용 예

```scss
.mdc-foo {
  position: absolute;
  left: 0;
  @include mdc-rtl {
    left: auto;
    right: 0; // right 기준으로
  }
  &__bar {
    margin-left: 4px;
    @include mdc-rtl(".mdc-foo") {
      margin-left: auto;
      margin-right: 4px;
    }
  }
}
```
```css
/* css 컴파일 */
.mdc-foo {
  position: absolute;
  left: 0;
}
[dir="rtl"] .mdc-foo, .mdc-foo[dir="rtl"] {
  left: auto;
  right: 0;
}
.mdc-foo__bar {
  margin-left: 4px;
}
[dir="rtl"] .mdc-foo .mdc-foo__bar, .mdc-foo[dir="rtl"] .mdc-foo__bar {
  margin-left: auto;
  margin-right: 4px; 
}
```

※ **주의** : 조상 엘리먼트의 [dir="rtl"] 확인은 대부분의 경우 동작하며, 복잡한 레이아웃의 경우 부정적인 결과를 초래할 수 있다.

> 앞으로는 '[:dir](https://developer.mozilla.org/ko/docs/Web/CSS/:dir)'같은 선택자가 이와 같은 문제를 완화하는 데 도움이 될 거라고 생각 됨

```html
<html dir="rtl">
  <!-- ... -->
  <body>
    <div dir="ltr">
      <div class="mdc-foo">RTL 형식이 잘못 되었음!!</div>
    </div>
  </body>
</html>
```

## mdc-rtl-reflexive-box 

기본 박스 모델 속성(예: margin / border/ padding)과 기본 방향을 `#{$base-property} - #{$default-direction}`로   
조합하여 값을 적용하지만, RTL 컨텍스트 내에서는 방향을 반전하는 규칙을 내보낸다. 

```scss
// $base-property : 박스모델 속성(margin / border/ padding)
// $default-direction : 기본 방향 값 (left / right)
// $value : 박스모델 속성 방향 속성에 넣을 값
@mixin mdc-rtl-reflexive-box($base-property, $default-direction, $value, $root-selector: null) {
  // $default-direction값이 right, left 중에 없으면 에러를 출력
  @if (index((right, left), $default-direction) == null) {
    @error "Invalid default direction #{default-direction}. Please specifiy either right or left";
  }
  // $left-vaule 에 값을 저장하는데
  $left-value: $value;
  $right-value: 0;

  // 만약 $default-direction 값이 right면 $right-value에 $value 값을 저장 
  @if ($default-direction == right) {
    $left-value: 0;
    $right-value: $value;
  }
  // mdc-rtl-reflexive-property 믹스인 사용
  @include mdc-rtl-reflexive-property($base-property, $left-value, $right-value, $root-selector);
}
```

### 예시
```scss
.mdc-foo {
  @include mdc-rtl-reflexive-box(margin, left, 8px);
}

// 다음과 같다
.mdc-foo {
  margin-left: 8px;
  @include mdc-rtl {
    margin-right: 8px;
    margin-left: 0;
  }
}
```

```css
/* css 컴파일 */
.mdc-foo {
  margin-left: 8px;
  margin-right: 0;
}

[dir="rtl"] .mdc-foo, .mdc-foo[dir="rtl"] {
  margin-left: 0;
  margin-right: 8px;
}
```

※ `mdc-rtl`에 전달 될 4번째 선택적인 인자(`$root-selector`)를 전달할 수도 있다.  
(예. @include mdc-rtl-reflexive-box-property(margin, left, 8px, ".mdc-component")

※ 이 함수는 항상 RTL컨텍스트의 원래 값을 0으로 만든다, 값을 뒤집으려면 `mdc-rtl-reflexive-property`를 사용한다.

## mdc-rtl-reflexive-property

LTR 컨텍스트에서 기본 속성을 가져와서 -left및 -right 로 할당하는 규칙을 내보냄,  
RTL 컨텍스트에서 그 반대의 경우도 마찬가지

```scss
@mixin mdc-rtl-reflexive-property($base-property, $left-value, $right-value, $root-selector: null) {
  $prop-left: #{$base-property}-left;
  $prop-right: #{$base-property}-right;

  @include mdc-rtl-reflexive_($prop-left, $left-value, $prop-right, $right-value, $root-selector);
}
```

### 예제

```scss
.mdc-foo { 
  @include mdc-rtl-reflexive-property(margin, auto, 12px); 
} 

// 다음과 같다
.mdc-foo { 
  margin-left: auto; 
  margin-right: 12px; 
  @include mdc-rtl { 
    margin-left: 12px; 
    margin-right: auto; 
  } 
}
```

```css
/* css 컴파일 */
.mdc-foo {
  margin-left: auto;
  margin-right: 12px;
}

[dir="rtl"] .mdc-foo, .mdc-foo[dir="rtl"] {
  margin-left: 12px;
  margin-right: auto;
}
```

## mdc-rtl-reflexive-position

값뿐만 아니라 수평 위치 속성(left 또는 right)을 지정하는 인수를 취하여  
LTR 컨텍스트의 지정된 위치에 값을 적용하고 RTL 컨텍스트에서는 전환함

```scss
// $pos(right / left)
@mixin mdc-rtl-reflexive-position($pos, $value, $root-selector: null) {
  // $pos의 값이 right, left 중에 없으면 에러를 출력
  @if (index((right, left), $pos) == null) {
    @error "Invalid position #{pos}. Please specifiy either right or left";
  }
  // $left-value에 값을 담음
  $left-value: $value;
  $right-value: initial;

  // pos의 값이 right일 경우 $right-value에 값을 담음
  @if ($pos == right) {
    $right-value: $value;
    $left-value: initial;
  }

  @include mdc-rtl-reflexive_(left, $left-value, right, $right-value, $root-selector);
}
```

### 예제

```scss
.mdc-foo { 
  @include mdc-rtl-reflexive-position(left, 0); 
  position: absolute; 
}

// 다음과 같다
.mdc-foo { 
  left: 0; 
  right: initial; 
  position: absolute; 
  @include mdc-rtl { 
    left: initial; 
    right: 0;
  } 
}
```

```css
/* css 컴파일 */
.mdc-foo {
  left: 0;
  right: initial;
  position: absolute;
}

[dir="rtl"] .mdc-foo, .mdc-foo[dir="rtl"] {
  left: initial;
  right: 0;
}
```

## mdc-rtl-reflexive_

`mdc-rtl-reflexive-property` 믹스인 사용 시에 각 left, right 값을  
`$left-property`(#{$base-property}-left), `$right-property`(#{$base-property}-right)의 값으로 담음  
(예. margin-left, margin-right)

```scss
@mixin mdc-rtl-reflexive_(
  $left-property,
  $left-value,
  $right-property,
  $right-value,
  $root-selector: null
) {
  #{$left-property}: $left-value;
  #{$right-property}: $right-value;

  @include mdc-rtl($root-selector) {
    #{$left-property}: $right-value;
    #{$right-property}: $left-value;
  }
}
```
***

+ [@at-root](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#at-root) :   
부모 선택자 아래에 중첩되는 것이 아니라 문서의 최상위 루트에 중첩된 규칙 모음을 내보낸다.

```scss
.parent {
  content: 'parent';
  @at-root .child {
    content: 'child';
  }
}
```
```css
/* css 컴파일 */
.parent {
  content: 'parent';
}
.child {
  content: 'child';
}
```

+ [dir](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/dir)