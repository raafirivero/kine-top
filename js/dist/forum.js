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




 // Divs that get referenced below:

var ktoprow = document.getElementById('ktoprow');
var ktopheader = document.getElementById('ktopheader');
var showcase = document.getElementById('showcase');
var newslist = document.getElementById('newslist');
var newsurl = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=19&per_page=5&_fields=title,link";
var localurl = "http://comm.site/blog/_junk/newslist.json";
var footerwrap = document.getElementById('bigfoot');
var morevideos = document.getElementById('morevideos');
var socialrow = document.getElementById('socialrow');
var footlinks = document.getElementById('footlinks'); // some useful variables

var featurecat = 18;
var showcasecat = 20;
var skipindex; //loading animation

showcase.classList.add("flex");
var loadinga = {
  view: function view(vnode) {
    return m("img", {
      src: "http://comm.site/blog/_img/loader-thin.gif",
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
m.mount(ktoprow, toprow);

function fingaz() {
  showcase.classList.remove("flex");
  var fingerlist = [];

  for (var step = 0; step < 5; step++) {
    var finger = m("div", {
      "class": "colo finger" + (step + 1)
    }, "");
    fingerlist.push(finger);
  }

  return fingerlist;
} // this grabs the metadata for featured showcase videos
//var showcaseurl = "http://comm.site/blog/wp-json/wp/v2/videos/?_fields=id,title,meta&per_page=6"


var showcaseboxes = 6;
var showcaseurl = "http://comm.site/blog/wp-json/wp/v2/videos/?_fields=id,title,categories,meta&per_page=" + showcaseboxes;
var metas = [];
var grabClips = {
  content: [],
  // populated below
  fetch: function fetch() {
    m.request({
      method: "GET",
      url: showcaseurl
    }).then(featuredVideo // get started on the first video
    ).then(prepShowcase).then(function (data) {
      grabClips.content = data;
    });
  }
};

function featuredVideo(data) {
  var tempser;
  var obj = data;

  for (var i = 0; i < obj.length; i++) {
    // look for first entry in the "featured" category
    if (obj[i].categories.includes(featurecat)) {
      metas = obj[i]['meta'];
      skipindex = i;
      break;
    }
  }

  tempser = encode(metas.videolink); // serialize the videolink

  pullclip.fetch(tempser); // connect to API for embed code

  return data;
}

function encode(uri) {
  // make a switch statement, then encode the uri
  var ri = new RegExp('vimeo', 'i');
  var vimeo = ri.test(uri);
  var res = encodeURIComponent(uri);
  return 'https://api.microlink.io?url=' + res + '&iframe';
  /*
  we can go back to pinging the vimeo and youtube APIs directly later,
  for now let's use MicroLink.io as above.
  if (vimeo) return 'https://vimeo.com/api/oembed.json?url='+res;
  return 'http://www.youtube.com/oembed?url='+res+'&format=json';
  */
}

var pullclip = {
  content: [],
  fetch: function fetch(url) {
    // log: console.log('are we fetching?'),
    m.request({
      method: "GET",
      url: url
    }).then(function (data) {
      //take received JSON and send it on
      //showClip.content = data['html']
      // use microlink.io wrapper instead
      showClip.content = data.data.iframe.html;
    });
  }
};
var showlist = {
  content: [],
  fetch: function fetch(url) {
    // log: console.log('We fetching?'),
    m.request({
      method: "GET",
      url: url
    }).then(function (data) {
      //take received JSON and send it on
      if (data['html']) {
        showlist.content.push(data['html']);
        vCarousel.linkback(data['html']);
      } else {
        // format the returning data from microlink
        showlist.content.push(data.data.iframe.html);
        vCarousel.linkback(data.data.iframe.html); // console.log(showlist.content)
      } // return

    }); //.then(vCarousel.linkback)
  }
};

function prepShowcase(data) {
  //console.log(data);
  // get bizzy
  var showcaseobj = [];
  var obj = data;
  var embedcodes = []; // create a new array without the featured video

  for (var i = 0; i < obj.length; i++) {
    if (i != skipindex) {
      showcaseobj.push(obj[i]['meta']);
    }
  } // encode all the videolinks


  for (var i = 0; i < showcaseobj.length; i++) {
    showcaseobj[i]['videolink'] = encode(showcaseobj[i]['videolink']);
  } // fetch all the embed codes via API


  for (var i = 0; i < showcaseobj.length; i++) {
    showcaseobj[i]['videolink'] = showlist.fetch(showcaseobj[i]['videolink']);
  }

  vCarousel.getback(showcaseobj);
}

function metarows(tag, section, content) {
  // universal function for formatting metadata from videos
  var metalist = [];
  if (content.director) metalist.push(m(tag, {
    "class": section + "-item"
  }, "Director: " + content.director));
  if (content.dp) metalist.push(m(tag, {
    "class": section + "-item"
  }, "DP: " + content.dp));
  if (content.editor) metalist.push(m(tag, {
    "class": section + "-item"
  }, "Editor: " + content.editor));
  if (content.kinecamera) metalist.push(m(tag, {
    "class": section + "-item"
  }, "Camera: " + content.kinecamera));
  return metalist;
}

var vCarousel = {
  boxes: [],
  getback: function getback(array) {
    vCarousel.boxes = array;
  },
  linkback: function linkback(iframe) {
    for (var i = 0; i < vCarousel.boxes.length; i++) {
      if (vCarousel.boxes[i]['videolink'] === undefined) {
        vCarousel.boxes[i]['videolink'] = iframe;
        break;
      }
    } // once the object is filled, start building the boxes


    if (vCarousel.boxes[vCarousel.boxes.length - 1]['videolink'] !== undefined) {
      vCarousel.view();
    }
  },
  build_boxes: function build_boxes() {
    // console.log("start building")
    var box = [];

    for (var i = 0; i < vCarousel.boxes.length; i++) {
      box.push(m(".boxwrap", [m(".iframe-container", [m.trust(vCarousel.boxes[i]['videolink'])]), metarows("li", "morevideos", vCarousel.boxes[i]) // m("p",{class:"insidebox"},"box"+i+1),
      ]));
    }

    return box;
  },
  view: function view(vnode) {
    return m(".multiwrap", [m("h5", {
      "class": "minihead"
    }, "Submitted via #kinefinity on Vimeo and YouTube"), vCarousel.build_boxes()]);
  }
};
var showClip = {
  oninit: '',
  // used to be grabClips.fetch
  content: [],
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
    }, metarows("li", "featured", metas)), m("p", {
      "class": "howtosubmit"
    }, "Submit using #Kinefinity on Vimeo or YouTube"), m("div", {
      "class": "embedwrap",
      ID: "showembed"
    }, [m.trust(this.content)])])];
  }
}; // uncoupling grabbing data from the showClip object

