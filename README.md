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
- content_scripts : inject할 주소와 커스텀 .js 파일, .css 파일 경로를 정의한다.
- host_permissions : permission을 적용할 페이지 주소 목록을 정의(* 사용 가능)
- permissions : extension에서 사용할 크롬브라우저 기능에 대한 권한에 대한 목록을 정의
- background : 백그라운드로 실행되어야 할 .js 파일을 정의한다.

### 핵심만 간추린 manifest.json 예시
````
{
    "author": "Sangdeok Jeong",
    
    "manifest_version": 3,
    
    "default_locale": "ko",
    
    "name": "__MSG_extension_name__",
    
    "short_name": "__MSG_extension_sname__",
    
    "description": "__MSG_extension_desc__",
    
    "version": "0.0.1",
    
    "version_name": "preview",
    
    "action": {
        "default_icon": {             
          "16": "icons/app_icon16.png",
          "24": "icons/app_icon24.png", 
          "32": "icons/app_icon32.png"   
        },
        "default_title": "Click Me",
        "default_popup": "html/popup.html"
    },
    
    "icons": {
        "128": "icons/app_icon128.png"
    },

    "options_ui": {
        "page": "html/options.html",
        "open_in_tab": false
    },

    "host_permissions" : [
        "http://*/*", 
        "https://*/*",
    ],
    
    "permissions": [
        "activeTab",
        "experimental"
    ],

    "content_scripts": [{
        "matches": ["file://home.html"],
        "js": ["js/content-script.js"],
        "css": ["css/content-script.css"]
    }],

    "background": {
        "service_worker": "background.js",
    }
}


````

### 속성별 설명
````
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
  "host_permissions": [<<permission을 적용할 페이지 주소 목록 ex."https://*/", "https://www.google.com/">>],
  "import": [{"id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}],
  "incognito": "spanning, split, or not_allowed",
  "input_components": ...,
  "key": "publicKey",
  "minimum_chrome_version": "versionString",
  
  // 외부 Native Module을 연동하여 사용 가능하다.
  "nacl_modules": [{
            "path": "OpenOfficeViewer.nmf",
            "mime_type": "application/vnd.oasis.opendocument.spreadsheet"
  }],
  
  "natively_connectable": ...,
  "oauth2": ...,
  "offline_enabled": true,
  "omnibox": { 
    "keyword": "<<주소창에 키워드 설정 ex.aString>>" //chrome.omnibox API를 통해, 해당 keyword가 입력되었을 경우 동작을 처리할 수 있다.
  },
  "optional_host_permissions": ["..."],
  "optional_permissions": ["tabs", "storage"], // 필수 권한이 아닌 경우 정의(permissions에도 동일하게 정의 필요), 코드 상에서 chrome.permissions API를 통해 조회, 요청, 삭제가 가능하다.
  "options_page": "<< toolbar 우클릭 후, 볼수 있는 옵션 페이지를 만들기 원하는 경우 ex.options.html>>",
  "options_ui": { // open_in_tab 설정을 비활성화 하려면, options_page가 아닌 options_ui 속성을 사용한
    "page": "options.html",
    "open_in_tab": false
  },
  "permissions": [<< extension에서 필요한 권한명 정의 ex. "tabs">>],
  "platforms": ...,
  "replacement_web_app": ...,
  "requirements": {...}, // 3D, grape api 필요한 경우, 명시해주어야 함
  "sandbox": { // CSP 설정과 관련된 속성으로써, eval()과 inline script 등을 sandbox된 page에서는 사용할 수 있게 한다.
    "pages": [
      "<< .js, .css 파일을 제외한 페이지 파일 경로 ex. page1.html>>",
      "<< .js, .css 파일을 제외한 페이지 파일 경로 ex. directory/page2.html>>"
    ]
  },
  "short_name": "<<요약된 extension 명 ex. Short Name>>",
  "storage": { // local storage가 아닌 따로 managed storage를 사용하려면, extension에서 정의한 schema 파일을 만들고, 매핑 필요
    "managed_schema": "schema.json"
  },
  "system_indicator": ...,
  "tts_engine": {...}, //tts 엔진 기능 사용하고 싶은 경우, 상세 설정
  "update_url": "https://path/to/updateInfo.xml",
  "version_name": "<<버전에 대한 설명 ex. aString>>",
  "web_accessible_resources": [
    {
      "resources": [ << 외부에 공개하고 싶은 리소스 파일 경로(extension root 기준) ex. "test1.png", "/images/*.png">> ],
      "matches": [ << 해당 리소스에 접근할 수 있는 외부 주소 ex. "https://web-accessible-resources-1.glitch.me/*">> ]
    }, {
      "resources": [ "test3.png", "test4.png" ],
      "matches": [ "https://web-accessible-resources-2.glitch.me/*" ]
    }
  ],
}
````

### 대표 Permissions 목록
- "activeTab", "experimental" 두개 입력 시, 하기 모든 권한을 활용 가능할 듯
````
        "http://*.google.com/*",
//        "activeTab", 
        "alarms",
        "background",
        "bookmarks",
        "browsingData",
        "chrome://favicon/",
        "clipboardRead",
        "clipboardWrite",
        "contentSettings",
        "contextMenus",
        "cookies",
        "debugger",
        "declarativeContent",
        "declarativeWebRequest",
        "desktopCapture",
        "dns",
        "documentScan",
        "downloads",
//        "experimental",
        "fileBrowserHandler",
        "fileSystemProvider",
        "fontSettings",
        "gcm",
        "geolocation",
        "history",
        "identity",
        "idle",
        "idltest",
        "infobars",
        "location",
        "management",
        "nativeMessaging",
        "notificationProvider",
        "notifications",
        "pageCapture",
        "power",
        "privacy",
        "processes",
        "proxy",
        "pushMessaging",
        "sessions",
        "signedInDevices",
        "storage",
        "system.cpu",
        "system.display",
        "system.memory",
        "system.storage",
        "tabCapture",
        "tabs",
        "topSites",
        "tts",
        "ttsEngine",
        "unlimitedStorage",
        "vpnProvider",
        "webNavigation",
        "webRequest",
        "webRequestBlocking"
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


