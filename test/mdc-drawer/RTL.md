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
    <div dir="rtl">
      <div class="mdc-foo">RTL 형식이 잘못 되었음!!</div>
    </div>
  </body>
</html>
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