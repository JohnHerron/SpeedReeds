// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

var contextMenuItem = {
  id: "readText",
  title: "Reed It!",
  contexts: ["selection"],
};

var popupWindow = {
  focused: true,
  url: chrome.runtime.getURL("home.html"),
  type: "popup",
};

// A generic onclick callback function.
function genericOnClick(info) {
  // Setting the selectionText.
  const selectionText = info.selectionText;

  // Split the selectionText into separate words
  var split = selectionText.split(" ");

  chrome.storage.local.set({ "selectionText": split });
  chrome.windows.create(popupWindow);
}

// only add context menu item on first install/update
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create(contextMenuItem);
});