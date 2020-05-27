import app from 'flarum/app';
import PostStreamScrubber from 'flarum/components/PostStreamScrubber';
import { scrubberClass } from './kc-scrubber.js'

// small program to remove the big header after interaction

var ktoprow = document.getElementById('ktoprow');
var ktopheader = document.getElementById('ktopheader');
var bigfoot = document.getElementById('bigfoot');
var appJS = document.getElementById('app');

appJS.addEventListener('click', smallHeader, true); 
//console.log(app);



function smallHeader(e) {

    var wholeApp = e.srcElement.closest('#app');

    if(wholeApp.classList[1] == 'App--index') {
        // leave the big header up until the user has clicked once on the app itself

        m.render(ktoprow,null);
        m.render(ktopheader,null);

        $('#ktoprow').slideUp('slow');
        $('#ktopheader').fadeTo('fast', .5).addClass('slim');
        
        // tried creating a negative margin to hide the ktopheader, but that didn't work either
        // my guess is that the scrubber just looks at the overall height of the page

        appJS.removeEventListener('click', smallHeader);

        // try importing the init function from PostStreamScrubber
        // and triggering it here.
        // PostStreamScrubber;
        // didn't work.

        //scrubberClass(app.current);

    }

}