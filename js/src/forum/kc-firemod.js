//Fire Emoji module

var ktopheader = document.getElementById('ktopheader');
var morevideos = document.getElementById('morevideos');
var fireglowdot;
var fireglow;

var fullanim = m(".boxbox",
    [
        m(".redbox"),
        m(".orange"),
        m(".yellow"),
        m(".mosaic"),
    ]);
                
var emptyanim = m(".animation");
        

export var firemodule = function(firecount, clipid, apphost) {
    // id and apphost are there in case I want to expand this
    // module to flip between Flarum and WP

    fireglowdot = m(".fireglow");
    var fireball = m(".fireball",{class:"kbutton"});

    var clipclass = JSON.stringify(clipid);
    clipclass = "clip" + clipclass;
    
    var fireclasses = clipclass + " db-"+apphost;

    var module = [
        m(".firewrap",[
            emptyanim, 
            m(".firebox",{ onclick:counter, class:fireclasses },[
                fireglowdot,
                fireball,
                m(".firenum",firecount),     
            ])
        ])
    ];

    
    // startFire();
    return module;
}


function counter(event){
    /*
    Take the click, pull out the .firebox element - this is the most important thing.
    Do math on the number and make note of the ID number of the clip we're adjusting.
    */

    // console.log(event);

    var firebox = event.srcElement.closest('.firebox');
    var firenum = firebox.querySelector('.firenum');
    var fireball = firebox.querySelector('.fireball');
    var newnum = parseInt(firenum.innerText) + 1;

    var clipnumber = firebox.classList[1];
    var multiwrap = event.srcElement.closest('.multiwrap');

    // console.log("multiwrap : " + multiwrap);

    /*
    TinySlider duplicates the divs and places them in the DOM so that it can make
    a carousel. We must grab all of the elements from the wrapper with the 
    same clip number and change them at once for the count to work.
    */
    
    if ( null != multiwrap ) {
        var alldem = multiwrap.querySelectorAll('.'+clipnumber);
        alldem.forEach((element) => { 
            element.querySelector('.firenum').innerText = newnum;
        });
    } else {
        firenum.innerText = newnum;
    }

    // quickly change size of fireball, then start animation
    fireball.classList.add('pressed');
    setTimeout(reaction, 320, fireball, event);

    /*
    Now take that same clip number, lop off the 'clip' part and use it to
    call the WordPress API to update the upvote count in the database.
    */
    
    var boxid = clipnumber.substring(4);
    setNum.fetch(boxid,newnum);
}


var animVar;
function reaction(fireball, event){

    fireball.classList.remove('pressed');

    // render in the animation
    var anim = event.srcElement.closest('.firewrap').querySelector('.animation');
    m.render(anim, fullanim);

    // can't access the boxbox via jQuery until it's part of the DOM
    var boxbox = $(anim).find('.boxbox');

    // dump the animation
    animVar = setTimeout(killAnimation, 2000, anim);
    $(boxbox).delay(800).fadeOut(1000);

}

function killAnimation(anim) {
    m.render(anim, null)
}

var setNum = {
    error: [],
    fetch: function(id,newnum) {
        
        var base = 'https://comm.site/blog/wp-json/kinecom/showcase/';
        var querystring = base + id +'?upvotes=' + newnum;

        // most important thing here is the background setting, which keeps
        // Mithril from triggering a redraw

        m.request({
            method: "PUT",
            url: querystring,
            background: true,
        })
        .then(
            // celebrate
        )
        .catch(function(e) {
            console.log(e.message)
            setNum.error = e.message
        })
    }
}


function setProperty(duration,fireglowdot) {
    fireglow = document.querySelector('.fireglow');
    fireglow.style.setProperty('--animation-time', duration +'s');
}

function changeAnimationTime() {
    var animationDuration = Math.random();
    setProperty(animationDuration,fireglowdot);
}

function startFire(){
    setInterval(changeAnimationTime, 1000, fireglowdot);
}