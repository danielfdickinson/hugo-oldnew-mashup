"use strict";
/*!  Copyright (C) 2007,2017 Daniel F. Dickinson <thecshore.thecshore.com>
 *    Released under the MIT License
 */
/*!  Copyright (C) 2007,2017 Daniel F. Dickinson <thecshore.thecshore.com>
 *    Released under the MIT License
 */
!function(){function r(e,t,o){e&&Cookies.set("cshore-style-helper-style",e,{expires:14,domain:o}),t&&Cookies.set("cshore-style-helper-fontZoom",t,{expires:14,domain:o})}function i(){return{style:Cookies.get("cshore-style-helper-style"),fontZoom:Cookies.get("cshore-style-helper-fontZoom")}}function c(){var e,t,o,n,r,i=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],c=1<arguments.length&&void 0!==arguments[1]&&arguments[1],s=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"Default",l="",d=document.head.getElementsByTagName("link");t="";for(var u=0;void 0!==(e=d[u]);u++)if(r=n=void 0,t=(o=e)?(n=o.getAttribute("rel")?o.getAttribute("rel").indexOf("style"):-1,(r=o.getAttribute("title"))&&-1!=n?r:""):"")if(e.disabled)i||0!=t.localeCompare(s)||(e.disabled=!1,l=!0);else{if(i&&c&&-1==e.getAttribute("rel").indexOf("alt"))return t;if(i&&!c)return t;!i&&t.localeCompare(s)&&(e.disabled=!0)}return i?"Default":l?s:"Default"}function s(){var e=document.documentElement["cshore-font-zoom"];if(!e||e<0)switch(document.documentElement["cshore-current-style"]){case"Large Print":case"Large Contrast":e=1.6;break;default:e=1}document.documentElement.style["font-size"]=function(e){var t=999999,o=16,n=32;o*=e,n*=e;var r=document.documentElement.offsetWidth,i=t<r?t:r<1?1:r,c=109*(Math.log(105536+i/1*8)+-11.448)*e;return(n<c?n:c<o?o:c)+"px"}(e)}function o(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"Default",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"",n=c(!1,!1,e);if((!t||t<0)&&(!(t=i().fontZoom)||t<0))switch(n){case"Large Print":case"Large Contrast":t=1.6;break;default:t=1}r(document.documentElement["cshore-current-style"]=n,document.documentElement["cshore-font-zoom"]=t,o),s()}function e(){return s(),!0}function t(){var e=function(){var e={},t=i(),o=t.style,n=t.fontZoom;if(o||(o=c(!0,!0)),!n||n<0)switch(o){case"Large Print":case"Large Contrast":n=1.6;break;default:n=1}return e.style=o,e.fontZoom=n,e}(),t="";return"undefined"!=typeof SITE_DOMAIN&&SITE_DOMAIN&&(t=SITE_DOMAIN),o(e.style,e.fontZoom,t),!0}function n(){var e=document.documentElement["cshore-current-style"],t=document.documentElement["cshore-font-zoom"],o="";return"undefined"!=typeof SITE_DOMAIN&&SITE_DOMAIN&&(o=SITE_DOMAIN),r(e,t,o),null}window.setCurrentStyle=o,window.addEventListener("resize",e),window.addEventListener("load",t),window.addEventListener("unload",n),window.onload=t,window.onunload=n,window.onresize=e}();var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */!function(e){var t=!1;if("function"==typeof define&&define.amd&&(define(e),t=!0),"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&(module.exports=e(),t=!0),!t){var o=window.Cookies,n=window.Cookies=e();n.noConflict=function(){return window.Cookies=o,n}}}(function(){function y(){for(var e=0,t={};e<arguments.length;e++){var o=arguments[e];for(var n in o)t[n]=o[n]}return t}return function e(m){function p(e,t,o){var n;if("undefined"!=typeof document){if(1<arguments.length){if("number"==typeof(o=y({path:"/"},p.defaults,o)).expires){var r=new Date;r.setMilliseconds(r.getMilliseconds()+864e5*o.expires),o.expires=r}o.expires=o.expires?o.expires.toUTCString():"";try{n=JSON.stringify(t),/^[\{\[]/.test(n)&&(t=n)}catch(e){}t=m.write?m.write(t,e):encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=(e=(e=encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var i="";for(var c in o)o[c]&&(i+="; "+c,!0!==o[c]&&(i+="="+o[c]));return document.cookie=e+"="+t+i}e||(n={});for(var s=document.cookie?document.cookie.split("; "):[],l=/(%[0-9A-Z]{2})+/g,d=0;d<s.length;d++){var u=s[d].split("="),a=u.slice(1).join("=");this.json||'"'!==a.charAt(0)||(a=a.slice(1,-1));try{var f=u[0].replace(l,decodeURIComponent);if(a=m.read?m.read(a,f):m(a,f)||a.replace(l,decodeURIComponent),this.json)try{a=JSON.parse(a)}catch(e){}if(e===f){n=a;break}e||(n[f]=a)}catch(e){}}return n}}return(p.set=p).get=function(e){return p.call(p,e)},p.getJSON=function(){return p.apply({json:!0},[].slice.call(arguments))},p.defaults={},p.remove=function(e,t){p(e,"",y(t,{expires:-1}))},p.withConverter=e,p}(function(){})});
//# sourceMappingURL=hugo-oldnew-mashup-min.js.map
