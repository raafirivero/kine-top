import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';

/////////////////// SideNav shadow

extend(IndexPage.prototype, 'sidebarItems', function(items) {
    // console.log(items);

    var divider = m(".kc-divider",[

            m("img",{src:'/blog/_img/edgefade-40.png'})

                ]);

    items.add('divider', divider);

})


