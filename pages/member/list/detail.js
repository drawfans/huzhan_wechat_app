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
        previewList: [],
        dropShow: !1,
        searchVal: [],
        loading: !1,
        Form: {},
        getdata: [],
        listdata: [],
        popup: [],
        spin: !0,
        listIndex: 0,
        loadnot: !1,
        gotop: !1,
        popupForm: {}
    },
    onLoad: function(t) {
        a.init(this);
        var e = this;
        a.HttpMember({
            url: "get/member/detail",
            data: {
                mode: t.mode
            }
        }, function(i) {
            var n = {
                getdata: {},
                listdata: {},
                listIndex: 0,
                searchVal: []
            };
            i.tabs.forEach(function(a, e) {
                a.value === t.mode && (n.listIndex = e), n.getdata[e] = {
                    mode: a.value,
                    page: 1
                }, n.listdata[e] = {
                    list: [],
                    CurPage: 0
                };
            }), a.initializeRefresh(i), t.bh && i.tabs[n.listIndex].search && (n.getdata[n.listIndex].bh = t.bh, 
            n.searchVal[n.listIndex] = t.bh), e.setData({
                getdata: n.getdata,
                listdata: n.listdata,
                listIndex: n.listIndex,
                searchVal: n.searchVal
            }), a.initialFun(!1), a.GetList(function(t) {
                e.setData({
                    spin: !1
                });
            });
        });
    },
    onShow: function() {
        a.init(this);
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
    searchSubmit: function(e) {
        var i, n = this, s = n.data.listIndex, o = e.detail ? e.detail.replace(/\s+/g, "") : "", l = n.data.searchVal[s], d = n.data.getdata;
        if (l === o) return "" == o && a.Lay({
            info: "亲，搜索内容不能为空！"
        }), !1;
        "" == o ? delete d[s].bh : d[s].bh = o, d[s].page = 1, n.setData((i = {
            getdata: d
        }, t(i, "searchVal." + s, o), t(i, "listdata." + s, {
            list: [],
            CurPage: 0
        }), i)), a.GetList();
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
        }), wx.setNavigationBarTitle({
            title: e.data.Form.tabs[i].title
        }), n.CurPage ? n.CurPage < n.TotalPage ? this.loadnot = !1 : this.loadnot = !0 : a.GetList());
    },
    onPageScroll: function(t) {
        var a = this, e = t.scrollTop, i = a.data.gotop, n = 2 * a.data.SystemInfo.windowHeight;
        (e >= n && !i || e < n && i) && a.setData({
            gotop: !i
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