import { extend, override } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';


app.initializers.add('kinefixes', () => {
  // console.log("big extend");
  
  extend(IndexPage.prototype, 'init', function() {
    // console.log(this);
    this.bodyClass = 'App--index kc';
  });

  extend(IndexPage.prototype, 'viewItems', function(items)  {
    // remove the "Latest" button from the front page
    if (items.has('sort')) {
        items.remove('sort');
    }
    items.add('topQuotes', randomQuote());
  })

})

var topQuotes = [
  m('.chewbacca', "'Auuurrllllghgghghghh!' - Chewbacca"),
  m('.jaws', '"You\'re gonna need a bigger boat." - Sheriff Brody'),
  m('.rivero', '"Big Naturales." - Rivero'),
  m('.ander', '"Anything for the shot." - P.T. Anderson'),
  m('.cop', '"It\'s the ones you get that matter." - Francis Ford Coppola'),
  m('.spike', '"We\'re not gonna fall for the okeydoke." - Spike Lee'),
  m('.deakins', '"People confuse \'pretty\' with good cinematography." - Roger Deakins'),
];


function randomQuote () {
  let randomItem = topQuotes[Math.floor(Math.random()*topQuotes.length)];
  return randomItem;
}


