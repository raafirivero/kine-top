//export * from './src/forum';
import { extend } from 'flarum/extend';
import { Component } from '@flarum/core/forum';
import HeaderPrimary from 'flarum/components/HeaderPrimary';
import PostStreamScrubber from 'flarum/components/PostStreamScrubber';
import DiscussionPage from 'flarum/components/DiscussionPage';
import { tns } from "./node_modules/tiny-slider/src/tiny-slider"


// Divs that get referenced below:
var ktoprow = document.getElementById('ktoprow');
var ktopheader = document.getElementById('ktopheader');
var showcase = document.getElementById('showcase');
var newslist = document.getElementById('newslist');
var newsurl = "https://comm.site/blog/wp-json/wp/v2/posts/?categories=19&per_page=5&_fields=title,link";
var localurl = "https://comm.site/blog/_junk/newslist.json";
var footerwrap = document.getElementById('bigfoot');
var morevideos = document.getElementById('morevideos');
var socialrow = document.getElementById('socialrow');
var footlinks = document.getElementById('footlinks');
var imgdir = "https://comm.site/blog/_img/"

// some useful variables
var featurecat = 18;
var showcasecat = 20;
var skipindex;

//loading animation
showcase.classList.add("flex");

var loadinga = {
    view: function(vnode) {  
        return  m("img", {src: "https://comm.site/blog/_img/loader-thin.gif", class: "kload", alt:"loading"})
        //return  m("p", "hello detroit!");
    }
}
m.mount(showcase, loadinga);


var kData = {
    content:[],
    fetch: function() {
        m.request({
            method: "GET",
            url: newsurl,
        })
        .then(function(data) {
            kData.content = data
            console.log(data)
        })
    }
}

function htmlEntities(str) {
    return String(str).replace(/&#8211;/g,'-').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
}

var Newscontent = {
    oninit: kData.fetch(),
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("fade-out")
        return new Promise(function(resolve) {
            setTimeout(resolve, 1000)
        })
    },
    view: function(vnode) {      
        return [
            m("h2", {class: "newstitle"}, "Latest News"),
            m("ul",{id:"listul",class: "listholder"}, [
                kData.content.map(function(item) {
                return  m("li", [
                            m("a", {href: item.link}, htmlEntities(item.title.rendered)),
                        ])
                    
                
                })
            ])
        ]
        
    }   
}
m.mount(newslist, Newscontent);

var ktoprow = document.getElementById('ktoprow');
var toprow = {
    view: function(vnode) {
        return m("menu", {class: "container"}, [
            m("span",{class:"slogan"},"KineCommunity was made by Kinefinity camera owners for Kinefinity camera owners."),
            m("a",{class:"toplink",href:"#header"},"Forum"),
            m("a",{class:"toplink",href:"/showcase/"},"Showcase"),
            m("a",{class:"toplink",href:"/blog/"},"Blog"),
            m("a",{class:"toplink",href:"/store/"},"Store"),
            m("button",{class:"toplink Button Button--primary",href:"/sign-up/"},"Sign Up"),
        ])
    }
}
m.mount(ktoprow, toprow);

function fingaz(){
    showcase.classList.remove("flex");
    var fingerlist = [];
    for (let step = 0; step < 5; step++) {
        var finger = m("div",{class: "colo finger"+(step+1)},"");
        fingerlist.push(finger);   
    }
    return fingerlist
}


/////////////////// work on Scrubber

extend(DiscussionPage.prototype, 'config', function() {

    /*
    turn off the scrubber for posts without a reply. This helps in cases
    where the initial post is only a line or two and the scrubber would
    fall off the screen.

    if there is a reply turn on all the classes that calculate its 
    place on the screen.

    */

   if (typeof this.stream === 'undefined') {
        //  undefined
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
    var headHeight = ktopheader.scrollHeight;

    // since the scrubber is created via JS the only way to access its margin
    // is via its computed height in the browser, then convert it into a number
    // qscrub.scrollHeight didn't work 100% of the time, espec on tall pages
    // recalculated it a different way below
    var scrubHeight = parseInt(window.getComputedStyle(qscrub).getPropertyValue("height"));
    var scrubTop = parseInt(window.getComputedStyle(qscrub).getPropertyValue("margin-top"));
    var scrubBottom = parseInt(window.getComputedStyle(qscrub).getPropertyValue("margin-bottom"));
    var navMargin = scrubTop + scrubBottom;

    // set the scroll number where we want to fix the Scrubber
    var sticky = scrubHeight+headHeight-navMargin;
    var fheight = document.getElementById('bigfoot').offsetHeight;

    window.addEventListener('scroll', holdscrub, true); 

    function holdscrub() {

        // recalculate height onscroll to capture changes to doc height because of replies
        var docHeight = document.body.scrollHeight;
        var stoppingPlace = docHeight - navMargin - scrubHeight - fheight;

        if (window.scrollY < sticky) {
            qscrub.classList.remove("fixit");
            qscrub.classList.remove("lowscrub");
            qscrub.classList.add("hiscrub");
        }

        if (window.scrollY >= sticky && window.scrollY < stoppingPlace ) {
            qscrub.classList.remove("lowscrub");
            qscrub.classList.remove("hiscrub");
            qscrub.classList.add("fixit");

        }

        if (window.scrollY >= stoppingPlace) {
            qscrub.classList.remove("fixit");
            qscrub.classList.remove("hiscrub");
            qscrub.classList.add("lowscrub");

        }
    }

}



var scrollnum = '';
extend(PostStreamScrubber.prototype, 'config', function(isInitialized, context) {
    /*
    This extension replaces the onclick function of the "original post" link in the
    Scrubber and instead has the window scroll to the header. I do this because the
    header that I've inserted is much taller and the user doesn't need to scroll to 
    the very top of the window every time.

    THE PROBLEM with this fix is that it _jumps_ to the top of the window instead of scrolling.
    The scrollIntoView fix below works in Firefox and Chrome, but not Safari :/
    */

    var origpost = this.element.querySelector('.Scrubber-first');
    var headerdiv = document.getElementById("header");
    var headertotal = ktopheader.clientHeight + ktoprow.clientHeight;
    scrollnum = headertotal;
    var herodiv = this.element.ownerDocument.querySelector('.DiscussionHero');

    origpost.onclick = function(e){

        // scrollTo(0, headertotal);
        // smooth scrolling on Firefox, still jumps in Safari
        herodiv.scrollIntoView({behavior: "smooth"});
    }

});




/////////////////// Make the header smaller

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

extend(HeaderPrimary.prototype, 'items', function(items) {
    // items.add('google', <a href="https://google.com">Google</a>);
});
    

// Debugger that's no longer needed!!!

//window.addEventListener('click', logvals, true); 
//function logvals() {
    // console.log(
    //     "sticky : " +sticky,
    //     "headheight : " +headHeight,
    //     "qscrub : " +qscrub.offsetTop,
    //     "navMargin : " +navMargin
    // );
//}


