# Sass project

## Sass 프로젝트 구조

```
sass/
├── base/
│   └── ...
├── components/
│   └── ...
├── global/
│   ├── function/
│   │   └── ...
│   ├── mixin/
│   │   └── ...
│   └── _variable.scss
├── layout/
│   └── ...
└── vendor/
│   └── ...
└── style.scss
```

##### Base

리셋 파일, 타이포그래피 규칙 등 HTML 요소에 대한 표준 스타일을 정의하는 스타일시트

+ `_base.scss`
+ `_reset.scss, normalize.scss`
+ `_typography.scss`

##### Components

작은 컴퍼넌트 들. 위젯, 슬라이더, 로더, 버튼 등 모듈들

+ `_product-list.scss`

##### Global

function, mixin, 변수, 플레이스홀더 등, 컴파일 시 CSS로 산출되지 않는 Sass helper들

+ `function/`
+ `mixin/`
+ `_variables.scss`
+ `_placeholder.scss`

##### Layout

레이아웃에 기여하는 모든 것들

+ `_global.scss`
+ `_header.scss`
+ `_footer.scss`

##### vendor

외부 라이브러리 및 프레임 워크

+ `_bootstrap.scss`
+ `_jquery-ui.scss`