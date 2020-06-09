function t(t, i, a) {
    return i in t ? Object.defineProperty(t, i, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = a, t;
}

var i, a = require("../../common/common.js");

Page({
    data: (i = {
        spin: !0,
        popup: [],
        popupSpin: !1,
        loading: !1,
        Form: {},
        getdata: {},
        listdata: {}
    }, t(i, "popup", []), t(i, "ListSh", {}), t(i, "gotop", !1), t(i, "Form", {
        form: {
            radio: {},
            checkbox: {},
            picker: {},
            rate: {}
        }
    }), t(i, "popupForm", {
        form: {
            radio: {},
            checkbox: {},
            picker: {}
        }
    }), i),
    initialize: function() {
        var t = this;
        a.Gethtml("get/index", function(i) {
            a.initialFun(!1), a.initializeRefresh(i), t.tabsChange();
        });
    },
    tabsChange: function() {
        var i = this, e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            detail: {
                index: 0
            }
        }).detail.index, n = i.data.Form.tabs.list[e];
        if (!i.data.getdata[e]) {
            var r;
            i.setData((r = {
                listIndex: e
            }, t(r, "getdata." + e, n), t(r, "listdata." + e, {
                list: [],
                CurPage: 0
            }), r)), a.GetList();
        }
    },
    ListSh: function(i) {
        var a = this, e = i.currentTarget.id, n = "ListSh." + e, r = wx.createAnimation({
            duration: 200,
            timingFunction: "ease",
            delay: 0
        });
        a.data.ListSh[e] ? (r.translateY("100%").step(), setTimeout(function() {
            a.setData(t({}, n, !1));
        }, 201)) : (a.setData(t({}, n, !0)), r.translateY("0").step()), this.setData(t({}, n, r.export()));
    },
    onLoad: function() {
        a.init(this), this.initialize();
    },
    onShow: function() {
        a.init(this);
    },
    onShareAppMessage: function() {
        return a.getShare();
    },
    onPullDownRefresh: function() {
        a.initialFun(), this.initialize();
    },
    Lay: function(t) {
        a.Lay(JSON.parse(JSON.stringify(t)));
    },
    Commom: function(t) {
        var i = JSON.parse(JSON.stringify((t.currentTarget, t))), e = t.currentTarget ? i.currentTarget.dataset.action : i.action;
        a[e](i);
    },
    Popup: function(t) {
        a.Popup(t.currentTarget.dataset);
    }
});