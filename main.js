// ==UserScript==
// @name     		Simple Fandom Wiki
// @description	Simple Fandom Wiki strips away slow and distracting elements from Fandom Wikis, leaving behind only information.
// @author	 		dzamie
// @version  		1.0
// @include  		https://*.fandom.com/*
// ==/UserScript==


// fix head
var head = document.querySelector("head");
var title = document.querySelector("title");
var styles = document.querySelectorAll("link[rel='stylesheet']");
// clears the <head>, then adds back the title and stylesheets
head.innerHTML = '';
head.appendChild(title);
for(let i = 0; i < styles.length; i ++) {
  head.appendChild(styles[i]);
}

// fix body
var classNames = ["page-header", "page-content", "page-footer__categories"];
var classList = [];
for(let i = 0; i < classNames.length; i ++) {
  classList.push(document.getElementsByClassName(classNames[i])[0]);
}
var body = document.querySelector("body");
// clears the <body>, then adds back the article title, content, and footer-categories
body.textContent = '';
for(let i = 0; i < classList.length; i ++) {
  body.appendChild(classList[i]);
}
// Wikipedia-like margins for aesthetic
body.style.padding = "1.25em 1.5em 1.5em 1.5em"
body.style.margin = "0em 0em 0em 11em"

// fix text color
var bgc = window.getComputedStyle(document.body)["background-color"].replace(/[^\d,]/g, '').split(',').map(Number)
// sets body (text) color to black or white, depending on the background color
// uses whichever color has the greatest Contrast Ratio as defined by W3C Web Content Accessibility Guidelines
// see https://w3c.github.io/wcag/guidelines/ for details
for(let i = 0; i < 3; i ++) {
  bgc[i] = bgc[i] / 255.0
  bgc[i] = (bgc[i] <= 0.03928) ? (bgc[i]/12.92) : ((bgc[i]+0.055)/1.055) ** 2.4
}
lumin = 0.2126*bgc[0] + 0.7152*bgc[1] + 0.0722*bgc[2]
if(((lumin + 0.05) / 0.05) > (1.05 / (lumin + 0.05))) {
  body.style.color = "rgb(0, 0, 0)"
} else {
  body.style.color = "rgb(255, 255, 255)"
}
