!function(){var t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")};t.stop.disabled=!0;var e=0;t.start.addEventListener("click",(function(a){a.target.disabled=!0,t.stop.disabled=!1,e=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),t.stop.addEventListener("click",(function(a){clearInterval(e),a.target.disabled=!0,t.start.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.2d14706b.js.map
