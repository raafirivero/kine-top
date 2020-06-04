import { extend, override } from 'flarum/extend';
import PostStreamScrubber from 'flarum/components/PostStreamScrubber';
import DiscussionPage from 'flarum/components/DiscussionPage';
import PostStream from 'flarum/components/PostStream';


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


export function scrubberClass(vnode) {

    // grab the scrubber, its height, and set an offset
    var qscrub = vnode.element.querySelector('.DiscussionPage-nav > ul');
    var ktopHeight = ktopheader.scrollHeight;
    var krowHeight = ktoprow.scrollHeight;
    var headHeight = ktopHeight + krowHeight;

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

override(PostStreamScrubber.prototype, 'onresize', function() {

    this.scrollListener.update();

    // Manually set the height of the scrollbar:

    const scrubber = this.$();
    const scrollbar = this.$('.Scrubber-scrollbar');
    const kcScrubberHeight = 400;

    /*
    is the amount of space where the Scrubber should fit less than the height setting
    we're creating above? If so, hide the scrubber.

    note: the scrubber's actual height should be the number above PLUS its css margin
    */

    let roomForScrubber = $('.PostStream').outerHeight() - parseInt($('.PostStream').css('margin-top'));
    let scrubberTotalHeight = kcScrubberHeight + parseInt(scrubber.css('margin-top'));

    if ( roomForScrubber < scrubberTotalHeight ) {
        $('.PostStreamScrubber').css(
            'display',
            'none'
          );
    } else {
        $('.PostStreamScrubber').css(
            'display',
            'block'
          );
        scrollbar.css(
            'max-height',
            kcScrubberHeight
        );
    }
    
    /* 
    Old calculation of the Scrubber height is too reliant on the height of the
    viewport and breaks. Calculation above is simpler and works better for my purposes.
    However, if I wanted to calculate the height of the scrubber dynamically, then
    there is still some room for tweaking here.
    */

})


extend(PostStream.prototype, 'goToNumber', function(fn, number, noAnimation) {
    // make it so that the app scrolls to the last post and not the bottom of the page
    // when the composer is opened. The 360 number represents the programmed height
    // of the scrubber. Should probably grab this number programatically.

    let bottomPosition = $(document).height() - $('#bigfoot').height();
    let composerHeight = app.composer.height;

    if (number === 'reply') {
        return this.goToLast().then(() => {
            $('html,body')
            .stop(true)
            .animate(
            {
                
                scrollTop: bottomPosition - composerHeight - 360,

            },
            'fast',
            () => {
                this.flashItem(this.$('.PostStream-item:last-child'));
            }
            );
        });
    }

    // last piece of this will be to grab the Composer hide() function and scroll
    // back up to bottomPosition - veiwportHeight when it's all over.

})


