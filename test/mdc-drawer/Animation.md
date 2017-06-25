# Animation

MDC Animation은 Sass/CSS/JavaScript 라이브러리로 [모션 가이드라인](https://material.io/guidelines/motion/duration-easing.html#)을 기반으로  
Material Design 애니메이션을 위한 툴뱃을 제공한다.  
현재는 easing curves만 커버한다.

## 사용

### variables

| 변수 이름 | timing function | 사용 |
| -------- | --------------- | --- |
| $mdc-animation-linear-out-slow-in-timing-function | cubic-bezier(0, 0, .2, 1) !default | 표준 곡선; 시작부터 끝까지 볼 수 있는 모든 애니메이션 (예. FAB가 툴바로 변환 ) |
| $mdc-animation-fast-out-slow-in-timing-function | cubic-bezier(.4, 0, .2, 1) !default | 오브젝트가 화면에 들어가게 하는 애니메이션 ( 예. fade in ) |
| $mdc-animation-fast-out-linear-in-timing-function | cubic-bezier(.4, 0, 1, 1) !default } | 오브젝트가 화면을 떠나는 애니메이션 (예. fade out) |
***

사용 시 해당 변수를 `animation-timing-function` 속성에 할당하기만 하여 됨

```scss
.mdc-thing-animating {
    animation: foo 17ms $mdc-animation-fast-out-slow-in-timing-function;
}
```

### mixins

```scss
@mixin mdc-animation-linear-out-slow-in {
  animation-timing-function: $mdc-animation-linear-out-slow-in-timing-function;
}

@mixin mdc-animation-fast-out-slow-in {
  animation-timing-function: $mdc-animation-fast-out-slow-in-timing-function;
}

@mixin mdc-animation-fast-out-linear-in {
  animation-timing-function: $mdc-animation-fast-out-linear-in-timing-function;
}
```

모든 믹스인은 `-timing-function` 접미사 없이 해당 변수와 동일한 이름을 가지고 있음

```scss
.mdc-thing-on-screen {
    @include mdc-animation-fast-out-linear-in;
}
```

### functions

MDC Animation은 무언가가 프레임에 들어가거나 나올 때 트랜지션을 정의하는 도우미 함수를 제공한다. 
예를 들어 불투명도를 사용해 페이드인 하거나 페이드 아웃하는 것이다.

```scss
@function mdc-animation-enter($name, $duration, $delay: 0ms) {
  @return $name $duration $delay $mdc-animation-linear-out-slow-in-timing-function;
}

@function mdc-animation-exit($name, $duration, $delay: 0ms) {
  @return $name $duration $delay $mdc-animation-fast-out-linear-in-timing-function;
}
```

```scss
.mdc-thing {
    transition: mdc-animation-exit(opacity, 175ms, 150ms);
    opacity: 0;
    will-change: opacity;
    &:active {
        transition: mdc-animation-enter(opacity, 175ms);
        opacity: 1;
    }
}
```

```css
/* css 컴파일 */
.mdc-thing {
  transition: opacity 175ms 150ms cubic-bezier(0.4, 0, 1, 1);
  opacity: 0;
  will-change: opacity;
}

.mdc-thing:active {
  transition: opacity 175ms 0ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
```

이 함수는 애니메이션 속성에서도 작동함

```scss
@keyframes fade-in {
    from {
        transform: translateY(-80px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
.mdc-thing {
    animation: mdc-animation-enter(fade-in, 350ms);
}
```

```css
/* css 컴파일 */
@keyframes fade-in {
  from {
    transform: translateY(-80px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.mdc-thing {
  animation: fade-in 350ms 0ms cubic-bezier(0, 0, 0.2, 1);
}
```

### CSS Classes

NPM을 통해 설치된 dist/ 폴더에 mdc-animation.css를 불러옴

```html
<link href="path/to/mdc-animation/dist/mdc-animation.css" rel="stylesheet">
<!-- ... -->
<div id="my-animating-div" class="mdc-animation-fast-out-slow-in">hi</div>
```
***

+ [Easing Functions 치트시트](http://easings.net/ko)
+ will-change : 
    - [MDN : will-change](https://developer.mozilla.org/ko/docs/Web/CSS/will-change)
    - [will-change 프로터피에 관해 알아둬야할 것](https://dev.opera.com/articles/ko/css-will-change-property/)