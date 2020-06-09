function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../vant/dialog/dialog")), i = require("../../common/common.js");

Page({
    data: {
        url: "",
        popup: [],
        previewList: []
    },
    initialize: function() {
        var t = this;
        t.setData({
            spin: !0,
            popupSpin: !1,
            Form: {
                form: {
                    radio: {},
                    checkbox: {},
                    picker: {},
                    rate: {}
                }
            },
            popupForm: {
                form: {
                    radio: {},
                    checkbox: {},
                    picker: {}
                }
            }
        }), i.HttpMember(t.data.url, function(t) {
            i.initializeRefresh(t);
        });
    },
    onPullDownRefresh: function() {
        this.initialize();
    },
    onLoad: function(t) {
        t && this.setData({
            url: i.UrlOptions(t)
        }), i.init(this), this.initialize();
    },
    onShow: function() {
        i.init(this), this.data.Form.form.formLoad && this.initialize();
    },
    Lay: function(t) {
        i.Lay(JSON.parse(JSON.stringify(t)));
    },
    Commom: function(t) {
        var e = JSON.parse(JSON.stringify((t.currentTarget, t))), a = t.currentTarget ? e.currentTarget.dataset.action : e.action;
        i[a](e);
    },
    Popup: function(t) {
        i.Popup(t.currentTarget.dataset);
    },
    AllmoneyChange: function(e) {
        var i = commom.getTableName(), a = this.data[i].form, r = a.radio.SelectEdition, o = a.radio.piece, n = a.allMoney;
        if (r) {
            var l = r.split("-|-");
            n.edition = l[0], n.money = parseInt(l[1]);
        }
        n.count = parseInt(o * n.money), a.allMoney = n, this.setData(t({}, i + ".form", a));
    },
    allMoney: function(i) {
        var a = this, r = i.currentTarget.dataset.action, o = i.currentTarget.dataset.data, n = 0, l = [];
        for (var s in a.data.Form.input) if ("moneyBox" == a.data.Form.input[s].id) var u = s;
        var f = a.data.Form.input[u].list[1].list[0].list[1].list, m = f.length;
        if ("up" == r || "down" == r) {
            var c = JSON.parse(JSON.stringify(f[o])), d = "up" == r ? o <= 0 ? m - 1 : o - 1 : o >= m - 1 ? 0 : o + 1;
            f[o] = f[d], f[o] = f[d], f[d] = c, f[d] = c;
        } else if ("del" == r) {
            if (m <= 1) return e.default.alert({
                title: "提示",
                message: '至少需要保留<b style="color:red">1个</b>价格！',
                overlay: !0,
                closable: !1
            }).then(function() {
                var e;
                a.setData((e = {}, t(e, "Form.form.formLoad", !1), t(e, "Form.form.textareaToggle", !1), 
                e));
            }), !1;
            delete f[o];
        } else if ("add" == r) {
            if (m >= 5) return e.default.alert({
                title: "提示",
                message: '最多只能设置<b style="color:blue">5个</b>动态价格！',
                overlay: !0,
                closable: !1
            }).then(function() {
                var e;
                a.setData((e = {}, t(e, "Form.form.formLoad", !1), t(e, "Form.form.textareaToggle", !1), 
                e));
            }), !1;
            f[m] = JSON.parse(JSON.stringify(f[0])), f[m].list[0].list[0].value = "", f[m].list[1].list[0].value = "";
        }
        for (var s in f) {
            f[s].list[0].list[0].name = f[s].list[0].list[0].name.replace(/[\d]/g, "") + n, 
            f[s].list[1].list[0].name = f[s].list[1].list[0].name.replace(/[\d]/g, "") + n;
            for (var p in f[s].list[2].list) f[s].list[2].list[p].data = n;
            l[n] = f[s], n++;
        }
        a.setData(t({}, "Form.input[" + u + "].list[1].list[0].list[1].list", l));
    }
});