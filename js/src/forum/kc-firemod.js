//Fire Emoji module

var ktopheader = document.getElementById('ktopheader');
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
        

export var firemodule = function(firecount, id, apphost) {
    // id and apphost are there in case I want to expand this
    // module to flip between Flarum and WP

    fireglowdot = m(".fireglow");
    var fireball = m(".fireball",{class:"kbutton"});

    var module = [
        m(".firewrap",[
            emptyanim, 
            m(".firebox",[
                fireglowdot,
                fireball,
                m(".firenum",firecount),     
            ])
        ])
    ];

    startFire();
    return module;
}


function counter(event){
    /*
    TinySlider duplicates the divs and places them in the DOM so that it can make
    a carousel. We must grab all of the elements from the wrapper with the 
    same clip number and change them at once for the count to work.
    */

    var firebox = event.srcElement.closest('.boxwrap').querySelector('.firebox');
    var firenum = firebox.querySelector('.firenum');
    var fireball = firebox.querySelector('.fireball');
    var anim = firebox.querySelector('.animation');
    //console.log(anim);

    if (event.srcElement.closest('.firebox') === null) {
        // get the hell out if we're not clicking on the firebox
        return;
    }
    var clipnumber = firebox.closest('.boxwrap').classList[1];
    var multiwrap = event.srcElement.closest('.multiwrap');
    
    var alldem = multiwrap.querySelectorAll('.'+clipnumber);
    alldem.forEach((element) => { 
        firenum.innerText ++; 
    });

    // quickly change size of fireball, then start animation
    fireball.classList.add('pressed');
    setTimeout(reaction, 320, fireball, event);

    /*
    Now take that same clip number, lop off the 'clip' part and use it to
    call the WordPress API to update the upvote count in the database.
    */
    
    var boxid = clipnumber.substring(4);
    setNum.fetch(boxid,firenum);
}
ktopheader.addEventListener('click', counter, true); 


var animVar;
function reaction(fireball, event){

    fireball.classList.remove('pressed');

    // render in the animation
    var anim = event.srcElement.closest('.boxwrap').querySelector('.animation');
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
    fetch: function(id,holdnum) {
        
        var base = 'https://comm.site/blog/wp-json/kinecom/showcase/';
        var newnum = holdnum.innerText;
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