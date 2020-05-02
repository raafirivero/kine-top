//export * from './src/forum';
import { extend } from 'flarum/extend';
import { Component } from '@flarum/core/forum';
import HeaderPrimary from 'flarum/components/HeaderPrimary';
import PostStreamScrubber from 'flarum/components/PostStreamScrubber';
import DiscussionPage from 'flarum/components/DiscussionPage';


// this is the div I inserted into the header inside th Flarum admin page.
var ktoprow = document.getElementById('ktoprow');
var ktopheader = document.getElementById('ktopheader');
var showcase = document.getElementById('showcase');
var app = document.getElementById('app');
var newslist = document.getElementById('newslist');
var newsurl = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=19&per_page=5&_fields=title,link";
var localurl = "http://comm.site/blog/_junk/newslist.json";

//loading animation

var loadinga = {
    view: function(vnode) {  
        return  m("img", {src: "http://comm.site/blog/_img/kcanim.gif", class: "kload", alt:"loading"})
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


// this grabs the metadata for featured showcase videos
var showcaseurl = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=18&per_page=1&_fields=videolink,director,dp,editor,kinecamera"
var tempvideo = '';
var tempser = ''
var metas = [];
var embedcode = '';

var pullmeta = {
    content:[], // populated below
    fetch: function() {
        m.request({
            method: "GET",
            url: showcaseurl,
        })
        .then(function(data) {
            pullmeta.content = data
            metas = pullmeta.content[0]
            tempvideo = (metas.videolink)
            tempser = encode(tempvideo);
        })
        .then(pullclip.fetch)
    }
}

function metarows(){
    var metalist = [];
    if(metas.director) metalist.push(m("span", {class:"meta-item"},"Director: "+metas.director))
    if(metas.dp) metalist.push(m("span", {class:"meta-item"},"DP: "+metas.dp))
    if(metas.editor) metalist.push(m("span", {class:"meta-item"},"Editor: "+metas.editor))
    if(metas.kinecamera) metalist.push(m("span", {class:"meta-item"},"Camera: "+metas.kinecamera))
    return metalist
}

function encode(uri) {
    // make a switch statement
    var ri = new RegExp('vimeo', 'i');
    var vimeo = ri.test(uri);
    var res = encodeURIComponent(uri);
    if (vimeo) return 'https://vimeo.com/api/oembed.json?url='+res;
    return 'http://www.youtube.com/oembed?url='+res+'&format=json';
}

var cliphtml ='';
var pullclip = {
    content:[],
    fetch: function() {
        // log: console.log('are we fetching?'),
        m.request({
            method: "GET",
            url: tempser,
        })
        .then(function(data) {
            //take received JSON and send it to a view
            pullclip.content = data['html']
            cliphtml = data['html']
        })
    }
}

function fingaz(){
    var fingerlist = [];
    for (let step = 0; step < 5; step++) {
        var finger = m("div",{class: "colo finger"+(step+1)},"");
        fingerlist.push(finger);   
    }
    return fingerlist
}


var ShowClip = {
    oninit: // get the metadata and get the video, two separate calls
    [pullmeta.fetch()],
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("fade-out")
        return new Promise(function(resolve) {
            setTimeout(resolve, 1000)
        })
    },
    view: function(vnode) {
        return [
            fingaz(),
            m("div", {class: "showcasewrap"}, "", [
                m("h2",{class: "shotitle"}, "Showcase"),
                m("p",{class:"showcasemeta"},metarows()),
                m("p",{class:"howtosubmit"},"Submit using #Kinefinity on Vimeo or YouTube"),
                m("div",{class: "embedwrap",ID:"showembed"}, [
                    m.trust(cliphtml),
                ]),
            ])
        ]
    }
}

m.mount(showcase, ShowClip);


/////////////////// Make the header smaller

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
    }
    //console.log("beenclicked: " + beenclicked);
}


/////////////////// work on Scrubber

extend(DiscussionPage.prototype, 'config', function() {

    // grab the scrubber, its height, and set an offset
    var qscrub = this.element.querySelector('.DiscussionPage-nav > ul');
    var scrubHeight = qscrub.scrollHeight;
    var headHeight = ktopheader.scrollHeight;

    // since the scrubber is created via JS the only way to access its margin
    // is via its computed height in the browser, then convert it into a number
    var navMargin = parseInt(window.getComputedStyle(qscrub).getPropertyValue("margin-top"));

    // set the scroll number where we want to fix the Scrubber
    var sticky = scrubHeight+headHeight-navMargin;

    var fheight = document.getElementById('bigfoot').offsetHeight;
    var docheight = document.body.scrollHeight;
    var stoppingPlace = docheight - navMargin - scrubHeight - fheight;



    window.addEventListener('scroll', holdscrub, true); 
    //window.addEventListener('mouseup', holdscrub, true); 

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


