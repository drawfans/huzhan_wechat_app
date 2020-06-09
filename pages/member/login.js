var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../vant/dialog/dialog")), e = require("../../common/common.js");

Page({
    data: {
        username: "",
        password: "",
        options: {},
        switchvalue: !1,
        spin: !0,
        current: 0,
        tabs: [ {
            key: 0,
            title: "绑定已有帐号"
        }, {
            key: 1,
            title: "新注册并绑定"
        } ],
        title: {
            binding: "账号绑定",
            authorize: "登录授权",
            forget: "找回密码"
        },
        userInfo: [],
        placeholderStyle: "font-size:12px;color:#ccc",
        forgetSteps: [ {
            text: "账号信息"
        }, {
            text: "手机验证"
        }, {
            text: "重设密码"
        } ],
        forgetFlow: 0
    },
    initialize: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        t.setData({
                            userInfo: e.userInfo
                        });
                    }
                });
            }
        }), t.setData({
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
        }), e.Http("html/login", function(t) {
            e.initializeRefresh(t);
        });
    },
    onLoad: function(t) {
        e.init(this), this.initialize(), t.action || (t.action = "authorize"), this.setData({
            options: t,
            backfun: t.backfun || !1,
            spin: !1
        }), wx.setNavigationBarTitle({
            title: this.data.title[t.action]
        });
    },
    loginTypeChange: function(t) {
        t.detail.value = 1 == t.detail.index ? "phone" : "name", e.Lay(t);
    },
    notBindSubmit: function(n) {
        var i = n.detail.target.dataset.title;
        t.default.alert({
            title: "提示",
            message: '<b>您确定<span style="color:red">不绑定</span>微信' + i + "吗？</b><br>绑定微信可以一键快捷登录账号",
            closeOnClickOverlay: !1,
            showCancelButton: !0,
            cancelButtonText: "不绑定" + i,
            confirmButtonText: "绑定" + i
        }).then(function() {
            e.Lay(n);
        }).catch(function() {
            n.detail.value.notbind = !0, e.Lay(n);
        });
    },
    formSubmit: function(t) {
        if ("notbind" == t.detail.target.dataset.method) return this.notBindSubmit(t);
        e.Lay(t);
    },
    Lay: function(t) {
        e.Lay(JSON.parse(JSON.stringify(t)));
    },
    Commom: function(t) {
        var n = JSON.parse(JSON.stringify((t.currentTarget, t))), i = t.currentTarget ? n.currentTarget.dataset.action : n.action;
        e[i](n);
    },
    Popup: function(t) {
        e.Popup(t.currentTarget.dataset);
    },
    register: function() {
        wx.navigateTo({
            url: "register/register"
        });
    },
    backurl: function() {
        wx.getStorageSync("loginback");
        this.setData({
            forgetFlow: 0
        }), this.data.backfun ? e.Lay({
            action: "backfun",
            info: this.data.backfun
        }) : wx.reLaunch({
            url: "/pages/member/member"
        });
    },
    binding: function() {
        this.setData({
            "options.action": "binding"
        });
    },
    bindGetUserInfo: function(t) {
        var n = this;
        t.detail;
        e.Wxlogin(function(e) {
            n.WxloginCallBack({
                state: e
            }, t);
        });
    },
    WxloginCallBack: function(t, n) {
        var i = this;
        "success" == t.state ? i.backurl() : "binding" == t.state ? i.binding() : "authorize" == t.state && (n.detail.userInfo ? (n.detail.value = {
            endata: encodeURIComponent(n.detail.encryptedData),
            iv: encodeURIComponent(n.detail.iv),
            signature: n.detail.signature
        }, e.Lay(n)) : wx.showModal({
            content: "必须授权才能继续操作，是否重新手动授权？",
            confirmText: "授权",
            cancelText: "取消",
            success: function(t) {
                t.confirm ? wx.openSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] && i.initialize();
                    }
                }) : wx.reLaunch({
                    url: "/pages/index/index"
                });
            }
        }));
    },
    onPullDownRefresh: function() {
        this.initialize();
    }
});