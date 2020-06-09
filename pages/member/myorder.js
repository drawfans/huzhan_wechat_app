function t(t, i, e) {
    return i in t ? Object.defineProperty(t, i, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = e, t;
}

var i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../vant/dialog/dialog")), e = require("../../common/common.js");

Page({
    data: {
        bh: "",
        spin: !0,
        popupSpin: !1,
        popup: [],
        flowShow: !1,
        timestamp: 0,
        gotop: !1,
        row: [],
        height: {
            ListAction: 0
        },
        historyDispute: {},
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
        t.bh && this.setData({
            bh: t.bh
        }), e.init(this), this.initialize(!1);
    },
    onShow: function() {
        e.init(this), this.data.Form.form.formLoad && this.initialize();
    },
    initialize: function() {
        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], i = this;
        i.setData({
            spin: !0
        }), e.initialFun(t), e.HttpMember("get/myorder/" + i.data.bh, function(t) {
            if (wx.setNavigationBarTitle({
                title: "订单详情"
            }), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#FE952B",
                animation: {
                    duration: 0,
                    timingFunc: "easeIn"
                }
            }), 0 === t.state) return e.Lay(i, {
                info: t.info
            });
            i.setData({
                row: t,
                spin: !1,
                timestamp: e.timestamp()
            }), wx.stopPullDownRefresh();
        });
    },
    flowChange: function() {
        this.setData({
            flowShow: !this.data.flowShow
        });
    },
    onPageScroll: function(t) {
        var i = this, e = t.scrollTop, a = i.data.gotop, o = 2 * i.data.SystemInfo.windowHeight;
        if (i.data.height.main >= o) {
            var n = Math.ceil((i.data.height.main - i.data.SystemInfo.windowHeight) / 2);
            (e <= n && !0 === a || e > n && !0 !== a) && i.setData({
                gotop: !0 !== a || i.data.height.bottom
            });
        }
    },
    htmlHeight: function() {
        var t = this;
        wx.createSelectorQuery().selectAll("#main,#ListAction").boundingClientRect(function(i) {
            var e = {
                bottom: 10
            };
            for (var a in i) {
                var o = i[a];
                e[o.id] = Math.ceil(o.height), e.bottom += e[o.id];
            }
            t.setData({
                height: e,
                gotop: e.bottom >= 2 * t.data.SystemInfo.windowHeight && e.bottom
            });
        }).exec();
    },
    Lay: function(t) {
        e.Lay(JSON.parse(JSON.stringify(t)));
    },
    Commom: function(t) {
        var i = JSON.parse(JSON.stringify((t.currentTarget, t))), a = t.currentTarget ? i.currentTarget.dataset.action : i.action;
        e[a](i);
    },
    Popup: function(t) {
        e.Popup(t.currentTarget.dataset);
    },
    confirmHandle: function(t) {
        var a = t.currentTarget.dataset;
        i.default.alert({
            title: "提示",
            message: decodeURIComponent(a.info),
            overlay: !0,
            showCancelButton: !0,
            cancelButtonText: "返回",
            closable: !1
        }).then(function() {
            e.HttpMember({
                url: "deal/" + a.method,
                data: a.data
            });
        }).catch(function() {});
    },
    orderHandlePopup: function(t) {
        var i = t.currentTarget.dataset;
        e.Lay({
            action: "pop",
            method: "deal/" + i.method,
            data: JSON.stringify({
                number: this.data.bh,
                role: this.data.row.myRole,
                action: i.action,
                utime: this.data.row.order.utime
            })
        });
    },
    orderHide: function() {
        this.setData({
            Form: {
                form: {
                    radio: {},
                    checkbox: {},
                    picker: {}
                }
            }
        }), this.WxValidate = {};
    },
    disputeChange: function() {
        var i = this, a = i.data.historyDispute;
        if (i.setData({
            popupSpin: !0
        }), a.html) {
            var o;
            i.setData((o = {}, t(o, "historyDispute.show", !a.show), t(o, "popupSpin", !1), 
            o));
        } else e.HttpMember("get/myorder/" + i.data.bh + "/dispute", function(e) {
            var a;
            i.setData((a = {}, t(a, "initialValue.historyDispute.html", e.html), t(a, "historyDispute", e), 
            t(a, "popupSpin", !1), a));
        });
        wx.setNavigationBarTitle({
            title: a.show ? "退款历史记录" : "订单详情"
        });
    },
    onPullDownRefresh: function() {
        this.initialize();
    },
    onShareAppMessage: function() {}
});