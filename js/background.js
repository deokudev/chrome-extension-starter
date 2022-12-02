try {
  importScripts("/js/background_storage.js", "/js/background_init.js");
} catch (e) {
  console.log(e);
}

// TO-DO : background에서 동작하는 js 코드를 작성
// Receiving message from a content-script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg === "I'm content-script") {
    sendResponse({ answer: "OK! I'm background_page" });
  }
});

// Sending a request to a content script. You need to specify which tab to send it to. Like this:
function requestMsgToContentScript(msg) {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendMessage(
      tab.id,
      { msg: "Do you hear me?" },
      function (response) {
        console.log(response);
      }
    );
  });
}
