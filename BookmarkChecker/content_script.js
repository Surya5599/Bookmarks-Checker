chrome.runtime.sendMessage({
  from: 'content',
});



var bookMarks = [];
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.text == "foundBookmark") {
      console.log("GOT MESSAGE");
      bookMarks = request.link;
    }
});

$("a").on("mouseover", function() {
  var t0 = performance.now();
     let x = $(this)[0].href;
    if(checkInBookMarks(x) == true){
      checkImage($(this)[0]);
    }
    var t1 = performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
});


function checkInBookMarks(data){
  for(var i = 0; i < bookMarks.length; i++){
    if(bookMarks[i] == data){
      return true;
    }
  }
  return false;
}

function checkImage(links){
  if(links.getElementsByTagName('img').length == 0){
    links.innerHTML += "&nbsp;";
    links.innerHTML += "<img src=\"https://i.ibb.co/S09qLHC/2-21817-bookmark-clipart-png-transparent-png.png\" width=\"20px\" height=\"20px\">";
  }
  else{
    var found = false;
    var images = links.getElementsByTagName('img');
    for(var g = 0; g < images.length; g++){
      if(images[g].src == "https://i.ibb.co/S09qLHC/2-21817-bookmark-clipart-png-transparent-png.png"){
        found = true;
        break;
      }
    }
    if(found == false){
        links.innerHTML += "<img src=\"https://i.ibb.co/S09qLHC/2-21817-bookmark-clipart-png-transparent-png.png\" width=\"20px\" height=\"20px\">";
     }
     else{
         //console.log("HAS IMAGE");
     }
  }
}
