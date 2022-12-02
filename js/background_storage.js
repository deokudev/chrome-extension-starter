let storage = {
  // `local` if you want. remember about QUOTAS https://developer.chrome.com/extensions/storage.html#sync-properties
  area: chrome.storage.sync,
  default_options: {
    // TO-DO : options.html에서 data-storage에서 정의한 속성값들의 기본값을 지정한다.
    example_select_val: "type3",
    // example_select_multiple_val: ["type1", "type2"],
    example_checkbox_val: 1, // checkbox의 경우 1 or 0
    example_input_val: "example_text",
  },
};

/*
1. chrome.storage.sync를 사용할 경우
로그인한 사용자의 데이터를 최대100KB까지 저장하고, sync되어 사용할 수 있다. 
비로그인 시 local 처럼 저장해 두었다가, 로그인시 동기화 된다.

2. chrome.storage.local을 사용할 경우
확장 프로그램이 제거될 때까지, 최대 5MB까지 저장할 수 있다.
*/
