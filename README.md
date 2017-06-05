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

### package.json scripts

+ sass : node-sass 명령어
+ watch : node-sass watch
+ server : [http-server](https://github.com/indexzero/http-server) -o(open browser window option)
+ sassdoc : [sassdoc](http://sassdoc.com/getting-started/) 디렉토리 생성 명령어
+ start : [parallelshell](https://github.com/keithamus/parallelshell) 사용으로 병렬적으로 node-sass 와칭하면서 http-server 실행

```sp
  "scripts": {
    "sass": "node-sass --output-style expanded --source-map true -r sass -o css",
    "watch": "npm run sass -- -w",
    "server": "httpe-server -o",
    "sassdoc": "sassdoc sass --dest sassdoc '!sass/vendor/*",
    "start": "parallelshell \"npm run watch\" \"npm run server\""
  }
```
[슬쩍 떠보는 npm 과 package.json](https://elegantcoder.com/beginning-npm-package/)
[why npm scripts](https://css-tricks.com/why-npm-scripts/)

***
[codepen](https://codepen.io/chiabi88/project/editor/Xmbykw/)