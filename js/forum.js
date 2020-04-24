//export * from './src/forum';
import { extend } from 'flarum/extend';
import HeaderPrimary from 'flarum/components/HeaderPrimary';
import { Component } from '@flarum/core/forum';

// For the news link section at the top right, here is the call I use
// http://kinecommunity.com/wp-json/wp/v2/posts/?categories=155&per_page=5&_fields=title,link
// important to get the category ID number from the WP admin

// this is the div I inserted into the header inside th Flarum admin page.
var wpbrick = document.getElementById('wpbrick');

// this grabs the titles of recent news posts
var url = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=18&per_page=5&_fields=title,link";
var localurl = "http://comm.site/blog/_junk/newslist.json";


// this grabs the titles of recent news posts
var url = "http://comm.site/blog/wp-json/wp/v2/posts/?categories=18&per_page=5&_fields=title,link";
var localurl = "http://comm.site/blog/_junk/newslist.json"

//m.request({method: "GET", url: url}).then(newsitems_data);
var nat = m("strong", {style:"text-transform:uppercase"}, "Natural");
//console.log(nat);


// Refer to this structure. Learn it. Master it.
var KComponent = (function(){
	// private component members
	var greeting = "";
	//var dalist = St(url);
	m.request({method: "GET", url: url}).then(kcontrol);

	function kcontrol(stuff){
		if (!stuff) return null;
		//dalist.get()
		// console.log(dalist.data); 
			$.each(stuff, function(index, value) {
				//console.log(value.link);
				var gotit =
				 m("li", [
					m("a", {href: value.link}, value.title.rendered),
					m("span", value.title.rendered),
					
				]);
				
				//console.log(gotit);
				view(gotit);
				//var simple = m("span", value.title.rendered);
				//var simple = value.title.rendered;
				//view(simple);
			});
			// return m("li", "Wizard")
			//view(stuff)		
	}

	// ... other component logic ...
	function view(stuff){
		if (!stuff) return m("ul.listholder",{ID:"listul"});
		var listul = document.getElementById('listul');
		// console.log(stuff);
		return m("listul",'',[
			console.log(stuff),
			stuff,
			//m("li",stuff),
			nat,
			//console.log(stuff),
			m("li", "Wizard"),
			]);
		}
		
		

	
	return {   // public interface
		view: view,
		controller: kcontrol,
	};
}());
m.mount(wpbrick, KComponent);

