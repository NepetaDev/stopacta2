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

  var messages = {
    "en": {
      "title": "WARNING! The website you're trying to reach right now may not be available in near future.",
      "text": "The Copyright Directive in the Digital Single Market has many names on the Internet. Here are some of them: #CopyrightDirective, #SaveYourInternet, #SaveTheInternet, # Article11, # Article13, #UploadFilters, #LinkTax, #Filternet, #CensorshipMachines. We call it “ACTA 2”, because ACTA in the online community is a synonym of an attempt to legalize censorship of the Internet. The directive was supposed to update the copyright protection regulations to help the creators. Unfortunately, the legislators went a different path and prepared legal solutions that would destroy the Internet as we know it. #ACTA2 will force the EU to create an AI super infrastructure that will automatically censor online content before it will be posted. Each portal and application (desktop or mobile) will need to be connected to it avoid the economic risk of being financially liable for a post or comment (even by comming from an anonymous user) of protected content.\nToday, this infrastructure will be used to protect copyrights in a radicle way. Unfortunately, ACTA 2 not only enforces the creation of censorship infrastructure, it also introduces a precedent to the European legal system, allowing for preventive censorship of content. Because of this tomorrow, this infrastructure and legal precedent will be used to censor moral content. Already, the European Commission is preparing legal solutions in forms of different directives that will use ACTA2 to censor content about organizations considered to be “radical”. Recently popular topic in the EU is hate speech and “fake news”. Right now there are ideas of “filtering”, and blocking of this type of content aswell.",
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
    messageDiv.innerText = message.text;
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