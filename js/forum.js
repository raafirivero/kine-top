//export * from './src/forum';
//export * from './src/forum/kc-news.js';
export * from './src/forum/kc-adsidebar.js';
export * from './src/forum/kc-discussion.js';
export * from './src/forum/kc-scrubber.js';
export * from './src/forum/kc-sidenav.js';
export * from './src/forum/kc-slimhead.js';
// import { extend } from 'flarum/extend';
// import { Component } from '@flarum/core/forum';
import { tns } from "./node_modules/tiny-slider/src/tiny-slider";
import { firemodule } from './src/forum/kc-firemod.js';


var featurewrap = 
m(".featurewrap .wipeleft");

var fingaz = {
    fingerlist: [],
    view: function(vnode) {
        var fingerlist = [];
        for (let step = 0; step < 5; step++) {
            var finger = m("div",{class: "colo finger"+(step+1)},"");
            fingerlist.push(finger);   
        }
        fingerlist.push(featurewrap);
        // showClip.fingaz = fingerlist;
        fingaz.fingerlist = fingerlist;
        return fingerlist;
    }
}
m.mount(featured, fingaz);



//loading animation
// featured.classList.add("flex");

// var loadinga = {
//     view: function(vnode) {  
//         return  m("img", {src: "https://comm.site/blog/_img/loader-thin.gif", class: "kload", alt:"loading"})
//         //return  m("p", "hello detroit!");
//     }
// }
// m.mount(featured, loadinga);


// Divs that get referenced below:
var morevideos = document.getElementById('morevideos');
var imgdir = "https://comm.site/blog/_img/"

var showcaseboxes = 7;
var showcaseurl = "https://comm.site/blog/wp-json/wp/v2/videos/?_fields=id,title,categories,meta&per_page="+showcaseboxes;
var featurecat = 18;
var showcasecat = 20;
var skipindex;

var metas = [];



var grabClips = {
    content:[], // populated below
    fetch: function() {
        m.request({
            method: "GET",
            url: showcaseurl,
        })
        .then(
            featuredVideo, // get started on the first video
        )
        .then(
            prepShowcase
        )
    }
}

function featuredVideo(data) {
    var tempser;
    var obj = data;
    // console.log(obj);

    for (var i = 0; i < obj.length; i++){
        // look for first entry in the "featured" category
        if (obj[i].categories.includes(featurecat)){
            metas = obj[i]['meta'];
            skipindex = i;
            showClip.content = obj[i].meta;
            var clipid = obj[i]['id'];
            showClip.clipid = clipid;
            break;
        }
    }

    //showClip.content = data.data.iframe.html

    return data;
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
    vCarousel.build_boxes();
}

function metarows(tag,section,content) {
    // universal function for formatting metadata from videos
    var metalist = [];
    if(content.director) metalist.push(
        m(tag, {class:section},
            [ m("span",{class:"role"},"Director: ") ], 
                content.director))
    if(content.dp) metalist.push(
        m(tag, {class:section},
            [ m("span",{class:"role"},"DP: ") ], 
                content.dp))
    // if(content.editor) metalist.push(
    //     m(tag, {class:section},
    //         [ m("span",{class:"role"},"Editor: ") ], 
    //             content.editor))
    if(content.kinecamera) metalist.push(
        m(tag, {class:section},
            [ m("span",{class:"role"},"Camera: ") ], 
                content.kinecamera))
    return metalist
}

var built = false;

var vCarousel = {
    boxes: [],
    content: [],
    headline: "Use <strong>#kinefinity</strong> on Vimeo and YouTube. Or submit here.",
    deadline: "Submitted via <strong>#kinefinity</strong> on Vimeo and YouTube",
    build_boxes: function(){
        
        for (var i=0; i< vCarousel.boxes.length; i++) {
            
            if(vCarousel.boxes[i]['meta']['upvotes']) {
                var firecount = vCarousel.boxes[i]['meta']['upvotes']
            } else {
                var firecount = 0;
            }

            var clipid = vCarousel.boxes[i]['id'];
    
            vCarousel.content.push(
                m("div", {class:"sliderbox",width:"250px"}, [
                    m(".boxwrap .clip"+clipid, {
                    }, [
                        m(".iframe-container",[
                            // new approach
                            m.trust(vCarousel.boxes[i]['meta']['oembed'])
                        ]),
                        metarows("li","creds",vCarousel.boxes[i]['meta']),
                        firemodule(firecount,clipid,"wp")

                    ])
                ])
            )     
        }

        return vCarousel.content;  

    },
    view: function(vnode) {

        return [
            
            m("h5", {class:"minihead"} ,[
                m.trust(vCarousel.headline)
            ]),

            // the `config` method below is from version 0.2.5 of Mithril
            // change to `oninit` once Flarum updates to 1.0
            //m(".multiwrap ", {config:tnsWrap}, [
            m(".multiwrap ", [
                vCarousel.content
            ]),

            m(".slidercontrols", [
                m("img", {src: imgdir+"caretl.png" , class:"sprev", alt:"previous videos"}),
                m("img", {src: imgdir+"caretr.png" , class:"snext", alt:"next videos"})
            ]),

        ]
    } 
}

var showClip = {
    content: [],
    clipid: '',
    fingaz: [],
    view: function(vnode) {
        var firecount = this.content.upvotes;  
        //console.log(featurewrap.classList);

        return [
            fingaz.view(),
            m(".featurewrap .clip"+showClip.clipid, [
                m("h2",{class: "shotitle"}, "Showcase"),
                m("p",{class:"featuremeta"},metarows("li","featured",metas)),
                firemodule(firecount, showClip.clipid, "wp"),
                // m("p",{class:"howtosubmit"},"Submit using #Kinefinity on Vimeo or YouTube"),
                //m("p",{class:"howtosubmit"},"Use #Kinefinity on Vimeo or YouTube or submit below."),
                m("div",{class: "iframe-container",ID:"featembed"}, [
                    m.trust(this.content.oembed),           
                ]),
            ]),
        ]
    }
}


//grabClips.fetch();

//m.mount(featured, showClip);


// m.mount(ktopheader, vCarousel); // testing location
//m.mount(morevideos, vCarousel);

function build_true(){
    built = true;
}


// lazy load the YouTube clips in the footer if scrolled halfway down the page
var halfway = document.body.scrollHeight/3;
window.addEventListener('scroll', loadFooter, true); 

function loadFooter(){
    // check to see if footer has been loaded
    // console.log ("called");
    if(window.scrollY > halfway) {

        if (document.querySelector('.minihead') === null ) {
            m.render(morevideos, vCarousel.view());
            //m.mount(morevideos, vCarousel);
            // startFire();
            window.removeEventListener('scroll', loadFooter);
        } else {
            // don't mount the footer if it's already there
        }

    }

}


// lazy loading on the TinySlider caused memory leaks. Let's try it by hand above

// function tnsWrap() {

//     // was experiencing redraw issue because TNS is not created by
//     // Flarum. Zombies vnodes. Don't redraw TNS once built.

//     if (built === false ) {

//         var slider = tns({
//             container: '.multiwrap',
//             slideBy: 'page',
//             nav: false,
//             controlsPosition: 'bottom',
//             controlsContainer: '.slidercontrols',
//             lazyload: false,
//             onInit: build_true,
//             items: 1,
//             responsive: {
//                 640: {
//                     items: 2
//                 },
//                 900: {
//                     items: 3
//                 }
//             }
//         });

//     }
// }

