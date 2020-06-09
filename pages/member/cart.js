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
        ListSh: {},
        getdata: "",
        listdata: {},
        popup: [],
        title: "",
        tabCurrent: 0,
        MyJifen: 0,
        CartMoney: 0,
        CartCount: 0,
        CartTotal: 0,
        CartPost: {},
        Allchecked: !0,
        spin: !0,
        timestamp: 0,
        previewList: []
    },
    onReachBottom: function() {
        var t = this, e = this.data.listdata;
        !t.data.loading && e.CurPage < e.TotalPage && (t.setData({
            "getdata.page": 1 * t.data.getdata.page + 1,
            spin: !0,
            timestamp: a.timestamp()
        }), a.GetList(function(a) {
            t.create_cartList("init");
        }));
    },
    create_cartList: function(t) {
        var e = this, o = e.data.listdata.list, i = [], n = [], s = [], d = [], r = 0, c = 0, g = 0, l = {};
        for (var h in o) {
            var u = o[h];
            for (var f in u.goods) {
                var m = u.goods[f];
                m.gchecked && (i[r] = m.bh, n[r] = m.yjifen, s[r] = m.type, d[r] = m.achecked ? 1 : 0, 
                c += Number(m.money), m.achecked && (c += Number(m.amoney)), m.yjifen > 0 && (c -= Number((.1 * m.yjifen).toFixed(2))), 
                "init" != t && m["m_" + m.bh] && (l["m_" + m.bh] = m["m_" + m.bh], l["z_" + m.bh] = m["z_" + m.bh]), 
                r++), m.gdisabled || g++;
            }
        }
        var y = {
            id: i.join("|"),
            jf: n.join("|"),
            ty: s.join("|"),
            az: d.join("|")
        };
        "init" == t ? e.setData({
            CartMoney: c,
            CartCount: r,
            CartTotal: g,
            CartPost: y,
            spin: !1
        }) : (e.setData({
            postIng: !0
        }), a.HttpMember({
            url: "post/cart",
            data: Object.assign(y, l)
        }, function(t) {
            e.setData({
                postIng: !1
            }), "url" == t.action && a.Lay(t);
        }));
    },
    AllChange: function(a) {
        if (a.detail && (a.detail.checked || this.data.CartTotal == this.data.CartCount && this.data.CartCount > 0)) {
            var e = this, o = a.detail.checked, i = e.data.listdata.list;
            for (var n in i) for (var s in i[n].goods) o !== i[n].goods[s].gchecked && e.goodChange({
                detail: {
                    name: "good_" + n + "_" + i[n].goods[s].bh,
                    checked: o
                }
            });
            e.setData(t({
                ListSh: {},
                Allchecked: o
            }, "listdata.list", i));
        }
    },
    ListSh: function(a) {
        var e = this, o = a.currentTarget.id, i = "ListSh." + o, n = wx.createAnimation({
            duration: 200,
            timingFunction: "ease",
            delay: 0
        });
        e.data.ListSh[o] ? (n.translateX("100%").step(), setTimeout(function() {
            e.setData(t({}, i, !1));
        }, 201)) : (e.setData(t({}, i, !0)), n.translateX("0").step()), this.setData(t({}, i, n.export()));
    },
    action: function(e) {
        var o = this, i = o.data.listdata.list, n = e.currentTarget.dataset, s = n.action, d = n.id, r = n.gid, c = i[d].goods, g = c[r], l = i[d].sell, h = c.length <= 1;
        a.PostMember("post/" + s, {
            action: s,
            bh: g.bh,
            tab: g.type
        }, function(a) {
            if (1 != a.state) return !1;
            var e = wx.createAnimation({
                duration: 300,
                timingFunction: "ease",
                delay: 0
            });
            e.translateX("120%").step(), o.setData(t({}, "delAnimation." + (h ? l : g.bh), e.export())), 
            setTimeout(function() {
                h ? i.splice(d, 1) : i[d].goods.splice(r, 1);
                var a = t({
                    delAnimation: {}
                }, "listdata.list", i);
                h && (a.ListSh = {}), o.setData(a), o.create_cartList("init");
            }, 301);
        });
    },
    goodChange: function(a) {
        if (a.detail) {
            var e = this, o = a.detail.checked, i = a.detail.name.split("_"), n = i[0], s = i[1], d = i[2], r = e.data.listdata.list[s], c = {
                no: 0,
                ok: 0
            }, g = "listdata.list[" + s + "]";
            if ("install" == n || "jifen" == n) for (var l in r.goods) r.goods[l].bh != d || r.goods[l].gdisabled || (o && !r.goods[l].gchecked && e.goodChange({
                detail: {
                    name: "good_" + s + "_" + d,
                    checked: o
                }
            }), "install" == n ? (r.goods[l].achecked = o, e.setData({
                CartMoney: e.data.CartMoney + Number(o ? r.goods[l].amoney : -1 * r.goods[l].amoney)
            })) : (r.goods[l].jchecked = o, o ? (r.goods[l].yjifen = e.data.MyJifen <= r.goods[l].kjifen ? e.data.MyJifen : r.goods[l].kjifen, 
            e.setData({
                MyJifen: e.data.MyJifen - r.goods[l].yjifen,
                CartMoney: e.data.CartMoney - Number((.1 * r.goods[l].yjifen).toFixed(2))
            })) : (e.setData({
                MyJifen: e.data.MyJifen + r.goods[l].yjifen,
                CartMoney: e.data.CartMoney + Number((.1 * r.goods[l].yjifen).toFixed(2))
            }), r.goods[l].yjifen = 0))); else if ("good" == n) {
                for (var l in r.goods) if (!r.goods[l].gdisabled) {
                    if (r.goods[l].bh == d) {
                        var h = r.goods[l].achecked, u = r.goods[l].jchecked;
                        r.goods[l].gchecked = o, o ? (e.setData({
                            CartCount: e.data.CartCount + 1,
                            CartMoney: e.data.CartMoney + Number(r.goods[l].money)
                        }), r.goods[l].achecked || (r.goods[l].achecked = r.goods[l].amoney <= 0)) : (e.setData({
                            CartCount: e.data.CartCount - 1,
                            CartMoney: e.data.CartMoney - Number(r.goods[l].money)
                        }), r.goods[l].achecked = !1, r.goods[l].jchecked = !1), r.goods[l].achecked !== h && e.goodChange({
                            detail: {
                                name: "install_" + s + "_" + d,
                                checked: r.goods[l].achecked
                            }
                        }), r.goods[l].jchecked !== u && e.goodChange({
                            detail: {
                                name: "jifen_" + s + "_" + d,
                                checked: r.goods[l].jchecked
                            }
                        });
                    }
                    r.goods[l].gchecked ? c.ok++ : c.no++;
                }
                e.data.CartTotal > e.data.CartCount && e.data.Allchecked && e.setData({
                    Allchecked: !1
                }), e.data.CartTotal != e.data.CartCount || e.data.Allchecked || e.setData({
                    Allchecked: !0
                }), 0 != c.ok && 0 != c.no || (r.schecked = 0 === c.no);
            } else if ("shop" == n) {
                for (var l in r.goods) r.goods[l].gdisabled || r.goods[l].gchecked === o || (e.goodChange({
                    detail: {
                        name: "good_" + s + "_" + r.goods[l].bh,
                        checked: o
                    }
                }), r.goods[l].gchecked = o);
                r.schecked !== o && (r.schecked = o);
            }
            e.setData(t({}, g, r));
        }
    },
    initialize: function() {
        var t = this;
        t.setData({
            spin: !0,
            postIng: !1
        }), a.HttpMember("get/member/cart?islogin=0", function(e) {
            a.initializeRefresh(e), t.setData({
                "getdata.page": 1,
                MyJifen: e.Myjifen,
                timestamp: a.timestamp()
            }), wx.stopPullDownRefresh(), a.GetList(function(a) {
                t.create_cartList("init");
            });
        });
    },
    Lay: function(t) {
        a.Lay(JSON.parse(JSON.stringify(t)));
    },
    Commom: function(t) {
        var e = JSON.parse(JSON.stringify((t.currentTarget, t))), o = t.currentTarget ? e.currentTarget.dataset.action : e.action;
        a[o](e);
    },
    Popup: function(t) {
        a.Popup(t.currentTarget.dataset);
    },
    onLoad: function() {
        a.init(this);
    },
    onShow: function() {
        a.init(this);
        var t = a.timestamp();
        (!wx.getStorageSync("sessionid") || t - this.data.timestamp >= 30) && this.initialize();
    },
    onPullDownRefresh: function() {
        this.initialize();
    },
    onShareAppMessage: function() {}
});