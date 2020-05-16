import { extend } from 'flarum/extend';
import PostStreamScrubber from 'flarum/components/PostStreamScrubber';
import DiscussionPage from 'flarum/components/DiscussionPage';

/////////////////// RR work on Scrubber

extend(DiscussionPage.prototype, 'config', function() {

    /*
    turn off the scrubber for posts without a reply. This helps in cases
    where the initial post is only a line or two and the scrubber would
    fall off the screen.

    if there is a reply turn on all the classes that calculate its 
    place on the screen.

    */

if (typeof this.stream === 'undefined') {
        //  undefined
    } else {
        if (this.stream.visibleEnd < 2) {
            this.element.querySelector('.DiscussionPage-nav > ul').remove;
        } else {
            scrubberClass(this);
        }
    }

});

function scrubberClass(vnode) {
    // grab the scrubber, its height, and set an offset
    var qscrub = vnode.element.querySelector('.DiscussionPage-nav > ul');
    var headHeight = ktopheader.scrollHeight;

    // since the scrubber is created via JS the only way to access its margin
    // is via its computed height in the browser, then convert it into a number
    // qscrub.scrollHeight didn't work 100% of the time, espec on tall pages
    // recalculated it a different way below
    var scrubHeight = parseInt(window.getComputedStyle(qscrub).getPropertyValue("height"));
    var scrubTop = parseInt(window.getComputedStyle(qscrub).getPropertyValue("margin-top"));
    var scrubBottom = parseInt(window.getComputedStyle(qscrub).getPropertyValue("margin-bottom"));
    var navMargin = scrubTop + scrubBottom;

    // set the scroll number where we want to fix the Scrubber
    var sticky = scrubHeight+headHeight-navMargin;
    var fheight = document.getElementById('bigfoot').offsetHeight;

    window.addEventListener('scroll', holdscrub, true); 

    function holdscrub() {

        // recalculate height onscroll to capture changes to doc height because of replies
        var docHeight = document.body.scrollHeight;
        var stoppingPlace = docHeight - navMargin - scrubHeight - fheight;

        if (window.scrollY < sticky) {
            qscrub.classList.remove("fixit");
            qscrub.classList.remove("lowscrub");
            qscrub.classList.add("hiscrub");
        }

        if (window.scrollY >= sticky && window.scrollY < stoppingPlace ) {
            qscrub.classList.remove("lowscrub");
            qscrub.classList.remove("hiscrub");
            qscrub.classList.add("fixit");

        }

        if (window.scrollY >= stoppingPlace) {
            qscrub.classList.remove("fixit");
            qscrub.classList.remove("hiscrub");
            qscrub.classList.add("lowscrub");

        }
    }

}


//var scrollnum;
extend(PostStreamScrubber.prototype, 'config', function(isInitialized, context) {
    /*
    This extension replaces the onclick function of the "original post" link in the
    Scrubber and instead has the window scroll to the header. I do this because the
    header that I've inserted is much taller and the user doesn't need to scroll to 
    the very top of the window every time.

    THE PROBLEM with this fix is that it _jumps_ to the top of the window instead of scrolling.
    The scrollIntoView fix below works in Firefox and Chrome, but not Safari :/
    */

    var origpost = this.element.querySelector('.Scrubber-first');
    var headerdiv = document.getElementById("header");
    var headertotal = ktopheader.clientHeight + ktoprow.clientHeight;
    var scrollnum = headertotal;
    var herodiv = this.element.ownerDocument.querySelector('.DiscussionHero');

    origpost.onclick = function(e){

        // scrollTo(0, headertotal);
        // smooth scrolling on Firefox, still jumps in Safari
        herodiv.scrollIntoView({behavior: "smooth"});
    }

});