grabClips.fetch();
m.mount(showcase, showClip); ////////////////////// Showcase Carousel

m.mount(morevideos, vCarousel); /////////////////// work on Scrubber

Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'config', function () {
  /*
  turn off the scrubber for posts without a reply. This helps in cases
  where the initial post is only a line or two and the scrubber would
  fall off the screen.
   if there is a reply turn on all the classes that calculate its 
  place on the screen.
   */
  if (typeof this.stream === 'undefined') {//  undefined
  } else {
    if (this.stream.visibleEnd < 2) {
      this.element.querySelector('.DiscussionPage-nav > ul').remove;
    } else {
      scrubberClass(this);
    }
  }
});

function scrubberClass(vnode) {
  // grab the scrubber, its height, and set an offset
  var qscrub = vnode.element.querySelector('.DiscussionPage-nav > ul');
  var headHeight = ktopheader.scrollHeight; // since the scrubber is created via JS the only way to access its margin
  // is via its computed height in the browser, then convert it into a number
  // qscrub.scrollHeight didn't work 100% of the time, espec on tall pages
  // recalculated it a different way below
  // var scrubHeight = parseInt(window.getComputedStyle(qscrub).getPropertyValue("height"));

  var scrubHeight = qscrub.scrollHeight;
  var navMargin = parseInt(window.getComputedStyle(qscrub).getPropertyValue("margin-top")); // set the scroll number where we want to fix the Scrubber

  var sticky = scrubHeight + headHeight - navMargin;
  var fheight = document.getElementById('bigfoot').offsetHeight;
  var docHeight = document.body.scrollHeight;
  var stoppingPlace = docHeight - navMargin - scrubHeight - fheight;
  window.addEventListener('scroll', holdscrub, true);

  function holdscrub() {
    if (window.scrollY < sticky) {
      qscrub.classList.remove("fixit");
      qscrub.classList.remove("lowscrub");
      qscrub.classList.add("hiscrub");
    }

    if (window.scrollY >= sticky && window.scrollY < stoppingPlace) {
      qscrub.classList.add("fixit");
      qscrub.classList.remove("lowscrub");
      qscrub.classList.remove("hiscrub");
    }

    if (window.scrollY >= stoppingPlace) {
      qscrub.classList.add("lowscrub");
      qscrub.classList.remove("fixit");
      qscrub.classList.remove("hiscrub");
    }
  }
}

