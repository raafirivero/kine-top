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

// news at the top of the site
var newsurl = "https://comm.site/blog/wp-json/wp/v2/posts/?categories=19&per_page=5&_fields=title,link";

var kData = {
    content:[],
    fetch: function() {
        m.request({
            method: "GET",
            url: newsurl,
        })
        .then(function(data) {
            kData.content = data
            // console.log(data)
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
