# chrome-extension-starter
chrome extension을 위한 starter repository입니다.

# chrome-extension 만들기

## chrome-extension 프로젝트 구성
- manifest.json : 확장 프로그램의 이름, 버전, 메인 html, 이미지 로고, 권한 등을 정의(필수)
- <<icon명>>.img : 툴바 로고 이미지 파일, 해상도별로 나누어 관리 가능 (선택)
- <<메인 html 파일명>>.html : 툴바 로고 클릭 시 보여질 확장 프로그램의 메인 html 파일
- <<메인 js 파일명>>.js : 확장 프로그램의 로직을 정의한 js 파일, cdn 보다는 로컬 js 파일을 사용하는 것이 좋음

## manifest.json 파일 작성하기
- https://developer.chrome.com/docs/extensions/mv3/manifest/
### 핵심 속성 설명
- action : 툴바의 확장 프로그램 로고를 클릭 시, 표시될 html 파일과 로고 이미지, 제목을 정의한다.
- icons : chrome web store에서 표시될 아이콘 이미지를 해상도별로 정의한다.
- background : 백그라운드로 실행되어야 할 .js 파일을 정의한다.
````
{
// 제작자명 (필수?)
    "author": "<<제작자명>>",
    "manifest_version": 3,
// 기본 언어
    "default_locale": "ko",
// 확장 프로그램명
    "name": "__MSG_extension_name__",
// 확장 프로그램 축약명
    "short_name": "__MSG_extension_sname__",
// 확장 프로그램 설명
    "description": "__MSG_extension_desc__",
// 버전 정보 (필수)
    "version": "0.0.1",
// 버전명
    "version_name": "preview",
// 브라우저 행동 (필수)
// "default_popup"과 같이, 기본적으로 출력할 html 파일 지정
    "browser_action": {
        "default_icon": "symbol_color.png",
        "default_popup": "popup.html"
    },
//
    "icons": {
        "128": "symbol_color.png"
    },

    "options_ui": {
        "chrome_style": true,
        "page": "options.html"
    },

    "permissions": [
        "activeTab", "http://*/*", "https://*/*"
    ],

    "content_scripts": [{
        "matches": ["file://home.html"],
        "js": ["scripts.js"],
        "css": ["css.css"]
    }],

    "background": {
        "scripts": ["background.js"],
    }
}


