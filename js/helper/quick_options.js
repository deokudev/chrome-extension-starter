/**
 * This is a part of Chrome Extensions Box
 * Read more on GitHub - https://github.com/onikienko/chrome-extensions-box
 */
window.addEventListener(
  "load",
  function () {
    /*This event will dispatch as soon as options page will be ready*/
    let event = new CustomEvent("optionsPageReady");

    function showMessage(msg) {
      let el = document.getElementById(msg === "error" ? "error" : "success");
      el.style.display = "inline";
      setTimeout(function () {
        el.style.display = "none";
      }, 2501);
    }

    function saveToStorage(val) {
      storage.area.set(val, function () {
        showMessage(
          chrome.runtime.lastError
            ? showMessage("error")
            : showMessage("success")
        );
        // dispatch custom event
        document.dispatchEvent(
          new CustomEvent("optionSaved", {
            detail: {
              success: chrome.runtime.lastError ? false : true,
              val: val,
            },
          })
        );
      });
    }

    storage.area.get(storage.default_options, function (items) {
      let inputs = document.querySelectorAll("input"),
        selects = document.querySelectorAll("select"),
        textareas = document.querySelectorAll("textarea");

      [].forEach.call(inputs, function (el) {
        let storage_name = el.getAttribute("data-storage"),
          text_el;
        if (storage_name && items.hasOwnProperty(storage_name)) {
          switch (el.type) {
            case "checkbox":
              if (parseInt(items[storage_name], 10) === 1) {
                el.checked = true;
              }
              el.addEventListener(
                "change",
                function () {
                  let val = {};
                  items[storage_name] = el.checked ? 1 : 0;
                  val[storage_name] = items[storage_name];
                  saveToStorage(val);
                },
                false
              );
              break;

            case "radio":
              if (el.value === items[storage_name].toString()) {
                el.checked = "checked";
              }
              el.addEventListener(
                "change",
                function () {
                  let val = {};
                  if (el.checked) {
                    items[storage_name] = el.value;
                    val[storage_name] = items[storage_name];
                    saveToStorage(val);
                  }
                },
                false
              );
              break;

            case "range":
            case "color":
            case "date":
            case "time":
            case "month":
            case "week":
              el.value = items[storage_name];
              el.addEventListener(
                "change",
                function () {
                  let val = {};
                  items[storage_name] = el.value;
                  val[storage_name] = items[storage_name];
                  saveToStorage(val);
                },
                false
              );
              break;

            case "text":
            case "password":
            case "email":
            case "tel":
            case "number":
              el.value = items[storage_name];
              break;

            case "submit":
            case "button":
              [].forEach.call(
                document.querySelectorAll(
                  '[data-storage="' + storage_name + '"]'
                ),
                function (elem) {
                  if (elem.type !== "submit" && elem.type !== "button") {
                    text_el = elem;
                  }
                }
              );
              if (text_el) {
                el.addEventListener(
                  "click",
                  function () {
                    let val = {};
                    items[storage_name] = text_el.value;
                    val[storage_name] = items[storage_name];
                    saveToStorage(val);
                  },
                  false
                );
              }
              break;
          }
        }
      });

      [].forEach.call(textareas, function (el) {
        let storage_name = el.getAttribute("data-storage");
        if (storage_name && items.hasOwnProperty(storage_name)) {
          el.value = items[storage_name];
        }
      });

      [].forEach.call(selects, function (el) {
        let storage_name = el.getAttribute("data-storage"),
          options,
          i;
        if (storage_name && items.hasOwnProperty(storage_name)) {
          if (
            (el.multiple && Array.isArray(items[storage_name])) ||
            !el.multiple
          ) {
            options = el.options;
            for (i = options.length; i--; ) {
              if (el.multiple) {
                if (items[storage_name].indexOf(options[i].value) !== -1) {
                  options[i].selected = "selected";
                }
              } else {
                if (options[i].value === items[storage_name]) {
                  options[i].selected = "selected";
                  break;
                }
              }
            }
            el.addEventListener(
              "change",
              function () {
                let val = {},
                  array_of_selected = [],
                  i;
                if (el.multiple) {
                  for (i = options.length; i--; ) {
                    if (options[i].selected) {
                      array_of_selected.push(options[i].value);
                    }
                  }
                  items[storage_name] = array_of_selected;
                } else {
                  items[storage_name] = options[options.selectedIndex].value;
                }
                val[storage_name] = items[storage_name];
                saveToStorage(val);
              },
              false
            );
          }
        }
      });

      /* Options page is ready. Dispatch event */
      document.dispatchEvent(event);
    });
  },
  false
);
