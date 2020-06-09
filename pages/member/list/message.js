function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = require("../../../common/common.js");

Page({
    data: {
        search: "",
        loading: !1,
        Form: {},
        getdata: [],
        listdata: [],
        spin: !0,
        listIndex: 0,
        loadnot: !1,
        gotop: !1,
        popupForm: {}
    },
    onLoad: function() {
        a.init(this);
        var t = this;
        a.HttpMember("get/member/message", function(e) {
            a.initializeRefresh(e);
            var i = {
                getdata: {},
                listdata: {}
            };
            e.tabs.forEach(function(t, a) {
                i.getdata[a] = {
                    mode: "message",
                    page: 1,
                    state: a
                }, i.listdata[a] = {
                    list: [],
                    CurPage: 0
                };
            }), t.setData({
                getdata: i.getdata,
                listdata: i.listdata
            }), a.initialFun(!1), a.GetList(function(a) {
                t.setData({
                    spin: !1
                });
            });
        });
    },
    initialize: function() {
        var e, i = this, n = i.data.listIndex;
        i.setData((e = {}, t(e, "initialValue.listIndex", n), t(e, "listdata." + n, {
            list: [],
            CurPage: 0
        }), e)), a.initialFun(!0), a.GetList(function(t) {
            wx.stopPullDownRefresh();
        });
    },
    onShow: function() {
        a.init(this);
    },
    searchChange: function(t) {
        this.setData({
            search: t.detail
        });
    },
    searchSubmit: function() {
        var t = this, e = {
            getdata: {},
            listdata: {}
        };
        t.data.Form.tabs.forEach(function(a, i) {
            e.getdata[i] = {
                page: 1,
                state: i,
                mode: "message"
            }, "" != t.data.search && (e.getdata[i].key = t.data.search), e.listdata[i] = {
                list: [],
                CurPage: 0
            };
        }), t.setData({
            getdata: e.getdata,
            listdata: e.listdata
        }), a.GetList();
    },
    onReachBottom: function() {
        var e = this, i = e.data.listIndex, n = e.data.listdata[i];
        if (!e.data.loadnot && !e.data.loading && n.CurPage < n.TotalPage) {
            var s = "getdata." + i + ".page";
            e.setData(t({}, s, 1 * e.data.getdata[i].page + 1)), a.GetList();
        }
    },
    tabChange: function(t) {
        var e = this, i = t.detail.index, n = e.data.listdata[i];
        i != e.data.listIndex && (e.setData({
            listIndex: i
        }), n.CurPage ? n.CurPage < n.TotalPage ? e.loadnot = !1 : e.loadnot = !0 : a.GetList());
    },
    onPageScroll: function(t) {
        var a = this, e = t.scrollTop, i = a.data.gotop, n = 2 * a.data.SystemInfo.windowHeight;
        (e >= n && !i || e < n && i) && a.setData({
            gotop: !i
        });
    },
    readMessage: function(e) {
        var i = this, n = e.currentTarget.dataset, s = n.index, o = n.url;
        0 == n.state && (i.setData(t({}, "listdata." + i.data.listIndex + ".list[" + s + "].state", 1)), 
        a.Lay({
            action: "ajax",
            method: "execute",
            batch: "message_read",
            id: n.id
        })), wx.navigateTo({
            url: o
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
    onPullDownRefresh: function() {
        this.initialize();
    },
    onShareAppMessage: function() {}
});