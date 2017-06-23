# Animation

MDC Animation은 Sass/CSS/JavaScript 라이브러리로 [모션 가이드라인](https://material.io/guidelines/motion/duration-easing.html#)을 기반으로  
Material Design 애니메이션을 위한 툴뱃을 제공한다.  
현재는 easing curves만 커버한다.

## 사용

### 변수
| 변수 이름 | timing function | 사용 |
| -------- | --------------- | --- |
| $mdc-animation-linear-out-slow-in-timing-function | cubic-bezier(0, 0, .2, 1) !default | 표준 곡선; 시작부터 끝까지 볼 수 있는 모든 애니메이션 (예. FAB가 툴바로 변환 ) |
| $mdc-animation-fast-out-slow-in-timing-function | cubic-bezier(.4, 0, .2, 1) !default | 오브젝트가 화면에 들어가게 하는 애니메이션 ( 예. fade in ) |
| $mdc-animation-fast-out-linear-in-timing-function | cubic-bezier(.4, 0, 1, 1) !default } | 오브젝트가 화면을 떠나는 애니메이션 (예. fade out) |
***

+ [Easing Functions 치트시트](http://easings.net/ko)