module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _flarum_core_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @flarum/core/forum */ "@flarum/core/forum");
/* harmony import */ var _flarum_core_forum__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_flarum_core_forum__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/HeaderPrimary */ "flarum/components/HeaderPrimary");
/* harmony import */ var flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_PostStreamScrubber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/PostStreamScrubber */ "flarum/components/PostStreamScrubber");
/* harmony import */ var flarum_components_PostStreamScrubber__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PostStreamScrubber__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/DiscussionPage */ "flarum/components/DiscussionPage");
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4__);
//export * from './src/forum';




 // this is the div I inserted into the header inside th Flarum admin page.

var ktoprow = document.getElementById('ktoprow');
var ktopheader = document.getElementById('ktopheader');
var showcase = document.getElementById('showcase');
var app = document.getElementById('app');
var newslist = document.getElementById('newslist');
var newsurl = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=19&per_page=5&_fields=title,link";
var localurl = "http://comm.site/blog/_junk/newslist.json"; //loading animation

var loadinga = {
  view: function view(vnode) {
    return m("img", {
      src: "http://comm.site/blog/_img/kcanim.gif",
      "class": "kload",
      alt: "loading"
    }); //return  m("p", "hello detroit!");
  }
};
m.mount(showcase, loadinga);
var kData = {
  content: [],
  fetch: function fetch() {
    m.request({
      method: "GET",
      url: newsurl
    }).then(function (data) {
      kData.content = data;
    });
  }
};

