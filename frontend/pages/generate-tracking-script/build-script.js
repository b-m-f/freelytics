"use strict";

(function () {
  'use strict';

  var l = document.createElement("a");
  l.href = window.location.href;

  function getPath() {
    return l.href;
  }

  function getHost() {
    return l.hostname;
  }

  function sendData(url) {
    return function () {
      var path = getPath();
      var host = getHost();
      fetch("".concat(url, "/save"), {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: path,
          root: host
        })
      });
    };
  }

  sendData("https://maximilianehlers.com")();
})();
