//export * from './src/forum';
import { extend } from 'flarum/extend';
import { Component } from '@flarum/core/forum';
import HeaderPrimary from 'flarum/components/HeaderPrimary';
import PostStreamScrubber from 'flarum/components/PostStreamScrubber';
import DiscussionPage from 'flarum/components/DiscussionPage';
import Navigation from 'flarum/components/Navigation';
import { tns } from "./node_modules/tiny-slider/src/tiny-slider"




// Divs that get referenced below:
var ktoprow = document.getElementById('ktoprow');
var ktopheader = document.getElementById('ktopheader');
var morevideos = document.getElementById('morevideos');
var imgdir = "https://comm.site/blog/_img/"

var showcaseboxes = 5;
var showcaseurl = "https://comm.site/blog/wp-json/wp/v2/videos/?_fields=id,title,categories,meta&per_page="+showcaseboxes;

// to clear
var skipindex = 0;

var grabClips = {
    content:[], // populated below
    fetch: function() {
        m.request({
            method: "GET",
            url: showcaseurl,
        })
        .then(
            prepShowcase
        )
    }
}

function prepShowcase(data){
    var showcaseobj = [];
    var obj = data;

    // create a new array without the featured video
    for (var i = 0; i < obj.length; i++){
        if (i != skipindex) {
            showcaseobj.push(obj[i]);
        }
    }
    vCarousel.boxes = showcaseobj;
}

function metarows(tag,section,content) {
    // universal function for formatting metadata from videos
    var metalist = [];
    if(content.director) metalist.push(m(tag, {class:section+"-item"},"Director: "+content.director))
    if(content.dp) metalist.push(m(tag, {class:section+"-item"},"DP: "+content.dp))
    // if(content.editor) metalist.push(m(tag, {class:section+"-item"},"Editor: "+content.editor))
    if(content.kinecamera) metalist.push(m(tag, {class:section+"-item"},"Camera: "+content.kinecamera))
    return metalist
}

var fireglowdot;
var fireglow;

function firemodule(firecount) {
    fireglowdot = m(".fireglow")

    var module = [
        m(".firewrap",[
            m(".firebox",[
                fireglowdot,
                m(".fireball",{class:"kbutton"}),
                m(".firenum",firecount),        
            ])
        ])
    ];

    startFire()
    return module;
}


function counter(event){
    /*
    TinySlider duplicates the divs and places them in the DOM so that it can make
    a carousel. We must grab all of the elements from the wrapper with the 
    same clip number and change them at once for the count to work.
    */

    // need to control for clicks on the fire module only.
    //console.log(event);

    var holdnum = event.srcElement.offsetParent.querySelector('.firenum');

    if (holdnum === null) {
        // get the hell out if we're not clicking on the firebox
        return;
    }
    var clipnumber = holdnum.closest('.boxwrap').classList[1];
    var multiwrap = event.srcElement.closest('.multiwrap');
    var alldem = multiwrap.querySelectorAll('.'+clipnumber);
    alldem.forEach((element) => { 
        element.querySelector('.firenum').innerText ++; 
    });

    /*
    Now take that same clip number, lop off the 'clip' part and use it to
    call the WordPress API to update the upvote count in the database.
    */
    
    var boxid = clipnumber.substring(4);
    setNum.fetch(boxid,holdnum);

}
ktopheader.addEventListener('click', counter, true); 


var setNum = {
    error: [],
    fetch: function(id,holdnum) {
        
        var base = 'https://comm.site/blog/wp-json/kinecom/showcase/';
        var newnum = holdnum.innerText;
        var querystring = base + id +'?upvotes=' + newnum;

        // most important thing here is the background setting, which keeps
        // Mithril from triggering a redraw

        m.request({
            method: "PUT",
            url: querystring,
            background: true,
        })
        .then(
            // celebrate
        )
        .catch(function(e) {
            console.log(e.message)
            setNum.error = e.message
        })
    }
}

function setProperty(duration,fireglowdot) {
    fireglow = document.querySelector('.fireglow');
    fireglow.style.setProperty('background-color','blue');
    fireglow.style.setProperty('--animation-time', duration +'s');
}

function changeAnimationTime() {
    var animationDuration = Math.random();
    setProperty(animationDuration,fireglowdot);
}

function startFire(){
    setInterval(changeAnimationTime, 1000, fireglowdot);
}

var built = false;

var vCarousel = {
    boxes: [],
    box: [],
    content: [],
    headline: "Submitted via <strong>#kinefinity</strong> on Vimeo and YouTube",
    build_boxes: function(data){
        // console.log("start building: " boxes)
        fireglowdot = m(".fireglow");
        
            for (var i=0; i< vCarousel.boxes.length; i++) {
                
                if(vCarousel.boxes[i]['meta']['upvotes']) {
                    var firecount = vCarousel.boxes[i]['meta']['upvotes']
                } else {
                    var firecount = 0;
                }
        
                vCarousel.box.push(
                    m("div", {class:"sliderbox",width:"250px"}, [
                        m(".boxwrap .clip"+vCarousel.boxes[i]['id'], {
                        }, [
                            // m(".iframe-container",[
                            //     // new approach
                            //     m.trust(vCarousel.boxes[i]['meta']['oembed'])
                            // ]),
                            metarows("li","movs",vCarousel.boxes[i]['meta']),
                            firemodule(firecount)

                        ])
                    ])
                )     
            }
            return vCarousel.box;        
    },
    view: function(vnode) {

        
        return [
            m("h5", {class:"minihead"} ,[
                m.trust(vCarousel.headline)
            ]),
            m(".multiwrap ", {config:tnsWrap}, [
                vCarousel.build_boxes()
            ]),
            // turn off slider
            // m(".multiwrap ", [
            //     vCarousel.build_boxes()
            // ]),
                

            m(".slidercontrols", [
                m("img", {src: imgdir+"caretl.png" , class:"sprev", alt:"previous videos"}),
                m("img", {src: imgdir+"caretr.png" , class:"snext", alt:"next videos"})
            ]),
            
        ]
    } 
}



if (built) {
    // do nothing
    // return
} else {
    // grabClips.fetch();
    // m.mount(ktopheader, vCarousel);
    // var minis = document.querySelector('firebox');
    //console.log(vCarousel);
    //console.log(shape);
    built = true;
}




// lazy load the YouTube clips in the footer if scrolled halfway down the page
// var halfway = document.body.scrollHeight/2;
// window.addEventListener('scroll', loadFooter, true); 

// function loadFooter(){
//     // check to see if footer has been loaded
//     // console.log ("called");
//     if(window.scrollY > halfway) {

//         if (document.querySelector('.minihead') === null ) {
//             m.render(morevideos, vCarousel.view());
//             startFire();
//             window.removeEventListener('scroll', loadFooter);
//         } else {
//             // don't mount the footer if it's already there
//         }

//     }

// }


// lazy loading on the TinySlider caused memory leaks. Let's try it by hand above

function tnsWrap() {

    var slider = tns({
        container: '.multiwrap',
        slideBy: 'page',
        nav: false,
        controlsPosition: 'bottom',
        controlsContainer: '.slidercontrols',
        lazyload: false,
        items: 1,
        responsive: {
            640: {
                items: 2
            },
            900: {
                items: 3
            }
        }
    });
}

// extend(HeaderPrimary.prototype, 'config', function(isInitialized, context) {
//     //items.add('google', <a href="https://google.com">Google</a>);
//     console.log(context);
//   });

extend(Navigation.prototype, 'config', function(isInitialized, context) {
    //console.log(this.element.onmouseenter);
    //this.element.onmouseenter = null;

  });

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