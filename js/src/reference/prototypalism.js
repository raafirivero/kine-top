export * from './';
import { extend } from 'flarum/extend';
import HeaderPrimary from 'flarum/components/HeaderPrimary';


extend(HeaderPrimary.prototype, 'items', function(items) {
  items.add('google', <a href="https://google.com">Google</a>);
});


// Just some random code

var circle = {
    radius: 5,
    create: function (radius) {
        var circle = Object.create(this);
        circle.radius = radius;
        return circle;
    },
    area: function () {
        var radius = this.radius;
        return Math.PI * radius * radius;
    },
    circumference: function () {
        return 2 * Math.PI * this.radius;
    }
};

var circle2 = circle.create(10);

/*
I believe it is possible to use this pattern to rebuild
my header into a single function. Or - I believe it is possible
to use this pattern to create a universal object where I'm able
to call an API and retreive data.

In the API call, for instance, the thing I'm doing over and over
again is calling an API that lives at a specific link then inserting
the data I retreive into a specific block on the UI. Couldn't I 
abstract this process into a single reusable block of code and then,
say, have a call/receive function that brings back whatever
info I need? Then I could write specific implementations for _how_
to place that data into boxes once I get it, but I wouldn't be 
re-inventing the wheel every time I need to get some data. 
*/