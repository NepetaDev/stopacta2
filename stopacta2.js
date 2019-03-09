(function () {
  /*
  Copyright 2019 Nepeta

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
  DEALINGS IN THE SOFTWARE.
  */

  // Let's set up some important variables here.
  var id = "stopacta2";
  var urlToOpen = "https://www.stopacta2.org/";
  var fallbackLanguage = "en";

  // REMEMBER TO KEEP THE HTML TAGS IN PLACE WHILE TRANSLATING.
  var messages = {
    "en": {
      "title": "WARNING!\nThe website you're trying to reach right now may stop being available in near future.",
      "text": "The battle for the Internet freedom is not over yet. Publishing corporations are trying to get their hands on the content we share and limit our fundamental rights.<br>" +
      "People in charge of the European Union are trying to push Article 11 and Article 13 on us to take away our freedoms and put them in the hands of these greedy corporations via such tools as upload filters and link tax.<br>" +
      "This will effectively end the Internet freedom in the European Union.<br>" +
      "<b>It also sets a dangerous precedent that other countries may soon follow.</b>",
      "actNow": "ACT NOW!",
      "dismiss": "I don't care about the Internet."
    }
  };

  var styles = function(){
/*

#_ID_ {
  background: #0f0f0f;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  position: fixed !important;
  top: 0; left: 0; bottom: 0; right: 0;
  opacity: 0;
  transition: 0.5s all ease-in-out;
  z-index: 2147483647 !important;
}

#_ID_._ID_-visible {
  opacity: 1 !important;
}

#_ID_ h1 {
  margin: 0;
  padding: 0;
}

#_ID_ ._ID_-content {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 100px;
  background: #f4f4f4;
  color: #111;
  border: 1px solid #aaa;
  text-align: center;
  box-shadow: 0px 20px 20px -20px rgba(255,255,255,0.4);
}

#_ID_ ._ID_-message {
  color: #333;
  margin: 20px 0;
}

#_ID_ ._ID_-actNow {
  display: block;
  font-size: 2em;
  margin: 10px auto;
  cursor: pointer;
  background: none;
  border: 2px solid black;
  font-weight: bold;
  box-shadow: 0px 21px 20px -20px rgba(0,0,0,0.5);
  transition: 0.2s all ease-in-out;
}

#_ID_ ._ID_-actNow:hover {
  background: #111;
  color: #fff;z
}

#_ID_ ._ID_-dismiss {
  border: none;
  background: none;
  margin-top: 10px;
  opacity: 0.7;
}

*/
}.toString().slice(16, -4).replace(new RegExp("_ID_", "g"), id);

  var mainDiv = null;
  var contentDiv = null;

  var styleElement = null;

  var language = navigator.language || navigator.browserLanguage || (navigator.languages || [fallbackLanguage])[0];
  language = language.split("-")[0];

  var message = (messages.hasOwnProperty(language)) ? messages[language] : messages[fallbackLanguage];

  var wasPresented = localStorage.getItem(id + "-presented");

  function openInNewTab(href) {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      href,
    }).click();
  }

  function actNow() {
    openInNewTab(urlToOpen);
    dismiss();
  }

  function dismiss() {
    localStorage.setItem(id + "-presented", 1);
    mainDiv.className = "";
    setTimeout(function () {
      mainDiv.remove();
      styleElement.remove();
    }, 500);
  }

  function initElements() {
    mainDiv = document.createElement("div");
    mainDiv.id = id;
  
    contentDiv = document.createElement("div");
    contentDiv.className = id + "-content";

    var header = document.createElement("h1");
    header.innerText = message.title;
    contentDiv.appendChild(header);

    var messageDiv = document.createElement("div");
    messageDiv.innerHTML = message.text;
    messageDiv.className = id + "-message";
    contentDiv.appendChild(messageDiv);

    var actNowButton = document.createElement("button");
    actNowButton.innerText = message.actNow;
    actNowButton.className = id + "-actNow";
    actNowButton.onclick = actNow;
    contentDiv.appendChild(actNowButton);

    var dismissButton = document.createElement("button");
    dismissButton.innerText = message.dismiss;
    dismissButton.className = id + "-dismiss";
    dismissButton.onclick = dismiss;
    contentDiv.appendChild(dismissButton);
  
    mainDiv.appendChild(contentDiv);
  }

  function initStyles() {
    styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
  }

  function init() {
    initElements();
    initStyles();
  }

  function show() {
    document.body.appendChild(styleElement);
    document.body.appendChild(mainDiv);
    setTimeout(function () {
      mainDiv.className = id + "-visible";
    }, 100);
  }
  
  if (!wasPresented) {
    init();
    show();
  }
})();