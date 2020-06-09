function t(t, i, e) {
    return i in t ? Object.defineProperty(t, i, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = e, t;
}

var i = require("../../common/common.js");

Page({
    data: {
        spin: !0,
        CustomNavigation: !0,
        timestamp: 0
    },
    initialize: function() {
        this.setData({
            spin: !0,
            popupSpin: !1,
            Form: {
                form: {
                    radio: {},
                    checkbox: {},
                    picker: {},
                    rate: {}
                }
            },
            popupForm: {
                form: {
                    radio: {},
                    checkbox: {},
                    picker: {}
                }
            },
            timestamp: i.timestamp()
        }), i.HttpMember("get/member/index?islogin=0", function(t) {
            i.initializeRefresh(t);
        });
    },
    onShow: function(t) {
        i.init(this), i.timestamp() - this.data.timestamp >= 30 && this.initialize();
    },
    signHide: function() {
        var i = this.data.Form.form;
        i.radio.sign = !0, this.setData(t({}, "Form.form", i));
    },
    onLoad: function() {
        i.init(this);
    },
    onPullDownRefresh: function() {
        this.initialize();
    },
    swiperAutoHeight: function(e) {
        var n = this, r = e.currentTarget.dataset, a = (n.data.Form.form.swiperHeight || {})[r.name] || {};
        a[e.detail.current] || i.querySelect("#swiper-" + r.name + "-" + e.detail.current, function(i) {
            a[e.detail.current] = "height:" + i.height + "px;", n.setData(t({}, "Form.form.swiperHeight." + r.name, a));
        });
    },
    Lay: function(t) {
        i.Lay(JSON.parse(JSON.stringify("Event" == t.type ? t.detail : t)));
    },
    Commom: function(t) {
        var e = JSON.parse(JSON.stringify((t.currentTarget, t))), n = t.currentTarget ? e.currentTarget.dataset.action : e.action;
        i[n](e);
    },
    Popup: function(t) {
        i.Popup(t.currentTarget.dataset);
    },
    onShareAppMessage: function() {}
});