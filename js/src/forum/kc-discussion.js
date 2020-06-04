import app from 'flarum/app';
import { extend, override } from 'flarum/extend';
import avatar from 'flarum/helpers/avatar';
import IndexPage from 'flarum/components/IndexPage';
import Dropdown from 'flarum/components/Dropdown';
import Button from 'flarum/components/Button';
import listItems from 'flarum/helpers/listItems'
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import Composer from 'flarum/components/Composer';
import LogInModal from 'flarum/components/LogInModal';
import PostStream from 'flarum/components/PostStream';


app.initializers.add('kinefixes', () => {
	// console.log("big extend");
	
	extend(IndexPage.prototype, 'init', function() {

		this.bodyClass = 'App--index kc';

	});

	extend(IndexPage.prototype, 'actionItems', function(items)  {

		// moves the "Latest" sort button over to the action items on the right
		const sortMap = app.cache.discussionList.sortMap();

		const sortOptions = {};
		for (const i in sortMap) {
			sortOptions[i] = app.translator.trans('core.forum.index_sort.' + i + '_button');
		}

		items.add(
			'sort',
			Dropdown.component({
				buttonClassName: 'Button',
				label: sortOptions[this.params().sort] || Object.keys(sortMap).map((key) => sortOptions[key])[0],
				children: Object.keys(sortOptions).map((value) => {
					const label = sortOptions[value];
					const active = (this.params().sort || Object.keys(sortMap)[0]) === value;

					return Button.component({
						children: label,
						icon: active ? 'fas fa-check' : true,
						onclick: this.changeSort.bind(this, value),
						active: active,
					});
				}),
			})
		);

	})

	extend(IndexPage.prototype, 'viewItems', function(items)  {

		// remove the "Latest" button from the middle of the front page
		if (items.has('sort')) {
				items.remove('sort');
		}


			if (app.current.props.routeName == "index" && app.composer.active == true || app.current.props.routeName == "index" && app.search.hasFocus == true ) { 
				// don't flip through quotes if someone types in the search bar or composer.

						if(this.element == null) {
							// 
					} else {
						// console.log(this);
						let oldQuote = this.element.querySelector('.item-topQuotes').innerHTML;
						let mquote = m.trust(oldQuote);
						items.add('topQuotes', mquote );
			}
			} else {
				items.add('topQuotes', randomQuote() );
			}
		

	})

	override(IndexPage.prototype, 'view', function(vdom)  {

	/*
	Let's add a big social media-style comment form at the top of the DiscussionList.
	We'll have to insert it by overriding the IdexPage's view:
	*/

	//let myComposer = new Composer;

	let appUser = app.session.user;
	let avatarDisc = avatar(appUser);

	let promoText = '<div class="promote-pro">PRO</div> \
		<div class="promote-copy">Downloads &amp; Bragging Rights</div> \
		<div class="promote-price"><div class="big">$8</div><div class="yearly">/yr</div></div> \
		<div class="promote-link"><a href="#">Join Now</a></div>';

	var composeTop = [
		m('div',{class:'altDisc'},[
			avatarDisc,
			m('.fakeform',{onclick:startComp},'create new topic'),
			m('img',{src:'/blog/_img/kc-comment.png',class:'kc-comment'})
		]),
		m('.PromoteBlock',[
			m.trust(promoText),
		])
	];

	function startComp() {

		const deferred = m.deferred();

		if (app.session.user) {
			const component = new DiscussionComposer({ user: app.session.user });

			app.composer.load(component);
			app.composer.show();

			deferred.resolve(component);
		} else {
			deferred.reject();

			app.modal.show(new LogInModal());
		}

		return deferred.promise;
	}

		return (
			<div className="IndexPage">
				{this.hero()}
				<div className="container">
					<div className="sideNavContainer">
						<nav className="IndexPage-nav sideNav">
							<ul>{listItems(this.sidebarItems().toArray())}</ul>
						</nav>
						<div className="IndexPage-results sideNavOffset">
							<div className="IndexPage-toolbar">
								<ul className="IndexPage-toolbar-view">{listItems(this.viewItems().toArray())}</ul>
								<ul className="IndexPage-toolbar-action">{listItems(this.actionItems().toArray())}</ul>
							</div>
		<div className="ComposeTop">{composeTop}</div>
							{app.cache.discussionList.render()}
						</div>
					</div>
				</div>
			</div>
		);
	})


	extend(Composer.prototype, 'hide', function()  {

		// scroll up just a tiny bit after we hide the composer so that 
		// the scrubber won't overlap the footer

		let composerHeight = app.composer.height;

		$('html,body')
			.stop(true)
			.animate(
			{
					scrollTop: window.scrollY - composerHeight,
			});
		})

})



var topQuotes = [
	m('.chewbacca', "'Auuurrllllghgghghghh!' - Chewbacca"),
	m('.jaws', '"You\'re gonna need a bigger boat." - Sheriff Brody'),
	m('.rivero', '"Eyes on." - Rivero'),
	m('.ander', '"Anything for the shot." - P.T. Anderson'),
	m('.cop', '"It\'s the ones you get that matter." - Francis Ford Coppola'),
	m('.spike', '"We\'re not gonna fall for the okeydoke." - Spike Lee'),
	m('.deakins', '"People confuse \'pretty\' with good cinematography." - Roger Deakins'),
	m('.ozu', '"I formulated my own directing style in my own head, proceeding without any unnecessary imitation of others…for me there was no such thing as a teacher. I have relied entirely on my own strength." - Yasujiro Ozu'),
	m('.fincher', '"The fact is, you don\'t know what directing is until the sun is setting and you\'ve got to get five shots and you\'re only going to get two." - David Fincher'),
];

// work on randomizer for CSV file below:

function randomQuote (data) {

		let randomItem = topQuotes[Math.floor(Math.random()*topQuotes.length)];
		return randomItem;

}

// m.request({
//   method: "GET",
//   url: "/blog/_junk/film-quotes.csv",
//   // deserialize: parseCSV
// })
// .then(function(data) {
//   randomQuote(data);
// })

// function parseCSV(data) {
//   // naive implementation for the sake of keeping example simple
//   return data.split("\n").map(function(row) {
//       return row.split(",")
//   })
// }

