/* jshint undef: true, unused: true, esversion: 6, globalstrict: true */
/* globals SITE_DOMAIN: false, Cookies: false, window: false, document: false */
// ---- JSHint linter settings

/*!  Copyright (C) 2007,2017,2019 Daniel F. Dickinson <thecshore.thecshore.com>
 *    Released under the MIT License
 */

//    Script to smooth font resizing based on browser window size

// The information used to write this script comes from
//   http://www.alistapart.com/articles/alternate, however I wrote the script
//   myself.
//
(function () {
  // Function to calcuate  the root font size for html element so that
  // all other proportionally defined fonts will be scaled accordingly.
  // The idea is to have a smoothly scaling font size as number of pixels gets
  // larger.

  // This is on the assumption higher resolutions mean more dpi; sadly there is
  // no good way to find dpi in javascript and/or with CSS in present browser
  // implementations; many solutions have been proposed, but none are consistently
  // successful across platforms (and Windows 10 is particularly bad at reporting
  // a useful DPI) as of 2017-04-18 23:59:00 -0400

  // fontZoom is a constant multiplier (e.g. 1.6 = 160%) for zoom
  function calculateFontSize(fontZoom) {
    // Some magic numbers that worked for me.
    // It is basically intuitive approach involving trial and error.
    // The basic idea was to shift and apply constants multipliers
    // to a natural logarithmic scale to get the scaling to 'play nicely'.
    // (Meaning that at small pixel counts font size changes are fast relative
    // to pixel count but deaccelerate as pixel counts go up (but still end up
    // being larger increments on larger displays due to the larger initial value).
    var maxWidth = 999999;
    var minWidth = 1;
    var fontRatio = 1;
    var fontLogScale = 8;
    var fontLogOffset = 105536;
    var fontScale = 109;
    var fontScaleOffset = -11.448;

    // This is the desired font range in css pixels (which are sadly not actually
    // device-independent even though they were supposed to be
    // Note that this only affects cutoff, to get the range to work as desired, you
    // will need to play with the magic numbers.
    var minFont = 16;
    var maxFont = 32;

    minFont = minFont * fontZoom;
    maxFont = maxFont * fontZoom;

    var baseWidth = document.documentElement.offsetWidth;
    var setWidth = baseWidth > maxWidth ? maxWidth : baseWidth < minWidth ? minWidth : baseWidth;
    var fontBase = ((Math.log(fontLogOffset + fontLogScale * (setWidth / fontRatio))) + fontScaleOffset) * fontScale * fontZoom;
    var fontSize = (fontBase > maxFont ? maxFont : fontBase < minFont ? minFont : fontBase) + "px";
    return fontSize;
  }

  // Function to set the root font size inline (on the html element), thus causing
  // all other proportionally defined fonts to be scaled accordingly.
  // The idea is to have a smoothly scaling font size as number of pixels gets
  // larger.

  // This concept was borrowed from Flow.js.
  // https://github.com/simplefocus/FlowType.JS/blob/master/flowtype.js
  // but implemented using completely different code.
  // In that case the goal was actually to maintain 45-75 words on a page based
  // the theory this is typographically optimal.

  // fontZoom is a constant multiplier (e.g. 1.6 = 160%) for zoom
  function setFontSizeOnResize() {
    document.documentElement.style["font-size"] = calculateFontSize(1);
  }

  function setCurrentStyle(fontZoom = 1, siteDomain = "") {
    setFontSizeOnResize();
  }

  function doOnResize() {
    setFontSizeOnResize();
    return true;
  }

  function doOnLoad() {
    setFontSizeOnResize();
    return true;
  }

  window.addEventListener("resize", doOnResize);
  window.addEventListener("load", doOnLoad);
  window.addEventListener("unload", doOnUnload);

  window.onload=doOnLoad;
  window.onresize=doOnResize;
}());
