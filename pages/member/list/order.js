function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../vant/dialog/dialog")), e = require("../../../common/common.js");

Page({
    data: {
        dropShow: !1,
        dropTips: "请输入订单号",
        dropField: "order",
        dropName: "订单号",
        searchVal: "",
        loading: !1,
        Form: {},
        getdata: [],
        listdata: [],
        animation: {},
        popupSpin: !1,
        popupForm: {},
        previewList: [],
        popup: [],
        spin: !0,
        listIndex: 0,
        role: "buy",
        loadnot: !1,
        gotop: !1
    },
    onLoad: function(t) {
        e.init(this);
        var a = this;
        e.HttpMember({
            url: "get/member/order",
            data: {
                role: t.role || a.data.role
            }
        }, function(o) {
            e.initializeRefresh(o);
            var i = {
                getdata: {},
                listdata: {}
            };
            o.tabs.forEach(function(t, a) {
                i.getdata[a] = {
                    mode: o.role,
                    page: 1,
                    state: t.value
                }, i.listdata[a] = {
                    list: [],
                    CurPage: 0
                };
            }), a.setData({
                role: t.role || a.data.role,
                getdata: i.getdata,
                listdata: i.listdata,
                listIndex: t.mode || 0
            }), e.initialFun(!1), e.GetList(function(t) {
                a.setData({
                    spin: !1
                });
            });
        });
    },
    onShow: function() {
        e.init(this);
    },
    initialize: function() {
        e.initialFun(!0), e.GetList(function(t) {
            wx.stopPullDownRefresh();
        });
    },
    confirmHandle: function(t) {
        var o = t.currentTarget.dataset;
        a.default.alert({
            title: "提示",
            message: decodeURIComponent(o.info),
            overlay: !0,
            showCancelButton: !0,
            cancelButtonText: "返回",
            closable: !1
        }).then(function() {
            e.HttpMember({
                url: "deal/" + o.method,
                data: o.data
            });
        }).catch(function() {});
    },
    orderHandlePopup: function(t) {
        var a = t.currentTarget.dataset;
        e.Lay({
            table: "popupForm",
            action: "pop",
            method: "deal/" + a.method,
            data: JSON.stringify({
                number: a.data,
                role: this.data.role,
                action: a.action,
                index: a.index
            })
        });
    },
    dropOpen: function() {
        this.setData({
            dropShow: !this.data.dropShow
        });
    },
    searchChange: function(t) {
        this.setData({
            searchVal: t.detail
        });
    },
    searchSubmit: function(t) {
        var a = this, o = {
            getdata: {},
            listdata: {}
        };
        a.data.Form.tabs.forEach(function(t, e) {
            o.getdata[e] = {
                page: 1,
                state: t.value,
                mode: a.data.role,
                first_input: a.data.searchVal,
                first_select: a.data.dropField
            }, o.listdata[e] = {
                list: [],
                CurPage: 0
            };
        }), a.setData({
            listIndex: 0,
            getdata: o.getdata,
            listdata: o.listdata
        }), e.GetList();
    },
    dropChange: function(t) {
        var a = this, e = t.detail, o = a.data.Form.dropValue[e.index];
        a.setData({
            dropTips: "请输入" + e.value,
            dropField: o,
            dropName: e.value,
            dropShow: !1
        });
    },
    onReachBottom: function() {
        var a = this, o = a.data.listIndex, i = a.data.listdata[o];
        if (!a.data.loadnot && !a.data.loading && i.CurPage < i.TotalPage) {
            var n = "getdata." + o + ".page";
            a.setData(t({}, n, 1 * a.data.getdata[o].page + 1)), e.GetList();
        }
    },
    tabChange: function(t) {
        var a = this, o = t.detail.index, i = a.data.listdata[o];
        o != a.data.listIndex && (a.setData({
            listIndex: o
        }), i.CurPage ? i.CurPage < i.TotalPage ? this.loadnot = !1 : this.loadnot = !0 : e.GetList());
    },
    onPageScroll: function(a) {
        var e = this, o = a.scrollTop, i = e.data.gotop, n = 2 * e.data.SystemInfo.windowHeight;
        if ((o >= n && !i || o < n && i) && e.setData({
            gotop: !i
        }), e.data.Form.lazy && e.data.Form.lazy.add > 0) {
            var r = e.data.Form.lazy, d = Math.ceil((o + e.data.SystemInfo.windowHeight) / r.height) * e.data.Form.lazy.add;
            d > r.pos && e.setData(t({}, "Form.lazy.pos", d));
        }
    },
    ExecuteCallBack: function(a) {
        var o = this, i = o.data.listIndex, n = a.index;
        e.Popup({
            action: "closeForm"
        }), e.HttpMember({
            url: o.data.Form.apiurl,
            data: {
                mode: o.data.role,
                first_input: a.ddbh,
                first_select: "order"
            }
        }, function(a) {
            if (1 === a.Total) {
                var e = a.list.shift(), r = wx.createAnimation({
                    duration: 600,
                    timingFunction: "ease"
                });
                r.rotateY(90).step(), setTimeout(function() {
                    o.setData(t({}, "animation." + e.ddbh, r.export()), function() {
                        setTimeout(function() {
                            r.rotateY(0).step(), o.setData(t({}, "animation." + e.ddbh, r.export()), function() {
                                o.setData(t({}, "listdata." + i + ".list[" + n + "]", e));
                            });
                        }, 600);
                    });
                }, 100);
            }
        });
    },
    Lay: function(t) {
        e.Lay(JSON.parse(JSON.stringify(t)));
    },
    Commom: function(t) {
        var a = JSON.parse(JSON.stringify((t.currentTarget, t))), o = t.currentTarget ? a.currentTarget.dataset.action : a.action;
        e[o](a);
    },
    Popup: function(t) {
        e.Popup(t.currentTarget.dataset);
    },
    onPullDownRefresh: function() {
        this.initialize();
    },
    onShareAppMessage: function() {}
});