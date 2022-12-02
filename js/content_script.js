// Sending a request from a content script
function requestMsgToBackground(msg) {
  chrome.extension.sendMessage(
    { msg: "I'm content-script" },
    function (response) {
      console.log(response);
    }
  );
}

// Receiving message from a background page
chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.msg === "Do you hear me?") {
    sendResponse({ answer: "Yes" });
  }
});
