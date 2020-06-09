var t = require("../../common/common.js");

Page({
    data: {
        url: "",
        popup: []
    },
    initialize: function() {
        var i = this;
        i.setData({
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
        }), t.Gethtml(i.data.url, function(i) {
            t.initializeRefresh(i);
        });
    },
    onPullDownRefresh: function() {
        this.initialize();
    },
    onLoad: function(i) {
        i.url ? this.setData({
            url: t.UrlOptions(i)
        }) : this.setData({
            url: "get/article/help"
        }), t.init(this), this.initialize();
    },
    searchSubmit: function(i) {
        t.Lay({
            action: "url",
            info: t.Lay({
                action: "geturl"
            }) + "/search/" + i.detail.value
        });
    },
    onShow: function() {
        t.init(this);
    },
    Lay: function(i) {
        t.Lay(JSON.parse(JSON.stringify(i)));
    },
    Commom: function(i) {
        var a = JSON.parse(JSON.stringify((i.currentTarget, i))), n = i.currentTarget ? a.currentTarget.dataset.action : a.action;
        t[n](a);
    },
    Popup: function(i) {
        t.Popup(i.currentTarget.dataset);
    }
});