var scrollnum = '';
Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PostStreamScrubber__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'config', function (isInitialized, context) {
  /*
  This extension replaces the onclick function of the "original post" link in the
  Scrubber and instead has the window scroll to the header. I do this because the
  header that I've inserted is much taller and the user doesn't need to scroll to 
  the very top of the window every time.
   THE PROBLEM with this fix is that it jumps to the top of the window instead of scrolling.
  The original Scrubber scrolls smoothly to the top. It's just that the Scrubber scrolls
  too far up the page. I haven't been able to modify the scrubber because it seems like
  I'd have to duplicate the entire component just to get the functionality I want.
  */
  var origpost = this.element.querySelector('.Scrubber-first');
  var headerdiv = document.getElementById("header");
  var headertotal = ktopheader.clientHeight + ktoprow.clientHeight;
  scrollnum = headertotal; // var herodiv = this.element.ownerDocument.querySelector('.DiscussionHero-items');

  origpost.onclick = function () {
    // console.log(herodiv);
    scrollTo(headerdiv, headertotal, 0); // herodiv.scrollIntoView(); 
  };
});
Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PostStreamScrubber__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'onclick', function () {// window.addEventListener('onclick', newclick, true);
  // function newclick(e){
  //     console.log("extended");
  // }
}); /////////////////// Make the header smaller
// WORK ON THIS NEXT

/*
This is a saction to decrease the height of the header, via an inserted
CSS class, once the body of the forum has been clicked at least once. I've
turned it off because I'm using a scroll function to not show the top part
instead.
 */
// var beenclicked = false;
//     app.addEventListener('click', gothere, true); 
//     function gothere() {
//         if (!beenclicked) {
//             m.mount(showcase, null);
//             m.mount(newslist, null);
//             showcase.classList.add("gonzo");
//             newslist.classList.add("gonzo");
//             ktopheader.classList.add("shorter");
//             if(docHeight) {
//                 console.log("recalc");
//                 headHeight = ktopheader.scrollHeight;
//                 docHeight = document.body.scrollHeight;
//                 scrubHeight = qscrub.scrollHeight;
//                 sticky = scrubHeight+headHeight-navMargin;
//                 stoppingPlace = docHeight - navMargin - scrubHeight - fheight;
//             }
//             document.body.removeEventListener('click', gothere, true);
//             beenclicked = true;
//         }
//         //console.log("beenclicked: " + beenclicked);
//     }
/////////////////// trash to teach me stuff

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