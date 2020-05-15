
var vCarousel = {
    boxes: [],
    box: [],
    headline: "Submitted via <strong>#kinefinity</strong> on Vimeo and YouTube",
    build_boxes: function(data){
        // console.log("start building: " boxes)

        
            for (var i=0; i< vCarousel.boxes.length; i++) {
                
                if(vCarousel.boxes[i]['meta']['upvotes']) {
                    var firecount = vCarousel.boxes[i]['meta']['upvotes']
                } else {
                    var firecount = 0;
                }
        
                vCarousel.box.push(
                    m("div", {class:"sliderbox tns-lazy-img","data-src":vCarousel.boxes[i]['meta']['videolink'],width:"250px"}, [
                        m(".boxwrap .clip"+vCarousel.boxes[i]['id'], {
                        }, [
                            m(".iframe-container",[
                                // new approach
                                //m.trust(vCarousel.boxes[i]['meta']['oembed'])
                            ]),
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
            ])
        ]
    } 
}
