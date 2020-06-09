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
        postShow: !1,
        searchShow: !1,
        searchVal: "",
        searchFocus: !1,
        loading: !1,
        getdata: [],
        listdata: [],
        popup: [],
        spin: !0,
        listIndex: 0,
        loadnot: !1,
        gotop: !1,
        active: {},
        previewList: [],
        Form: {
            form: {
                radio: {},
                checkbox: {},
                picker: {}
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
    onLoad: function(t) {
        a.init(this);
        var e = this;
        a.HttpMember({
            url: "get/member/manage",
            data: {
                list: t.list || "goods"
            }
        }, function(i) {
            a.initializeRefresh(i);
            var s = {
                listIndex: 0,
                getdata: {},
                listdata: {},
                active: {}
            };
            i.tabs.total.forEach(function(a, e) {
                s.getdata[e] = {
                    page: 1,
                    mode: a.key,
                    type: a.default
                }, s.listdata[e] = {
                    list: [],
                    CurPage: 0
                }, s.active[e] = 0, t.mode === a.key && (s.listIndex = e, t.type && i.tabs[a.key] && i.tabs[a.key].forEach(function(a, i) {
                    t.type === a.key && (s.active[e] = i, s.getdata[e].type = a.key);
                }));
            }), e.setData({
                active: s.active,
                getdata: s.getdata,
                listdata: s.listdata,
                listIndex: s.listIndex
            }), a.initialFun(!1), a.GetList(function(t) {
                e.setData({
                    spin: !1
                });
            });
        });
    },
    initialize: function() {
        a.initialFun(!0), a.GetList(function(t) {
            wx.stopPullDownRefresh();
        });
    },
    onShow: function() {
        a.init(this), this.data.Form.form.formLoad && this.initialize();
    },
    searchRemove: function() {
        (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]) && "" != this.data.searchVal.replace(/(^\s*)|(\s*$)/g, "") && this.searchSubmit({
            detail: ""
        }), this.setData({
            searchShow: !1,
            searchVal: ""
        });
    },
    searchSubmit: function(e) {
        var i = this, s = i.data.listIndex, o = e.detail ? e.detail.replace(/\s+/g, "") : "", n = i.data.searchVal, r = i.data.getdata;
        if (n === o) return "" == o && a.Lay({
            info: "亲，搜索内容不能为空！"
        }), !1;
        "" == o ? delete r[s].key : r[s].key = o, r[s].page = 1, i.setData(t({
            getdata: r,
            searchVal: o
        }, "listdata." + s, {
            list: [],
            CurPage: 0
        })), a.GetList();
    },
    searchToggle: function(t) {
        var a = this, e = a.data.searchShow;
        a.setData({
            searchShow: !e,
            searchFocus: !1
        }), e || setTimeout(function() {
            a.setData({
                searchFocus: !0
            });
        }, 100);
    },
    postToggle: function() {
        this.setData({
            postShow: !this.data.postShow
        });
    },
    onReachBottom: function() {
        var e = this, i = e.data.listIndex, s = e.data.listdata[i];
        if (!e.data.loadnot && !e.data.loading && s.CurPage < s.TotalPage) {
            var o = "getdata." + i + ".page";
            e.setData(t({}, o, 1 * e.data.getdata[i].page + 1)), a.GetList();
        }
    },
    typeChange: function(e) {
        var i = this, s = e.detail, o = i.data.listIndex, n = i.data.getdata[o], r = i.data.Form.tabs[n.mode];
        if (n.type != r[s].key) {
            var d;
            n.type = r[s].key, n.page = 1, n.key && (i.searchRemove(!1), delete n.key), i.setData((d = {}, 
            t(d, "active." + o, s), t(d, "getdata." + o, n), t(d, "listdata." + o, {
                list: [],
                CurPage: 0
            }), d)), a.GetList();
        }
    },
    tabChange: function(t) {
        var e = this, i = t.detail.index, s = e.data.listdata[i];
        i != e.data.listIndex && (e.setData({
            listIndex: i
        }), s.CurPage ? s.CurPage < s.TotalPage ? this.loadnot = !1 : this.loadnot = !0 : a.GetList());
    },
    onPageScroll: function(t) {
        var a = this, e = t.scrollTop, i = a.data.gotop, s = 2 * a.data.SystemInfo.windowHeight;
        (e >= s && !i || e < s && i) && a.setData({
            gotop: !i
        });
    },
    UpdateTabs: function(a) {
        var e, i = this.data.Form.tabs;
        for (var s in a) {
            var o = a[s];
            for (var n in i) for (var r in i[n]) ("total" == n && i[n][r].key == o.mode || n == o.mode && i[n][r].key == o.type) && (i[n][r].num = o.number > 0 ? parseInt(i[n][r].num) + parseInt(o.number) : parseInt(i[n][r].num) - parseInt(-1 * o.number));
        }
        this.setData((e = {}, t(e, "Form.tabs", i), t(e, "initialValue.Form.tabs", i), e));
    },
    ExecuteCallBack: function(a) {
        var e = this, i = e.data.listIndex, s = e.data.listdata[i], o = a.action, n = a.index;
        if ("uptime" == o) s.list[n].time = a.time; else {
            var r = a.mode, d = a.toMode, l = a.type;
            if (s.list.splice(n, 1), s.Total--, "updown" == o) {
                var c = [ {
                    type: l,
                    mode: r,
                    number: -1
                }, {
                    type: l,
                    mode: d,
                    number: 1
                } ], u = e.data.getdata;
                for (var h in u) if (d == u[h].mode && l == u[h].type && e.data.listdata[h].list.length > 0) {
                    var p;
                    e.setData((p = {}, t(p, "listdata." + h, {
                        list: [],
                        CurPage: 0
                    }), t(p, "getdata." + h + ".page", 1), p));
                    break;
                }
            } else if ("del" == o) c = [ {
                type: l,
                mode: r,
                number: -1
            } ];
            e.UpdateTabs(c);
        }
        e.setData(t({}, "listdata." + i, s));
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
    }
});