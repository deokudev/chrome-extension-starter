// Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version
// http://developer.chrome.com/extensions/runtime.html#event-onInstalled
chrome.runtime.onInstalled.addListener(function (details) {
  // good place to set default options
  function setDefaults(callback) {
    storage.area.get(function (stored_options) {
      let default_options = storage.default_options,
        option,
        new_options = {};
      for (option in default_options) {
        if (!stored_options.hasOwnProperty(option)) {
          new_options[option] = default_options[option];
        }
      }
      if (Object.keys(new_options).length !== 0) {
        // save to area if new default options is appeared
        storage.area.set(new_options, function () {
          if (typeof callback === "function") {
            callback();
          }
        });
      } else {
        if (typeof callback === "function") {
          callback();
        }
      }
    });
  }

  switch (details.reason) {
    case "install": // if ext is  first installed
      setDefaults(function () {
        // show options page
        chrome.tabs.create({ url: "options.html" });
      });
      break;
    case "update":
      setDefaults();
      break;
    default:
      break;
  }
});

chrome.runtime.onUpdateAvailable.addListener(function (details) {
  // when an update is available - reload extension
  // update will be install immediately
  chrome.runtime.reload();
});
