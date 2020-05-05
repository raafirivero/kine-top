return m("table", fellowship2_data().members.map(
    function(member){
        return m("tr", [m("td", member.name), m("td", member.race)]);
    }
));


var vCarousel = {
    getback: function(array){
        console.log(array);
    },
    view: function(vnode) {
        return [
            m("div", {class: "singlewrap"}, "", [
                m("div",{class: "embedwrap",ID:"showembed"}, [
                    m.trust(cliphtml),
                m("p",{class:"showcasemeta"},metarows()),
                ]),
            ])
        ]
    }
}

