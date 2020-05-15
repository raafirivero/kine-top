var boxes = []
var hover = false
var cliproll = ''
var box = []
var boxthumbs = []
var boxembed = []
var h1 = "Submitted via <strong>#kinefinity</strong> on Vimeo and YouTube";


var build_boxes =  function(){
    // console.log("start building")
    //console.log(boxes);
    
    for (var i=0; i< vCarousel.boxes.length; i++) {
        
        // if(vCarousel.boxes[i]['meta']['upvotes']) {
        //     var firecount = vCarousel.boxes[i]['meta']['upvotes']
        // } else {
        //     var firecount = 0;
        // }

        boxthumbs.push(
            m("img", {
                class:"showthumb inside thumb"+i,
                src:vCarousel.boxes[i]['meta']['thumbnail'], 
                onmouseenter:flipper     
            })
        )

        box.push(
            m(".sliderbox", [
                m(".boxwrap .clip"+vCarousel.boxes[i]['id'], {
                }, [
                    m(".iframe-container",[
                        // new approach
                        m.trust(vCarousel.boxes[i]['meta']['oembed'])
                    ]),
                    //metarows("li","morevideos",vCarousel.boxes[i]['meta']),
                    //firemodule(firecount)
                ])
            ])
        )

        boxembed.push(
        //m.trust(vCarousel.boxes[i]['meta']['oembed'])

        )
        
    }
    //console.log(box);
    return box;
}