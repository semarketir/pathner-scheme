!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=n(4),r=o(i),s=n(1),a=o(s),d=n(2),u=o(d);window.pathnerScheme=function(e){var t=e.subject,n=e.text,o="path://compose/thought?subject="+encodeURIComponent(t)+",text="+encodeURIComponent(n);(0,u.default)(_.assignIn({scheme:o},e,{dom:a.default,agent:r.default}))}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={setLocation:function(e){location.href=e},getHiddenIframe:function(e,t){return $("<iframe />",{src:e,style:"display:none;",load:t})}}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.openScheme=t.isSupportingIntent=t.openByIframe=void 0;var i=n(3),r=o(i),s={GOOGLE_STORE_URL:"https://app.adjust.com/r1ybn5",ANDROID_STORE_URL:"https://play.google.com/store/apps/details?id=com.path"},a=void 0,d=1500,u=2*d,c=t.openByIframe=function(e,t,n){a&&clearTimeout(a);var o=e.getHiddenIframe(t,function(){clearTimeout(a),e.setLocation(t)}),i=(new Date).getTime();a=setTimeout(function(){var t=(new Date).getTime();t-i>=u||(o.remove(),e.setLocation(n))},d),$("body").append(o)},p=t.isSupportingIntent=function(e){return!!(e.isChrome&&e.version>24)||(!!(e.isFirefox&&e.version>40)||!!e.isOperaMini)},f=t.openScheme=function(e){var t=e.dom,n=e.agent,o=e.scheme,i=e.unsupportedHandler;if(n.isAndroid){var a=s.GOOGLE_STORE_URL,d=s.ANDROID_STORE_URL;if(p(n)){n.isAndroid&&n.isChrome&&(a=r.default.addAdjustRedirect(a,d));var u=o.split("://"),f="intent://"+u[1]+"#Intent;scheme="+u[0]+";package=com.path;S.browser_fallback_url="+encodeURIComponent(a)+";end;";t.setLocation(f)}else c(t,o,a)}else _.isFunction(i)&&i()};t.default=f},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={addAdjustRedirect:function(e,t){return e+=(e.split("?")[1]?"&":"?")+"redirect_android="+encodeURIComponent(t)}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=/(iphone|ipad|ipod)/i,o=/android/i,i=/chrome\/(\d+)/i,r=/firefox\/(\d+)/i,s=/(opr|opera mini)/i,a=t.createAgent=function(e){var t=void 0,a={isChrome:!1,isFirefox:!1,isOperaMini:!1,isAndroid:!1,isIOS:!1,isUnknown:!1,version:0};return o.exec(e)?a.isAndroid=!0:n.exec(e)&&(a.isIOS=!0),(t=i.exec(e))?a.isChrome=!0:(t=r.exec(e))?a.isFirefox=!0:s.test(e)?a.isOperaMini=!0:a.isUnknown=!0,t&&(a.version=parseFloat(t[1])),a};t.default=a(navigator.userAgent)}]);