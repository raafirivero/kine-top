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
/* harmony import */ var flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/HeaderPrimary */ "flarum/components/HeaderPrimary");
/* harmony import */ var flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_HeaderPrimary__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _flarum_core_forum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @flarum/core/forum */ "@flarum/core/forum");
/* harmony import */ var _flarum_core_forum__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_flarum_core_forum__WEBPACK_IMPORTED_MODULE_2__);
//export * from './src/forum';


 // this is the div I inserted into the header inside th Flarum admin page.

var wpbrick = document.getElementById('wpbrick');
var listul = document.getElementById('listul');
var newslist = document.getElementById('newslist');
var showcase = document.getElementById('showcase'); // this grabs the titles of recent news posts

var url = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=20&per_page=5&_fields=title,link";
var localurl = "http://comm.site/blog/_junk/newslist.json";
var showcaseurl = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=18&per_page=1&_fields=title,content,video-link,kinefinity-camera,director,dp,editor";
var kData = {
  todos: {
    list: [],
    fetch: function fetch() {
      m.request({
        method: "GET",
        url: localurl
      }).then(function (items) {
        kData.todos.list = items;
      });
    }
  }
};
var Todos = {
  oninit: kData.todos.fetch(),
  //log: console.log("inside Todos"),
  view: function view(vnode) {
    return [m("h2", {
      "class": "newstitle"
    }, "News"), m("ul", {
      id: "listul",
      "class": "listholder"
    }, [kData.todos.list.map(function (item) {
      return m("li", [m("a", {
        href: item.link
      }, item.title.rendered)]);
    })])];
  }
};
m.mount(newslist, Todos);
var showhead = {
  view: function view(vnode) {
    return m("h2", "Showcase");
  }
};
m.mount(showcase, showhead);
var metas = [];
var pullclip = {
  todos: {
    list: [],
    fetch: function fetch() {
      m.request({
        method: "GET",
        url: showcaseurl
      }).then(function (items) {
        pullclip.todos.list[0] = items;
        metas = pullclip.todos.list[0];
        console.log(metas[0]); //console.log(metas[0]['video-link'])
      });
    }
  }
};

var metarows = function metarows() {
  var metalist = [];
  if (metas[0].director) metalist.push(m("span", {
    "class": "meta-item"
  }, "Director: " + metas[0].director));
  if (metas[0].dp) metalist.push(m("span", {
    "class": "meta-item"
  }, "DP: " + metas[0].dp));
  if (metas[0].editor) metalist.push(m("span", {
    "class": "meta-item"
  }, "Editor: " + metas[0].editor));
  if (metas[0].kinecam) metalist.push(m("span", {
    "class": "meta-item"
  }, "Kinefinity Camera: " + metas[0].kinecam));
  return metalist;
};

var ShowClip = {
  oninit: pullclip.todos.fetch(),
  //log: console.log(pullclip.todos.list[0]),
  view: function view(vnode) {
    return [m("div", {
      "class": "showcasewrap"
    }, "hearmeout", [m("div", {
      "class": "embedtest"
    }, metas[0]['video-link']), m("p", {
      "class": "showcasemeta"
    }, metarows())])];
  }
};
m.mount(showcase, ShowClip);

/***/ }),

/***/ "@flarum/core/forum":
/*!******************************!*\
  !*** external "flarum.core" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core;

/***/ }),

/***/ "flarum/components/HeaderPrimary":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/HeaderPrimary']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/HeaderPrimary'];

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