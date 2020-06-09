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
        loading: !1,
        Form: {},
        sortValue: "",
        search: "",
        getdata: {},
        listdata: {},
        popup: [],
        ListSh: {},
        gotop: !1,
        spin: !0,
        filter: {
            icon: !1,
            show: "",
            selectName: {},
            selectValue: {}
        }
    },
    onPageScroll: function(a) {
        var e = this, i = a.scrollTop, r = e.data.gotop, n = 2 * e.data.SystemInfo.windowHeight;
        if ((i >= n && !r || i < n && r) && e.setData({
            gotop: !r
        }), e.data.Form.lazy && e.data.Form.lazy.add > 0) {
            var s = e.data.Form.lazy, o = Math.ceil((i + e.data.SystemInfo.windowHeight) / s.height) * e.data.Form.lazy.add;
            o > s.pos && e.setData(t({}, "Form.lazy.pos", o));
        }
    },
    onLoad: function(t) {
        a.init(this);
        var e = this;
        t.url || (t.url = "get/lists/code"), a.Gethtml(t.url, function(t) {
            a.initializeRefresh(t);
            var i = {
                page: 1,
                type: t.type
            };
            t.par && (i.par = t.par), t.check && (i.check = t.check), t.store && (i.store = t.store.bh), 
            e.setData({
                getdata: i,
                listdata: {}
            }), a.initialFun(!1), a.GetList(function(t) {
                a.querySelect(".top", function(t) {
                    e.setData({
                        topHeight: t.height,
                        spin: !1
                    });
                });
            });
        });
    },
    initialize: function() {
        a.initialFun(), a.GetList(function(t) {
            wx.stopPullDownRefresh();
        });
    },
    onShow: function() {
        a.init(this);
    },
    tabsChange: function(t) {
        var e = this, i = t.currentTarget.dataset.field, r = e.data.Form, n = r.tabs, s = r[i], o = r.store && r.store.id ? "/" + r.store.id : "";
        for (var l in n) if (n[l].index === t.detail && s != l) {
            a.initialFun(), e.onLoad({
                url: "type" == i ? "get/lists/" + l + o : "get/lists/demand/" + l
            });
            break;
        }
    },
    ListSh: function(a) {
        var e = this, i = a.currentTarget.id, r = "ListSh." + i, n = wx.createAnimation({
            duration: 200,
            timingFunction: "ease",
            delay: 0
        });
        e.data.ListSh[i] ? (n.translateY("100%").step(), setTimeout(function() {
            e.setData(t({}, r, !1));
        }, 201)) : (e.setData(t({}, r, !0)), n.translateY("0").step()), this.setData(t({}, r, n.export()));
    },
    sortChange: function(t) {
        var e = t.currentTarget.dataset.value;
        if (e != this.data.sortValue) {
            var i = this.data.getdata;
            i.page = 1, e.length > 0 ? i.order = e : delete i.order, this.setData({
                getdata: i,
                listdata: {},
                sortValue: e
            }), a.GetList();
        }
    },
    Fselect: function(a) {
        var e = this, i = "filter.show";
        if ("value" == a.currentTarget.id) {
            var r, n = "filter.selectValue." + a.currentTarget.dataset.id, s = "filter.selectName." + a.currentTarget.dataset.id;
            e.setData((r = {}, t(r, n, a.currentTarget.dataset.value), t(r, s, a.currentTarget.dataset.name), 
            t(r, i, 0), r));
        } else "back" != a.currentTarget.id ? e.setData(t({}, i, a.currentTarget.id)) : e.setData(t({}, i, 0));
    },
    filterSubmit: function(e) {
        var i = this, r = !1, n = e.detail.value, s = i.data.getdata;
        for (var o in n) s.hasOwnProperty(o) && n[o].length <= 0 ? delete s[o] : n[o].length > 0 && (s[o] = n[o], 
        r = !0);
        i.setData(t({
            getdata: s
        }, "filter.icon", r)), i.filterHide(!0), a.GetList();
    },
    filterReset: function(t) {
        var a = JSON.parse(JSON.stringify(this.data.initialValue.filter));
        a.show = 0, this.setData({
            filter: a
        });
    },
    filterShow: function() {
        var a = this.data.filter;
        this.setData(t({
            filterOld: a
        }, "filter.show", 0));
    },
    filterHide: function(a) {
        var e = this;
        !0 === a ? e.setData(t({
            filterOld: ""
        }, "filter.show", "")) : e.setData(t({
            filter: e.data.filterOld
        }, "filter.show", ""));
    },
    inputChange: function(a) {
        this.setData(t({}, "filter.money." + a.target.id, a.detail.value));
    },
    checkboxChange: function(a) {
        this.setData(t({}, "filter.checkbox." + a.target.id, a.detail.value.length > 0));
    },
    searchChange: function(t) {
        var a = t.detail ? t.detail.replace(/\s+/g, "") : "";
        this.setData({
            search: a
        });
    },
    searchSubmit: function(t) {
        var e = this, i = e.data.getdata;
        e.data.search !== i.key && (i.page = 1, e.data.search.length > 0 ? i.key = e.data.search : delete i.key, 
        e.setData({
            getdata: i,
            listdata: {}
        }), a.GetList());
    },
    loginBackPage: function() {
        this.onReachBottom(!0);
    },
    onReachBottom: function(t) {
        var e = this.data.listdata;
        this.data.loading || !(e.CurPage < e.TotalPage) || e.failview && !0 !== t || (this.setData({
            "getdata.page": 1 * this.data.getdata.page + 1
        }), a.GetList());
    },
    onPullDownRefresh: function() {
        this.initialize();
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
    onShareAppMessage: function() {
        return a.getShare();
    }
});