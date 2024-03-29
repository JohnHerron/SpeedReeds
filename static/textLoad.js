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
  chrome.storage.local.set({ "selectionText": selectionText });

  chrome.windows.create(popupWindow);
}
chrome.contextMenus.create(contextMenuItem);
