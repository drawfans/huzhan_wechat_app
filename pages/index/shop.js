function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = require("../../common/common.js");

Page({
    data: {
        previewList: [],
        spin: !0,
        popup: [],
        gotop: !1,
        tabIndex: 0,
        getdata: {},
        listdata: {},
        loading: !1,
        fixedOn: !1,
        Form: {
            form: {
                radio: {},
                checkbox: {},
                picker: {},
                rate: {},
                send: {}
            }
        },
        popupForm: {
            form: {
                radio: {},
                checkbox: {},
                picker: {}
            }
        }
    },
    initialize: function() {
        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], e = this;
        a.Gethtml(e.data.url, function(i) {
            a.initialFun(t), a.initializeRefresh(i), e.setData({
                getdata: {
                    page: 1,
                    store: i.store.bh
                },
                spin: !1
            }), wx.stopPullDownRefresh();
        });
    },
    tabsChange: function(t) {
        "评价" != t.detail.title || this.data.getdata.CurPage || a.GetList(), this.setData({
            tabIndex: t.detail.index
        });
    },
    radioChange: function(e) {
        if (this.data.getdata.filter !== e.detail) {
            var i;
            this.setData((i = {}, t(i, "getdata.filter", e.detail), t(i, "getdata.page", 1), 
            i)), a.GetList();
        }
    },
    onPageScroll: function(t) {
        var a = this.data.gotop, e = t.scrollTop;
        (e >= 1e3 && !a || e < 1e3 && a) && this.setData({
            gotop: !a
        });
    },
    onReachBottom: function() {
        var t = this.data.listdata;
        !this.data.loading && t.CurPage < t.TotalPage && (this.setData({
            "getdata.page": 1 * this.data.getdata.page + 1
        }), a.GetList());
    },
    contact: function() {
        a.Lay({
            action: "contact",
            info: this.data.Form.store.bh
        });
    },
    Lay: function(t) {
        a.Lay(JSON.parse(JSON.stringify(t)));
    },
    Commom: function(t) {
        var e = JSON.parse(JSON.stringify((t.currentTarget, t))), i = t.currentTarget ? e.currentTarget.dataset.action : e.action;
        a[i](e);
    },
    Popup: function(t) {
        a.Popup(t.currentTarget.dataset);
    },
    onLoad: function(t) {
        this.setData({
            url: t.url ? t.url : "get/ishop/"
        }), a.init(this), this.initialize(!1);
    },
    onShow: function() {
        a.init(this);
    },
    onPullDownRefresh: function() {
        this.initialize();
    },
    onShareAppMessage: function() {
        return a.getShare();
    }
});