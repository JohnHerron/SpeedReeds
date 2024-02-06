// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

var contextMenuItem = {
  id: "readText",
  title: "Reed It!",
  contexts: ["selection"],
};
// A generic onclick callback function.
function genericOnClick(info) {
  // Standard context menu item function
  console.log("Standard context menu item clicked.");
  console.log(info.selectionText);

  // let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
  // width=0,height=0,left=-1000,top=-1000`;
  // open("/popup.html", "test", params);
}
chrome.contextMenus.create(contextMenuItem);
