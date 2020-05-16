//export * from './src/forum';
//export * from './src/forum/kc-news.js';
//export * from './src/forum/kc-fireanim.js';
export * from './src/forum/kc-scrubber.js';
import { extend } from 'flarum/extend';
import { Component } from '@flarum/core/forum';
import { tns } from "./node_modules/tiny-slider/src/tiny-slider";
import { firemodule } from './src/forum/kc-firemod.js';



// Divs that get referenced below:
var ktoprow = document.getElementById('ktoprow');
var ktopheader = document.getElementById('ktopheader');
var morevideos = document.getElementById('morevideos');
var imgdir = "https://comm.site/blog/_img/"

var showcaseboxes = 3;
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
var bigjuan = [];

var vCarousel = {
    boxes: [],
    box: [],
    content: [],
    headline: "Submitted via <strong>#kinefinity</strong> on Vimeo and YouTube",
    build_boxes: function(){
        // console.log("start building: " boxes)
        
            for (var i=0; i< vCarousel.boxes.length; i++) {
                
                if(vCarousel.boxes[i]['meta']['upvotes']) {
                    var firecount = vCarousel.boxes[i]['meta']['upvotes']
                } else {
                    var firecount = 0;
                }

                var clipid = vCarousel.boxes[i]['id'];
        
                vCarousel.box.push(
                    m("div", {class:"sliderbox",width:"250px"}, [
                        m(".boxwrap .clip"+clipid, {
                        }, [
                            // m(".iframe-container",[
                            //     // new approach
                            //     m.trust(vCarousel.boxes[i]['meta']['oembed'])
                            // ]),
                            metarows("li","creds",vCarousel.boxes[i]['meta']),
                            firemodule(firecount,clipid,"wp")

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
            // m(".multiwrap ", {config:tnsWrap}, [
            //     vCarousel.build_boxes()
            // ]),
            // turn off slider
            m(".multiwrap ", [
                vCarousel.build_boxes()
            ]),
                

            m(".slidercontrols", [
                m("img", {src: imgdir+"caretl.png" , class:"sprev", alt:"previous videos"}),
                m("img", {src: imgdir+"caretr.png" , class:"snext", alt:"next videos"})
            ]),

            //built = true,
            
        ]
        
        
    } 
}



if (built) {
    // do nothing
    // return
} else {
    grabClips.fetch();
    //m.mount(morevideos, vCarousel);
    //console.log("once");
    m.mount(ktopheader, vCarousel);

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
//             // startFire();
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

