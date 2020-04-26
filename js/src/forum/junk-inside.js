//keep this - it works:

var ShowClip = {
    oninit: pullclip.todos.fetch(),
    //log: console.log(pullclip.todos.list[0]),
    view: function(vnode) {
        return [
            m("div", {class: "showcasewrap"}, "hearmeout", [
                m("div",{class: "embedtest"}, metas[0]['videolink']),
                m("p",{class:"showcasemeta"},[
                    m("span", {class:"meta-item"},"director: "+metas[0].director),
                    m("span", {class:"meta-item"},", dp: "+metas[0].dp),
                    m("span", {class:"meta-item"},", editor: "+metas[0].editor),
                ])
            ])
        ]
    }
}