function htmlEntities(str) {
  return String(str).replace(/&#8211;/g, '-').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
}

var Newscontent = {
  oninit: kData.fetch(),
  onbeforeremove: function onbeforeremove(vnode) {
    vnode.dom.classList.add("fade-out");
    return new Promise(function (resolve) {
      setTimeout(resolve, 1000);
    });
  },
  view: function view(vnode) {
    return [m("h2", {
      "class": "newstitle"
    }, "Latest News"), m("ul", {
      id: "listul",
      "class": "listholder"
    }, [kData.content.map(function (item) {
      return m("li", [m("a", {
        href: item.link
      }, htmlEntities(item.title.rendered))]);
    })])];
  }
};
m.mount(newslist, Newscontent);
var ktoprow = document.getElementById('ktoprow');
var toprow = {
  view: function view(vnode) {
    return m("menu", {
      "class": "container"
    }, [m("span", {
      "class": "slogan"
    }, "KineCommunity was made by Kinefinity camera owners for Kinefinity camera owners."), m("a", {
      "class": "toplink",
      href: "#header"
    }, "Forum"), m("a", {
      "class": "toplink",
      href: "/showcase/"
    }, "Showcase"), m("a", {
      "class": "toplink",
      href: "/blog/"
    }, "Blog"), m("a", {
      "class": "toplink",
      href: "/store/"
    }, "Store"), m("button", {
      "class": "toplink Button Button--primary",
      href: "/sign-up/"
    }, "Sign Up")]);
  }
};
m.mount(ktoprow, toprow); // this grabs the metadata for featured showcase videos

var showcaseurl = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=18&per_page=1&_fields=videolink,director,dp,editor,kinecamera";
var tempvideo = '';
var tempser = '';
var metas = [];
var embedcode = '';
var pullmeta = {
  content: [],
  // populated below
  fetch: function fetch() {
    m.request({
      method: "GET",
      url: showcaseurl
    }).then(function (data) {
      pullmeta.content = data;
      metas = pullmeta.content[0];
      tempvideo = metas.videolink;
      tempser = encode(tempvideo);
    }).then(pullclip.fetch);
  }
};

function metarows() {
  var metalist = [];
  if (metas.director) metalist.push(m("span", {
    "class": "meta-item"
  }, "Director: " + metas.director));
  if (metas.dp) metalist.push(m("span", {
    "class": "meta-item"
  }, "DP: " + metas.dp));
  if (metas.editor) metalist.push(m("span", {
    "class": "meta-item"
  }, "Editor: " + metas.editor));
  if (metas.kinecamera) metalist.push(m("span", {
    "class": "meta-item"
  }, "Camera: " + metas.kinecamera));
  return metalist;
}

function encode(uri) {
  // make a switch statement
  var ri = new RegExp('vimeo', 'i');
  var vimeo = ri.test(uri);
  var res = encodeURIComponent(uri);
  if (vimeo) return 'https://vimeo.com/api/oembed.json?url=' + res;
  return 'http://www.youtube.com/oembed?url=' + res + '&format=json';
}

var cliphtml = '';
var pullclip = {
  content: [],
  fetch: function fetch() {
    // log: console.log('are we fetching?'),
    m.request({
      method: "GET",
      url: tempser
    }).then(function (data) {
      //take received JSON and send it to a view
      pullclip.content = data['html'];
      cliphtml = data['html'];
    });
  }
};

function fingaz() {
  var fingerlist = [];

  for (var step = 0; step < 5; step++) {
    var finger = m("div", {
      "class": "colo finger" + (step + 1)
    }, "");
    fingerlist.push(finger);
  }

  return fingerlist;
}

var ShowClip = {
  oninit: // get the metadata and get the video, two separate calls
  [pullmeta.fetch()],
  onbeforeremove: function onbeforeremove(vnode) {
    vnode.dom.classList.add("fade-out");
    return new Promise(function (resolve) {
      setTimeout(resolve, 1000);
    });
  },
  view: function view(vnode) {
    return [fingaz(), m("div", {
      "class": "showcasewrap"
    }, "", [m("h2", {
      "class": "shotitle"
    }, "Showcase"), m("p", {
      "class": "showcasemeta"
    }, metarows()), m("p", {
      "class": "howtosubmit"
    }, "Submit using #Kinefinity on Vimeo or YouTube"), m("div", {
      "class": "embedwrap",
      ID: "showembed"
    }, [m.trust(cliphtml)])])];
  }
};
m.mount(showcase, ShowClip); /////////////////// Make the header smaller

var beenclicked = false;
app.addEventListener('click', gothere, true);

function gothere() {
  if (!beenclicked) {
    m.mount(showcase, null);
    m.mount(newslist, null);
    showcase.classList.add("gonzo");
    newslist.classList.add("gonzo");
    ktopheader.classList.add("shorter");
    document.body.removeEventListener('click', gothere, true);
    beenclicked = true;
  } //console.log("beenclicked: " + beenclicked);

} /////////////////// work on Scrubber


Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'config', function () {
  // grab the scrubber, its height, and set an offset
  var qscrub = this.element.querySelector('.DiscussionPage-nav > ul');
  var scrubHeight = qscrub.scrollHeight;
  var headHeight = ktopheader.scrollHeight; // since the scrubber is created via JS the only way to access its margin
  // is via its computed height in the browser, then convert it into a number

  var navMargin = parseInt(window.getComputedStyle(qscrub).getPropertyValue("margin-top")); // set the scroll number where we want to fix the Scrubber

  var sticky = scrubHeight + headHeight - navMargin;
  var fheight = document.getElementById('bigfoot').offsetHeight;
  var docheight = document.body.scrollHeight;
  var stoppingPlace = docheight - navMargin - scrubHeight - fheight;
  window.addEventListener('scroll', holdscrub, true); //window.addEventListener('mouseup', holdscrub, true); 

  function holdscrub() {
    if (window.scrollY < sticky) {
      qscrub.classList.remove("fixit");
      qscrub.classList.remove("lowscrub");
    }

    if (window.scrollY >= sticky && window.scrollY < stoppingPlace) {
      qscrub.classList.add("fixit");
      qscrub.classList.remove("lowscrub");
    } else {
      qscrub.classList.remove("fixit");
    }

    if (window.scrollY >= stoppingPlace) {
      qscrub.classList.add("lowscrub");
      qscrub.classList.remove("fixit");
    }
  }
});
Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {// items.add('google', <a href="https://google.com">Google</a>);
}); // Debugger that's no longer needed!!!
//window.addEventListener('click', logvals, true); 
//function logvals() {
// console.log(
//     "sticky : " +sticky,
//     "headheight : " +headHeight,
//     "qscrub : " +qscrub.offsetTop,
//     "navMargin : " +navMargin
// );
//}

/***/ }),

/***/ "@flarum/core/forum":
/*!******************************!*\
  !*** external "flarum.core" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core;

/***/ }),

/***/ "flarum/components/DiscussionPage":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionPage']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionPage'];

/***/ }),

/***/ "flarum/components/HeaderPrimary":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/HeaderPrimary']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/HeaderPrimary'];

/***/ }),

/***/ "flarum/components/PostStreamScrubber":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['components/PostStreamScrubber']" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/PostStreamScrubber'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map