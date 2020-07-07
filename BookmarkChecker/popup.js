


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('add').addEventListener('click', function(){
    var newURL = "chrome://bookmarks";
    chrome.tabs.create({ url: newURL });
  });
});
