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
  // Standard context menu item function
  console.log("Standard context menu item clicked.");
  console.log(info.selectionText);
  chrome.storage.local.set(info);
  chrome.windows.create(popupWindow);
}
chrome.contextMenus.create(contextMenuItem);
