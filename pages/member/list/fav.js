function t(t, a, i) {
    return a in t ? Object.defineProperty(t, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = i, t;
}

var a = require("../../../common/common.js");

Page({
    data: {
        loading: !1,
        getdata: [],
        listdata: [],
        ListSh: {},
        spin: !0,
        Form: {},
        listIndex: 0,
        loadnot: !1,
        gotop: !1,
        popupForm: {},
        itemAnimation: {}
    },
    onLoad: function(t) {
        a.init(this);
        var i = this;
        a.HttpMember({
            url: "get/member/fav",
            data: {
                mode: t.mode
            }
        }, function(e) {
            var n = {
                getdata: {},
                listdata: {},
                listIndex: 0
            };
            e.tabs.forEach(function(a, i) {
                a.value === t.mode && (n.listIndex = i), n.getdata[i] = {
                    mode: a.value,
                    page: 1
                }, n.listdata[i] = {
                    list: [],
                    CurPage: 0
                };
            }), a.initializeRefresh(e), t.bh && e.tabs[n.listIndex].search && (n.getdata[n.listIndex].bh = t.bh, 
            n.searchVal[n.listIndex] = t.bh), i.setData({
                getdata: n.getdata,
                listdata: n.listdata,
                listIndex: n.listIndex
            }), a.initialFun(!1), a.GetList(function(t) {
                i.setData({
                    spin: !1
                });
            });
        });
    },
    onShow: function() {
        a.init(this);
    },
    initialize: function() {
        var i, e = this, n = e.data.listIndex;
        e.setData((i = {}, t(i, "initialValue.listIndex", n), t(i, "listdata." + n, {
            list: [],
            CurPage: 0
        }), i)), a.initialFun(!0), a.GetList(function(t) {
            wx.stopPullDownRefresh();
        });
    },
    ListSh: function(a) {
        var i = this, e = a.currentTarget.id, n = "ListSh." + e, s = wx.createAnimation({
            duration: 200,
            timingFunction: "ease",
            delay: 0
        });
        i.data.ListSh[e] ? (s.translateY("100%").step(), setTimeout(function() {
            i.setData(t({}, n, !1));
        }, 201)) : (i.setData(t({}, n, !0)), s.translateY("0").step()), this.setData(t({}, n, s.export()));
    },
    action: function(i) {
        var e = this, n = e.data.listIndex, s = e.data.listdata[n], o = i.currentTarget.dataset, r = o.id, l = o.action, d = s.list[r].bh, u = e.data.Form.tabs[n].value;
        a.PostMember("post/fav", {
            action: l,
            bh: d,
            tab: u
        }, function(a) {
            if (1 != a.state) return !1;
            if ("del" == l) {
                var i = wx.createAnimation({
                    duration: 300,
                    timingFunction: "ease",
                    delay: 0
                });
                i.translateX("120%").step(), e.setData(t({}, "itemAnimation." + d, i.export())), 
                setTimeout(function() {
                    s.Total--, s.list.splice(r, 1), e.setData(t({
                        itemAnimation: {}
                    }, "listdata." + n, s));
                }, 301);
            } else if ("up" == l || "down" == l) {
                var o = s.list.splice(r, 1)[0];
                o.top = Number(!Boolean(parseInt(o.top))), "up" == l ? s.list.unshift(o) : s.list.push(o), 
                e.setData(t({}, "listdata." + n, s));
            }
        });
    },
    onReachBottom: function() {
        var i = this, e = i.data.listIndex, n = i.data.listdata[e];
        if (!i.data.loadnot && !i.data.loading && n.CurPage < n.TotalPage) {
            var s = "getdata." + e + ".page";
            i.setData(t({}, s, 1 * i.data.getdata[e].page + 1)), a.GetList();
        }
    },
    tabChange: function(t) {
        var i = this, e = t.detail.index, n = i.data.listdata[e];
        e != i.data.listIndex && (i.setData({
            listIndex: e
        }), wx.setNavigationBarTitle({
            title: i.data.Form.tabs[e].title
        }), n.CurPage ? n.CurPage < n.TotalPage ? this.loadnot = !1 : this.loadnot = !0 : a.GetList());
    },
    onPageScroll: function(t) {
        var a = this, i = t.scrollTop, e = a.data.gotop, n = 2 * a.data.SystemInfo.windowHeight;
        (i >= n && !e || i < n && e) && a.setData({
            gotop: !e
        });
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
    },
    onPullDownRefresh: function() {
        this.initialize();
    },
    onShareAppMessage: function() {}
});