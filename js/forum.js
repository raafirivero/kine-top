//export * from './src/forum';
import { extend } from 'flarum/extend';
import HeaderPrimary from 'flarum/components/HeaderPrimary';
import { Component } from '@flarum/core/forum';

// this is the div I inserted into the header inside th Flarum admin page.
var wpbrick = document.getElementById('wpbrick');
var listul = document.getElementById('listul');
var newslist = document.getElementById('newslist');
var showcase = document.getElementById('showcase');

// this grabs the titles of recent news posts
var url = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=20&per_page=5&_fields=title,link";
var localurl = "http://comm.site/blog/_junk/newslist.json";
var showcaseurl = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=18&per_page=1&_fields=title,content,video-link,kinefinity-camera,director,dp,editor"


var kData = {
    todos: {
        list: [],
        fetch: function() {
            m.request({
                method: "GET",
                url: localurl,
            })
            .then(function(items) {
                kData.todos.list = items
            })
        }
    }
}

var Todos = {
    oninit: kData.todos.fetch(),
    //log: console.log("inside Todos"),
    view: function(vnode) {      
        return [
            m("h2", {class: "newstitle"}, "News"),
            m("ul",{id:"listul",class: "listholder"}, [
                kData.todos.list.map(function(item) {
                return  m("li", [
                            m("a", {href: item.link}, item.title.rendered),
                        ])
                    
                
                })
            ])
        ]
        
    }   
}

m.mount(newslist, Todos);


var showhead = {
    view: function(vnode) {
        return m("h2", "Showcase")
    }
}
m.mount(showcase, showhead);

var metas = [];

var pullclip = {
    todos: {
        list: [],
        fetch: function() {
            m.request({
                method: "GET",
                url: showcaseurl,
            })
            .then(function(items) {
                pullclip.todos.list[0] = items
                metas = pullclip.todos.list[0]
                console.log(metas[0])
                //console.log(metas[0]['video-link'])
            })
        }
    }
}

var metarows = function (){
    var metalist = [];
    if(metas[0].director) metalist.push(m("span", {class:"meta-item"},"Director: "+metas[0].director))
    if(metas[0].dp) metalist.push(m("span", {class:"meta-item"},"DP: "+metas[0].dp))
    if(metas[0].editor) metalist.push(m("span", {class:"meta-item"},"Editor: "+metas[0].editor))
    if(metas[0].kinecam) metalist.push(m("span", {class:"meta-item"},"Kinefinity Camera: "+metas[0].kinecam))
    return metalist
}

var ShowClip = {
    oninit: pullclip.todos.fetch(),
    //log: console.log(pullclip.todos.list[0]),
    view: function(vnode) {
        return [
            m("div", {class: "showcasewrap"}, "hearmeout", [
                m("div",{class: "embedtest"}, metas[0]['video-link']),
                m("p",{class:"showcasemeta"},metarows())
            ])
        ]
    }
}

m.mount(showcase, ShowClip);