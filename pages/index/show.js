function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

!function(t) {
    t && t.__esModule;
}(require("../../common/WxValidate.js"));

var a = require("../../common/common.js");

Page({
    data: {
        spin: !0,
        loading: !1,
        previewList: [],
        getdata: {},
        listdata: {},
        popup: [],
        gotop: !1,
        tabIndex: 0,
        popupSpin: !1,
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
        e.setData({
            spin: !0
        }), a.Gethtml(e.data.url, function(i) {
            a.initialFun(t), a.initializeRefresh(i), e.setData({
                getdata: {
                    page: 1,
                    goods: i.data.bh
                },
                spin: !1
            }), i.ShowAttr && i.ShowAttr.Countdown && a.Countdown(i.ShowAttr.Countdown, "Form"), 
            "task" == i.type && e.getBidList(), wx.stopPullDownRefresh();
        });
    },
    onShow: function() {
        a.init(this);
    },
    onLoad: function(t) {
        a.init(this), t.url ? this.setData({
            url: a.UrlOptions(t)
        }) : this.setData({
            url: "get/shows/code/0"
        }), this.initialize(!1);
    },
    tabsChange: function(t) {
        "评价记录" != t.detail.title || this.data.getdata.CurPage || a.GetList(), this.setData({
            tabIndex: t.detail.index
        });
    },
    getBidList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], i = this, n = i.data.getdata.filter, o = i.data.Form.form.radio.filter || 0, r = e.currentTarget ? e.currentTarget.dataset.info : o;
        if (r !== n) {
            var s, d = 0 != r && /^[+-]?\d*\.?\d*$/.test(r) ? {
                bh: r
            } : {};
            i.setData((s = {}, t(s, "getdata.filter", "reset" != r ? r : o), t(s, "getdata.page", 1), 
            t(s, "Form.form.goBid", d), s)), a.GetList(function(t) {
                d.bh && a.querySelect(".item", function(t) {
                    a.Lay({
                        action: "go",
                        info: t.top
                    });
                });
            });
        }
    },
    revChange: function(e) {
        if (this.data.getdata.filter !== e.detail) {
            var i;
            this.setData((i = {}, t(i, "getdata.filter", e.detail), t(i, "getdata.page", 1), 
            i)), a.GetList();
        }
    },
    addServe: function(t) {
        var e = t.currentTarget.dataset, i = this.data.Form.data;
        if (i.allmoney) {
            var n = this.data.Form.AllmoneyOn || 0;
            i.allmoney[n] && (e = Object.assign(i.allmoney[n], e));
        }
        a.Lay(e);
    },
    gaChange: function(a) {
        this.setData(t({}, "Form." + a.currentTarget.dataset.field, a.currentTarget.id));
    },
    Lay: function(t) {
        a.Lay(JSON.parse(JSON.stringify(t)));
    },
    Commom: function(t) {
        var e = JSON.parse(JSON.stringify((t.currentTarget, t))), i = t.currentTarget ? e.currentTarget.dataset.action : e.action;
        a[i]();
    },
    Popup: function(t) {
        a.Popup(t.currentTarget.dataset);
    },
    onReachBottom: function() {
        var t = this.data.listdata;
        !this.data.loading && t.CurPage < t.TotalPage && (this.setData({
            "getdata.page": 1 * this.data.getdata.page + 1
        }), a.GetList());
    },
    onPullDownRefresh: function() {
        this.initialize();
    },
    onShareAppMessage: function() {
        return a.getShare();
    }
});