{
  // Required
  "manifest_version": <<manifest 파일 형식의 버전을 지정하는 정수값, 최신 포멧 3으로 고정 ex. 3>>,
  "name": "<<확장 프로그램명 ex. My First Extension >>",
  "version": "<<버전 ex.0.0.1>>",

  // Recommended
  "action": {
    "default_icon": {              // optional
      "16": "<<해상도별 툴바 icon경로명 ex.images/icon16.png>>",   // optional
      "24": "<<해상도별 툴바 icon경로명 ex.images/icon24.png>>",   // optional
      "32": "<<해상도별 툴바 icon경로명 ex.images/icon32.png>>"    // optional
    },
    "default_title": "<<툴팁에서 보여질 텍스트 ex. Click Me>>",   // optional, shown in tooltip
    "default_popup": "<<기본으로 보여질 html명 ex. popup.html>>"  // optional
  },
  "default_locale": "<<기본 언어 ex. en>>",
  "description": "<<확장 프로그램 설명 ex. A plain text description>>",
  "icons": {
    "16": "<<해상도별 Webstore icon경로명 ex.icon16.png>>",
    "32": "<<해상도별 Webstore icon경로명 ex.icon32.png>>",
    "48": "<<해상도별 Webstore icon경로명 ex.icon48.png>>",
    "128": "<<해상도별 Webstore icon경로명 ex.icon128.png>>",
  },
  // Optional
  "author": "<<제작자명 ex. gildong hong>>",
  "automation": ...,
  "background": {
    // Required
    "service_worker": "<<백그라운드에서 실행될 js 파일경로명 ex.background.js>>",
    // Optional
    "type": "<<백그라운드 js 파일을 전역이 아닌, import/export 가능한 ES6 모듈 형태로 실행시킬 경우 module이라고 타입 명시 ex. module>>"
  },
  "chrome_settings_overrides": {...}, // 검색 엔진 설정인 듯?
  "chrome_url_overrides": {...},
  "commands": {
    "<<단축키로 실행할 명령어 ex. run-foo>>": { // chrome.commands.onCommand.addListener((command) => { ... });
      "suggested_key": {
        "default": "<<기본 단축키 조합 ex.Ctrl+Shift+Y>>",
        "mac": "<<특정 os일 경우, 기본 단축키 조합 ex.Command+Shift+Y>>"
      },
      "description": "<<단축키 설명 ex.Run \"foo\" on the current page.>>"
    },
    "<<툴바 아이콘 클릭 명령어(v3 예약어 고정) ex._execute_action": {
      "suggested_key": {
        "windows": "Ctrl+Shift+Y",
        "mac": "Command+Shift+Y",
        "chromeos": "Ctrl+Shift+U",
        "linux": "Ctrl+Shift+J"
      }
    }
  },
  "content_capabilities": ...,
  "content_scripts": [
   {
     "matches": ["<<커스텀 스크립트를 inject할 url 주소 목록 ex. https://*.nytimes.com/*>>"],
     "css": ["<<inject할 커스텀 css 경로명  ex. my-styles.css>>"],
     "js": ["<<inject할 커스텀 js 경로명 ex. content-script.js>>"]
   }
  ],
  "content_security_policy": {...}, // background.js와 popup.html에 해당하는 CSP 정책
  "converted_from_user_script": ..., 
  "cross_origin_embedder_policy": {"value": "require-corp"},
  "cross_origin_opener_policy": {"value": "same-origin"}, // CORS 정책
  "current_locale": ...,
  "declarative_net_request": ...,
  "devtools_page": "devtools.html", // 커스텀 개발자 도구 필요시?
  "differential_fingerprint": ...,
  "event_rules": [{...}],
  "externally_connectable": { // 외부에서 해당 Extension으로 connect 또는 sendMessage 형식으로 연결할 수 있는 App, Web, Extension 정의
    "matches": [
      "<<외부에서 해당 extension으로 접근할 주소 ex. https://*.google.com/*>>",
    ],
  },
  "file_browser_handlers": [...], // 파일 첨부가 필요할 경우, 세부 정책 정의
  "file_system_provider_capabilities": {
    "configurable": true,
    "multiple_mounts": true,
    "source": "network"
  },
  "homepage_url": "https://path/to/homepage",
  "host_permissions": [...],
  "import": [{"id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}],
  "incognito": "spanning, split, or not_allowed",
  "input_components": ...,
  "key": "publicKey",
  "minimum_chrome_version": "versionString",
  "nacl_modules": [...],
  "natively_connectable": ...,
  "oauth2": ...,
  "offline_enabled": true,
  "omnibox": {
    "keyword": "aString"
  },
  "optional_host_permissions": ["..."],
  "optional_permissions": ["tabs"],
  "options_page": "options.html",
  "options_ui": {
    "page": "options.html"
  },
  "permissions": ["tabs"],
  "platforms": ...,
  "replacement_web_app": ...,
  "requirements": {...},
  "sandbox": [...],
  "short_name": "Short Name",
  "storage": {
    "managed_schema": "schema.json"
  },
  "system_indicator": ...,
  "tts_engine": {...},
  "update_url": "https://path/to/updateInfo.xml",
  "version_name": "aString",
  "web_accessible_resources": [...]
}
````

## 로컬 테스트 하기
- 모든 파일(.manifest, .html, .js, .img)을 프로젝트 폴더에 넣는다.
- 크롬 주소창에서 "chrome://extensions"로 이동
- "개발자 모드" 체크
- "압축 해제된 확장 프로그램 로드..." 버튼 클릭 후, 프로젝트 폴더 설정
- 브라우저 내에 추가된 확장 프로그램으로 테스트 진행

## 배포하기

## Tip
- "__MSG_extension_desc__" 형식의 값을 사용하면, 다국어 지원 가능하다.


