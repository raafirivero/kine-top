

var newslist = document.getElementById('newslist');
var url = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=19&per_page=5&_fields=title,link";
var localurl = "http://comm.site/blog/_junk/newslist.json";



var kData = {
    todos: {
        list: [],
        fetch: function() {
            m.request({
                method: "GET",
                url: url,
            })
            .then(function(items) {
                kData.todos.list = items
            })
        }
    }
}

function htmlEntities(str) {
    return String(str).replace(/&#8211;/g,'-').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
}

var Todos = {
    oninit: kData.todos.fetch(),
    view: function(vnode) {      
        return [
            m("h2", {class: "newstitle"}, "Latest News"),
            m("ul",{id:"listul",class: "listholder"}, [
                kData.todos.list.map(function(item) {
                return  m("li", [
                            m("a", {href: item.link}, htmlEntities(item.title.rendered)),
                        ])
                    
                
                })
            ])
        ]
        
    }   
}
m.mount(newslist, Todos);

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
var showcase = document.getElementById('showcase');
var tempvideo = '';
var tempser = ''
var metas = [];
var embedcode = '';

var pullmeta = {
    todos: {
        list: [],
        fetch: function() {
            m.request({
                method: "GET",
                url: showcaseurl,
            })
            .then(function(items) {
                pullmeta.todos.list[0] = items
                metas = pullmeta.todos.list[0]
                tempvideo = (metas[0].videolink)
                tempser = encode(tempvideo);
            })
            .then(pullclip.todos.fetch)
        }
    }
}

var metarows = function (){
    var metalist = [];
    if(metas[0].director) metalist.push(m("span", {class:"meta-item"},"Director: "+metas[0].director))
    if(metas[0].dp) metalist.push(m("span", {class:"meta-item"},"DP: "+metas[0].dp))
    if(metas[0].editor) metalist.push(m("span", {class:"meta-item"},"Editor: "+metas[0].editor))
    if(metas[0].kinecamera) metalist.push(m("span", {class:"meta-item"},"Camera: "+metas[0].kinecamera))
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
    todos: {
        list: [],
        fetch: function() {
            // log: console.log('are we fetching?'),
            m.request({
                method: "GET",
                url: tempser,
            })
            .then(function(items) {
                //take received JSON and send it to a view
                pullclip.todos.list = items['html']
                cliphtml = items['html']
            })
        }
    }
}


var ShowClip = {
    oninit: // get the metadata and get the video, two separate calls
    [pullmeta.todos.fetch()],
    view: function(vnode) {
        return [
            m("div", {class: "showcasewrap"}, "", [
                m("h2",{class: "shotitle"}, "Showcase"),
                m("p",{class:"showcasemeta"},metarows()),
                m("div",{class: "embedwrap",ID:"showembed"}, [
                    m.trust(cliphtml),
                ]),
            ])
        ]
    }
}

m.mount(showcase, ShowClip);