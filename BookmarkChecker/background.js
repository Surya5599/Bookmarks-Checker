'use strict';


chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

  var bookmarkLinks = [];
  chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.from === 'content') {
      var t0 = performance.now();
      runIt();
      sendData(bookmarkLinks);
      var t1 = performance.now();
      console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
    }
  });

  chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
    console.log("bookmarks crated");
    runIt();
    sendData(bookmarkLinks);
  });

  var bookmarkTreeNodes;
  function runIt(){
      bookmarkTreeNodes = chrome.bookmarks.getTree(
      function traverseBookmarks(bookmarkTreeNodes) {
        for(var i=0;i<bookmarkTreeNodes.length;i++) {
          if(bookmarkTreeNodes[i].url != undefined)
            bookmarkLinks.push(bookmarkTreeNodes[i].url);
            //console.log(bookmarkTreeNodes[i].title, bookmarkTreeNodes[i].url ? bookmarkTreeNodes[i].url : "[Folder]");
            if(bookmarkTreeNodes[i].children) {
                traverseBookmarks(bookmarkTreeNodes[i].children);
            }
        }
      }
    );
  }

  function sendData(sendData){
    console.log("sending data");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {text:"foundBookmark", link: sendData});
    });
    //bookmarkLinks = [];
  }
