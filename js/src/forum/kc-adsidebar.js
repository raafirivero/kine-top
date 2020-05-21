import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';

  
extend(IndexPage.prototype, 'sidebarItems', function(items) {
    // console.log(items.items);

    var sideAd = m(".kc-adunit",[
        m("a", {href:'#'},[
            m("img",{src:'/blog/_img/adunit-side.png'})
            ]),
        m(".adcopy","The Square Small Business Hackathon — Hack to help small businesses adapt, recover, and innovate.")
    ]);

    items.add('sideAdkoa', sideAd);

    // items.add('google', <a href="https://google.com">Google</a>);

})