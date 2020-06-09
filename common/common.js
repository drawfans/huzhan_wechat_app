function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function a(e) {
    var t = void 0 !== M.data.listIndex ? M.data.getdata[M.data.listIndex] : M.data.getdata, a = void 0 !== M.data.listIndex ? M.data.listdata[M.data.listIndex] : M.data.listdata;
    s({
        url: M.data.Form.apiurl,
        data: t
    }, function(n) {
        if ("fail" != n) {
            if (0 === n.state) return m(n);
            a.list && n.CurPage > 1 && (n.list = a.list.concat(n.list)), void 0 === M.data.listIndex && 1 === t.page && wx.pageScrollTo({
                scrollTop: 0,
                duration: 0
            });
        }
        e && e(n);
    });
}

function n(e) {
    wx.setClipboardData({
        data: e,
        success: function() {
            wx.showToast({
                title: "复制成功",
                mask: !0
            });
        }
    });
}

function i() {
    M.onPullDownRefresh && (M.onPullDownRefresh(), wx.stopPullDownRefresh());
}

function o() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = getCurrentPages(), a = t[t.length - 1], n = a.route;
    if (1 != e) return n;
    var i = a.options, o = n + "?";
    for (var r in i) o += r + "=" + i[r] + "&";
    return o = o.substring(0, o.length - 1);
}

function r(e, t) {
    var a = e.match(new RegExp(t + "=(\\S*);"));
    return a && a[1] ? a[1] : "";
}

function s(e, t) {
    var a = wx.getStorageSync("sessionid"), n = wx.getStorageSync("ci_session"), i = wx.getStorageSync("cid");
    "string" == typeof e && (e = {
        url: e
    }), "http" != e.url.substring(0, 4) && (e.url = wx.getStorageSync("apiurl") + e.url), 
    e.header || (e.header = {}), e.header.platform = M.data.SystemInfo.platform, e.header.system = M.data.SystemInfo.system, 
    e.header.cookie = n ? "ci_session=" + n + "; " : "", e.header.cookie += i ? "cid=" + i + "; " : "cid=aaaaaaaaaaadwd2d22d1; ", 
    e.header.sessionid = a || null, "GET" != e.method && (e.method = "POST", e.header = Object.assign({
        "content-Type": "application/x-www-form-urlencoded"
    }, e.header)), e.success = function(e) {
        e.data.title && !e.data.share && wx.hideShareMenu(), !n && wx.setStorageSync("ci_session", r(e.header["Set-Cookie"], "ci_session")), 
        !i && r(e.header["Set-Cookie"], "cid") && wx.setStorageSync("cid", r(e.header["Set-Cookie"], "cid")), 
        200 == e.statusCode && t && t(e.data);
    }, e.fail = function(e) {
        wx.showToast({
            title: "加载失败",
            icon: "none",
            duration: 2e3
        }), t("fail");
    }, wx.request(e);
}

function l(e, a, n) {
    var i = x();
    !a.initial && M.data[i] && M.data[i].form && M.data[i].form.upload && M.data[i].form.upload.list.ing.length > 0 ? (M.setData(t({}, i + ".form.upload.being", !0)), 
    w(Object.assign({
        postUrl: e
    }, a), function(t) {
        if (t) {
            if (a.formToUpload) return u(t, n);
            c({
                url: e,
                data: a,
                method: "POST"
            }, function(e) {
                u(e, n);
            });
        }
    })) : c({
        url: e,
        data: a,
        method: "POST"
    }, function(e) {
        u(e, n);
    });
}

function c(e, t) {
    "string" == typeof e && (e = {
        url: e
    }), wx.getStorageSync("sessionid") || null || -1 != e.url.indexOf("islogin=0") ? (e.header || (e.header = {}), 
    e.header.islogin = -1 != e.url.indexOf("islogin=0") ? 0 : 1, s(e, function(a) {
        f(a, t, e);
    })) : (wx.setStorageSync("loginback", o()), wx.navigateTo({
        url: "/pages/member/login?action=authorize"
    }));
}

function u(e, t) {
    t ? t(e) : e.title && p(e);
}

function f(e, t, a) {
    if (-2 == e.state) b(function(e) {
        "success" == e ? a ? s(a, function(e) {
            t(e);
        }) : i(M) : (wx.setStorageSync("loginback", o()), wx.navigateTo({
            url: "/pages/member/login?action=" + e
        }));
    }); else {
        if (0 === e.state) return m(e);
        "authorize" != e.state && "binding" != e.state || !e.sessionid ? u(e, t) : (wx.setStorageSync("loginback", o()), 
        wx.navigateTo({
            url: "/pages/member/login?action=" + e.state
        }));
    }
}

function d(e) {
    wx.requestPayment({
        timeStamp: e.timeStamp,
        nonceStr: e.nonceStr,
        package: e.package,
        signType: e.signType,
        paySign: e.paySign,
        success: function(t) {
            if (wx.showLoading({
                title: "请稍等…"
            }), e.success) return m(e.success);
        },
        fail: function(t) {
            if (e.fail) return m(e.success);
            k();
        }
    });
}

function m(e) {
    var t = x();
    return e.appPayment ? d(e.appPayment) : (delete e.state, !e.info && e.url ? y({
        action: 301,
        info: e.url
    }) : (e.info ? (e.btn && (e.confirmtext = e.btn), (e.btn2 || e.url2 || e.action2 || e.back2 || e.backfun2) && (e.canceltext = e.btn2 || "取消"), 
    (e.url || e.url2 || e.action || e.action2 || e.back || e.back2 || e.backfun || e.backfun2 || e.element || e.fun) && (e.buttons = {}, 
    (e.url || e.action || e.back || e.backfun || e.element || e.fun) && (e.buttons.confirm = {
        info: e.fun || e.url || e.backfun || e.element || "",
        data: e.data || null,
        action: e.fun ? "fun" : 1 == e.back ? "back" : 1 === e.url ? "refresh" : e.element ? "backfocus" : e.backfun ? "backfun" : e.action ? e.action : "url"
    }), (e.url2 || e.action2 || e.back2 || e.backfun2) && (e.buttons.cancel = {
        info: e.url2 || e.backfun2 || "",
        data: e.data || null,
        action: 1 === e.url2 ? "refresh" : 1 == e.back2 ? "back" : e.backfun2 ? "backfun" : e.action2 ? e.action2 : "url"
    }))) : M.data[t] && M.data[t].form && M.data[t].form.formLoad && k(), y(e)));
}

function p(e) {
    var a;
    wx.setNavigationBarTitle({
        title: e.title
    });
    var n = {
        form: {
            radio: {},
            checkbox: {},
            picker: {},
            rate: {}
        }
    }, i = x();
    for (var o in e) if ("onloadFun" != o) if ("form" != o) n[o] = e[o]; else for (var r in e[o]) n.form[r] = e[o][r];
    M.setData((a = {}, t(a, i, n), t(a, "spin", !1), a)), n.input && y({
        action: "formValidate",
        list: n.input
    }), e.onloadFun && y(e.onloadFun), wx.stopPullDownRefresh();
}

function g(e, t) {
    s({
        url: e,
        method: "GET"
    }, function(e) {
        f(e, function(e) {
            t(e);
        });
    });
}

function b(e) {
    wx.login({
        success: function(t) {
            wx.request({
                url: wx.getStorageSync("apiurl") + "get/login",
                data: {
                    code: t.code
                },
                header: {
                    platform: M.data.SystemInfo.platform,
                    system: M.data.SystemInfo.system
                },
                success: function(t) {
                    var a = t.data;
                    a.sessionid ? (wx.setStorageSync("sessionid", a.sessionid), e(a.state)) : wx.showModal({
                        title: "提示",
                        content: a.info,
                        showCancel: !1
                    });
                }
            });
        }
    });
}

function v() {
    var e = getCurrentPages(), t = e[e.length - 1], a = t.route, n = t.options, i = "/" + a + "?";
    for (var o in n) i += o + "=" + n[o] + "&";
    return i = i.substring(0, i.length - 1);
}

function h() {
    var e = x(), a = setInterval(function() {
        var n = M.data[e].form.send;
        if (!n) return L = !1, clearInterval(a);
        var i = n.interval > 0 ? n.interval : 60;
        if (!L && n.time > 0 || 0 == n.time && "boolean" != typeof n.Stop) var o = n.time > 0 ? n.time : i, r = {
            Stop: !0,
            Tips: o + "s后重发",
            time: o - 1,
            interval: i
        }; else {
            L = !1, clearInterval(a);
            r = {
                Stop: !1,
                Tips: "发送验证码",
                time: 0,
                interval: i
            };
        }
        M.setData(t({}, e + ".form.send", r));
    }.bind(M), 1e3);
}

function x() {
    return M.data.popupForm && M.data.popupForm.show ? "popupForm" : "Form";
}

function w(e, a) {
    var n = x(), i = M.data[n].form.upload, o = i.list.ing.shift(), r = i.ingFiles.shift(), s = e.formToUpload, l = s ? e.postUrl : i.apiurl, c = wx.getStorageSync("sessionid"), u = wx.getStorageSync("ci_session");
    if (!o || "" == o) return a(!0);
    wx.uploadFile({
        url: wx.getStorageSync("apiurl") + l,
        filePath: o,
        name: "file",
        formData: Object.assign({
            osize: r.size,
            lastDate: new Date().getTime(),
            maxnum: i.max
        }, s ? e : {}, i.post ? i.post : {}),
        header: {
            "Content-Type": "multipart/form-data",
            platform: M.data.SystemInfo.platform,
            system: M.data.SystemInfo.system,
            cookie: u ? "ci_session=" + u : null,
            sessionid: c || null
        },
        complete: function(r) {
            if (s) return f(JSON.parse(r.data), a);
            if ("uploadFile:ok" == r.errMsg) {
                if (r.data) {
                    var l = JSON.parse(r.data);
                    i.number.ing -= 1, "0" == l.state ? (i.list.suc = i.list.suc.concat([ o ]), i.number.suc = (i.number.suc || 0) + 1) : (i.list.err = i.list.err.concat([ o ]), 
                    i.number.err = (i.number.err || 0) + 1, i.msg[o] = l.state);
                }
            } else i.number.ing -= 1, i.number.err = (i.number.err || 0) + 1, i.list.err = i.list.err.concat([ o ]), 
            i.msg[o] = r.errMsg;
            i.being = i.list.ing.length > 0, M.setData(t({}, n + ".form.upload", i)), i.list.ing.length > 0 ? w(e, a) : a && a(!0);
        }
    });
}

function y(e) {
    var a, n = [ "loading", "spin", "popupSpin" ], o = x();
    for (var r in n) {
        var s = n[r];
        M.data[s] && M.setData(t({}, s, !1));
    }
    var u = e.currentTarget ? e.currentTarget.dataset : e, f = u.action;
    switch (-1 !== [ "formSubmit", "checkbox", "picker", "input", "radio", "swiper" ].indexOf(f) && ((u = e).action = f), 
    u.action) {
      case "copy":
        wx.setClipboardData({
            data: u.info,
            success: function() {
                wx.showToast({
                    title: u.title || u.data || "复制成功",
                    mask: !0
                });
            }
        });
        break;

      case "go":
        wx.pageScrollTo({
            scrollTop: "top" == u.info ? 0 : u.info,
            duration: 300
        });
        break;

      case "refresh":
        i(M);
        break;

      case "geturl":
        return v();

      case "back":
        wx.navigateBack({
            delta: u.delta || 1
        });
        break;

      case "backfun":
        ve = (be = getCurrentPages())[be.length - 2];
        wx.navigateBack({
            delta: u.delta || 1,
            success: function() {
                ve[u.info]();
            }
        });
        break;

      case "fun":
        var d = u.name || u.info;
        if (d) {
            var m = Array.isArray(d) ? d : d.split(",");
            for (var r in m) {
                var p = m[r];
                -1 != p.indexOf("Commom ") ? M.Commom({
                    action: p.replace("Commom ", "")
                }) : M[p](u.data);
            }
        }
        break;

      case "swiper":
        b = (D = u.currentTarget.dataset).name;
        (W = M.data[o].form || {}).picker || (W.picker = {}), W.picker[b] || (W.picker[b] = 0), 
        W.picker[b] = u.detail.current, M.setData(t({}, o + ".form", W)), D.endbind && y({
            action: "fun",
            name: D.endbind,
            data: e
        });
        break;

      case "picker":
        var b = (D = u.currentTarget.dataset).name, h = M.data[o].form.picker[b], w = {
            show: !h || !h.show
        };
        h && !isNaN(h.index) && (w.index = h.index), "confirm" == u.type && (w.index = u.detail.index), 
        M.setData((a = {}, t(a, o + ".form.textareaToggle", w.show), t(a, o + ".form.picker." + b, w), 
        a)), D.endbind && y({
            action: "fun",
            name: D.endbind,
            data: D.data
        });
        break;

      case "input":
      case "radio":
      case "checkbox":
        var D = u.currentTarget.dataset, F = u.action, T = D.name, I = "input" == F ? u.detail.value : D.info || u.detail, z = M.data[o].form;
        z[F] && z[F][T] === I || ("input" == F ? z.focus = T : delete z.focus, z[F] || (z[F] = {}), 
        z[F][T] = I, M.setData(t({}, o + ".form", z))), D.endbind && y({
            action: "fun",
            name: D.endbind,
            data: D.data
        });
        break;

      case "formSubmit":
        var L = u.detail.value, V = u.currentTarget.dataset;
        if (u.detail.target && "send" == u.detail.target.id) L.Send = !0; else {
            var R;
            M.setData((R = {}, t(R, o + ".form.formLoad", !0), t(R, o + ".form.textareaToggle", !0), 
            R));
        }
        if (!M.WxValidate.checkForm(L)) {
            var H = M.WxValidate.errorList[0];
            return H.action = "focus", H.field = o + ".form", y(H);
        }
        var B = C(L);
        if (u.detail.target && "send" == u.detail.target.id) return _(B);
        if (V.url) return l(-1 != V.url.indexOf("/") ? V.url : "post/" + V.url, B);
        l(M.data.url, B);
        break;

      case "formValidate":
        var J = {}, U = {}, W = M.data[o].form, q = !1, G = [ "checkbox", "toggle", "stepper", "rate", "radio" ], E = [], Q = function(e) {
            if (e.name && !1 !== e.intoForm && (-1 !== G.indexOf(e.type) || e.intoForm)) {
                var t = "input", a = e.name;
                -1 !== [ "stepper", "rate", "radio" ].indexOf(e.type) ? t = "radio" : -1 !== [ "checkbox", "toggle" ].indexOf(e.type) && (t = "checkbox"), 
                W[t] || (W[t] = {}), W[t][a] = e.value, q = !0;
            }
            if (e.endbind && -1 === E.indexOf(e.endbind) && E.push(e.endbind), e.validateRules) {
                var n = e.validateName || e.name;
                J[n] = e.validateRules, U[n] = e.validateMessages ? e.validateMessages : {
                    label: e.label || !1
                };
            }
        };
        !function e(t) {
            for (var a in t) {
                var n = t[a];
                Q(n), n.list && e(n.list);
            }
        }(u.list), q && M.setData(t({}, o + ".form", W)), E.length > 0 && y({
            action: "fun",
            name: E
        }), M.WxValidate = new N.default(J, U);
        break;

      case "pop":
      case "ajax":
        var $ = u.method, K = {}, X = [ "action", "method" ];
        for (var r in u) if ("data" == r && u[r] && "object" == P(JSON.parse(u[r]))) {
            var Y = JSON.parse(u[r]);
            for (var Z in Y) K[Z] = Y[Z];
        } else X.indexOf(r) < 0 && "" !== u[r] && (K[r] = u[r]);
        "pop" == u.action ? (M.setData({
            popupSpin: !0
        }), c({
            url: $,
            data: K
        }, function(e) {
            "curr" == e.postUrl && (e.postUrl = $), e.form = Object.assign({
                popupForm: !0,
                radio: {},
                checkbox: {},
                picker: {}
            }, e.form), e.show = !0, M.setData({
                popupForm: e,
                popupSpin: !1
            }), e.input && y({
                action: "formValidate",
                list: e.input
            });
        })) : ("curr" == $ && ($ = "Form" == o ? M.data.url : M.data[o].postUrl), l($, K));
        break;

      case "phone":
        isNaN(u.info) || wx.showModal({
            content: "确定拨打电话【" + u.info + "】？",
            success: function(e) {
                e.confirm && wx.makePhoneCall({
                    phoneNumber: u.info
                });
            }
        });
        break;

      case "lazyHeight":
        O(u.element);
        break;

      case "upload":
        u.method && !M.data[o].form.upload.being && A[u.method](u);
        break;

      case "uploadInit":
        var ee = {
            list: {
                ing: [],
                err: [],
                suc: [],
                del: []
            },
            ingFiles: [],
            direct: !1,
            number: {},
            msg: {},
            max: 5,
            tips: {
                ing: "待传列表为点击最后的“确认提交”时开始上传"
            },
            apiurl: "upload"
        };
        if (u.customOptions) {
            var te = JSON.parse(u.customOptions);
            if (te.list) {
                var ae = te.list;
                delete te.list;
            }
            ee = Object.assign(ee, te), ae && ae.length > 0 && (ee.list.suc = ae, ee.number.suc = ae.length, 
            ee.number.count = ae.length);
        }
        ee.note || (ee.note = "非必传，可上传" + ee.max + "张图片附件（含已传）"), M.setData(t({}, o + ".form.upload", ee));
        break;

      case "uploadPreview":
        if (u.data && u.method) {
            var ne = u.data, ie = M.data[o].form.upload.list[u.method];
            wx.previewImage({
                current: ne + "?v=preview",
                urls: ie.map(function(e) {
                    return e + "?v=preview";
                })
            });
        }
        break;

      case "preview":
        if (u.src || u.data) {
            var oe = (u.src ? u.src : u.data).split("!")[0] + "?v=preview";
            wx.previewImage({
                current: oe,
                urls: [ oe ]
            });
        }
        break;

      case "allPreview":
        var re = u.src, se = M.data.previewList[u.field], le = [];
        if (se && re) {
            for (var ce in se) le.push(se[ce] + "?v=preview");
            wx.previewImage({
                current: re.split("!")[0] + "?v=preview",
                urls: le
            });
        }
        break;

      case "intoPreview":
        var ue = u.src, fe = u.field;
        if (ue && fe) {
            M.data.previewList || M.setData({
                previewList: []
            });
            var de = M.data.previewList[fe] || [], me = ue.split("!")[0];
            if (-1 !== de.indexOf(me)) return !1;
            de.push(me.split("!")[0]), M.setData(t({}, "previewList." + fe, de));
        }
        break;

      case "contact":
        if (M.setData({
            popupSpin: !0
        }), u.data) {
            var pe = JSON.parse(u.data);
            if (pe.name) return S({
                info: pe,
                tempname: "contact",
                scroll: !0,
                closable: !0,
                customstyle: "width:88%;"
            }), !1;
        }
        g("html/contact/" + u.info, function(e) {
            S({
                info: e,
                tempname: "contact",
                scroll: !0,
                closable: !0,
                customstyle: "width:88%;"
            });
        });
        break;

      case "install":
        M.setData({
            popupSpin: !0
        }), g("html/install/" + u.info, function(e) {
            S({
                info: e,
                tempname: "install",
                scroll: !0,
                closable: !0,
                title: !1,
                customstyle: "width:80%;max-height:90%;z-index:100000"
            });
        });
        break;

      case 301:
      case "301":
      case "url":
        var ge = u.info;
        if ("back" == ge) y({
            action: "back"
        }); else if (1 === ge) y({
            action: "refresh"
        }); else if (-1 != ge.indexOf("alert_")) y({
            info: ge = ge.replace("alert_", "")
        }); else if (-1 != ge.indexOf("before_")) {
            ge = ge.replace("before_", "");
            var be = getCurrentPages(), ve = be[be.length - 2];
            wx.navigateBack({
                delta: u.delta || 1,
                success: function() {
                    y({
                        info: ge,
                        action: "url"
                    });
                }
            });
        } else -1 != ge.indexOf("self_") ? (ge = ge.replace("self_", ""), wx.redirectTo({
            url: ge,
            complete: function(e) {
                -1 != e.errMsg.indexOf("tabbar") && y({
                    action: "taburl",
                    info: u.info
                });
            }
        })) : -1 != ge.indexOf("reLaunch_") ? (ge = ge.replace("reLaunch_", ""), wx.reLaunch({
            url: "/pages/member/member"
        })) : wx.navigateTo({
            url: ge,
            complete: function(e) {
                -1 != e.errMsg.indexOf("tabbar") && y({
                    action: "taburl",
                    info: u.info
                });
            }
        });
        break;

      case "confirm":
        var he = JSON.parse(decodeURIComponent(u.data)), xe = {}, we = [ "info", "title", "align", "zindex", "closable", "masknoclosa" ];
        if (he.cancel || !1 === he.cancel || (he.cancel = {
            btn: "取消"
        }), he.attrData) {
            var ye = he.attrData;
            delete u.attrData, delete u.action, delete u.info, delete u.data;
            for (var ke in ye) {
                var Se = ye[ke];
                he[Se] = Object.assign(u, he[Se]);
            }
        }
        for (var r in u) -1 !== we.indexOf(r) && (xe[r] = u[r]);
        y(Object.assign(xe, {
            buttons: he
        }));
        break;

      case "backfocus":
        k(u.info);
        break;

      case "focus":
        j.default.alert({
            title: u.title || "提示",
            message: u.msg,
            zIndex: 2e4
        }).then(function() {
            u.param && k(u.param);
        });
        break;

      case "storage":
        var De = u.method, Fe = u.data;
        "delete" != De ? wx.setStorage({
            key: De,
            data: Fe,
            success: function(e) {
                e && u.callback && y(u.callback);
            }
        }) : wx.removeStorage({
            key: Fe,
            success: function(e) {
                e && u.callback && y(u.callback);
            }
        });
        break;

      case "taburl":
        wx.switchTab({
            url: u.info
        });
        break;

      default:
        if (!u.info) return;
        Ie = {};
        if (u.buttons) {
            var Oe = "string" == typeof u.buttons ? JSON.parse(u.buttons) : u.buttons, Te = [ "confirm", "cancel" ], Ie = {};
            for (var r in Te) {
                var Ce = Te[r];
                Oe[Ce] && (Oe[Ce].btn && (u[Ce + "text"] = Oe[Ce].btn, delete Oe[Ce].btn), Object.keys(Oe[Ce]).length && (Ie[Ce] = Oe[Ce]));
            }
        }
        j.default.alert({
            title: u.title || "信息",
            message: -1 != u.info.indexOf("%3C") ? decodeURIComponent(u.info) : u.info,
            messageAlign: u.align || "center",
            zIndex: u.zindex || 2e4,
            overlay: !u.nomask,
            transition: u.transition || "scale",
            closeOnClickOverlay: !0 === u.masknoclosa,
            showCancelButton: !(!u.cancelbutton && !u.canceltext),
            cancelButtonText: u.canceltext ? u.canceltext : "取消",
            confirmButtonText: u.confirmtext ? u.confirmtext : "确定",
            closable: u.closable || !1
        }).then(function() {
            Ie.confirm && Ie.confirm.url || k(), Ie.confirm && y(Ie.confirm);
        }).catch(function() {
            k(), Ie.cancel && y(Ie.cancel);
        });
    }
}

function k() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], a = x();
    M.data[a] && M.data[a].form && M.data[a].form.formLoad && setTimeout(function() {
        var n;
        M.setData((n = {}, t(n, a + ".form.focus", e || null), t(n, a + ".form.formLoad", !1), 
        t(n, a + ".form.textareaToggle", !1), n));
    }, 100);
}

function S(e) {
    var a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    switch (e.action) {
      case "close":
        M.setData(t({}, "popup[" + e.index + "]", {}));
        break;

      case "closeAll":
        M.setData({
            popup: {}
        });
        break;

      case "closeForm":
        var n = x();
        M.setData(t({}, n, {
            form: {
                radio: {},
                checkbox: {},
                picker: {}
            }
        })), M.WxValidate = {};
        break;

      default:
        var i = D(e);
        a && a(i);
    }
}

function D(e, a) {
    var n, a = isNaN(a) ? M.data.popup.length : a;
    /[<]+/.test(e.info) && /[>]+/.test(e.info) && (z.wxParse("popuphtml[" + a + "]", "html", e.info, M, 10), 
    e.info = "wxParse");
    var i = {
        title: e.title || "",
        info: e.info,
        show: !0,
        zindex: a + 2e4,
        overlay: !1 !== e.overlay,
        position: e.position || "center",
        duration: e.duration || 300,
        customstyle: e.customstyle || "",
        overlaystyle: e.overlaystyle || "",
        closeonclickoverlay: !1 !== e.closeonclickoverlay,
        safeareainsetbottom: !1 !== e.safeareainsetbottom,
        safeareainsettop: e.safeareainsettop || !1,
        tempname: e.tempname || "PopupTem",
        closable: !e.noclosa,
        scroll: !!e.scroll,
        timg: e.timg || !1,
        tleft: e.tleft || !1,
        tcolor: e.tcolor || !1,
        tbg: e.tbg || !1
    };
    return M.setData((n = {}, t(n, "popup[" + a + "]", i), t(n, "popupSpin", !1), n)), 
    a;
}

function F(e, t) {
    wx.createSelectorQuery().select(e).boundingClientRect(function(e) {
        t(e);
    }).exec();
}

function O(e) {
    F(e, function(e) {
        var a;
        M.setData((a = {}, t(a, "Form.lazy.pos", Math.ceil(M.data.SystemInfo.windowHeight / e.height) * M.data.Form.lazy.add), 
        t(a, "Form.lazy.height", e.height), t(a, "initialValue.Form.lazy.pos", Math.ceil(M.data.SystemInfo.windowHeight / e.height) * M.data.Form.lazy.add), 
        t(a, "initialValue.Form.lazy.height", e.height), a));
    });
}

function T() {
    wx.getSystemInfo({
        success: function(e) {
            var t = {
                navHeight: e.statusBarHeight,
                windowHeight: e.windowHeight % 2 == 0 ? e.windowHeight : e.windowHeight + 1,
                windowWidth: e.windowWidth % 2 == 0 ? e.windowWidth : e.windowWidth + 1,
                system: e.system.split(" ")[0],
                platform: "wechatApp"
            };
            if (M.data.CustomNavigation) {
                var a = wx.getMenuButtonBoundingClientRect();
                t.CustomBar = a.bottom + a.top - e.statusBarHeight;
            }
            M.setData({
                SystemInfo: t
            });
        }
    });
}

function I(e, t) {
    var a = t.split("-");
    if (t.length <= 0) return e;
    if (a.length <= 1) return e[a.join("")];
    for (var n in a) return I(e[a[n]], a.slice(1).join("-"));
}

function C(e) {
    var t = [];
    for (var a in e) {
        var n = e[a], i = a.split("-");
        if (/^[0-9]+$/.test(a) || /.*[\u4e00-\u9fa5]+.*$/.test(a) || "" == a) delete e[a]; else if (("string" == typeof n || Array.isArray(n)) && n.length <= 0) delete e[a]; else if (i.length > 1) {
            var o = i[0];
            e[o] || (e[o] = []), "" == i[1] || null == i[1] || -1 != i[1].indexOf("Auto") ? (e[o].push(n), 
            -1 === t.indexOf(o) && t.push(o)) : e[o + "[" + i[1] + "]"] = n, delete e[a];
        } else Array.isArray(n) && -1 === t.indexOf(a) && t.push(a);
    }
    for (var r in t) {
        var s = t[r];
        if (Array.isArray(e[s])) {
            for (var l = 0; l < e[s].length; l++) e[s + "[" + l + "]"] = e[s][l];
            delete e[s];
        }
    }
    return e;
}

function _(e) {
    var a = x();
    if (M.data[a].form.send && M.data[a].form.send.Stop) return !1;
    M.setData(t({}, a + ".form.send.Stop", "ing")), h(), l("post/sendCode" + (1 == e.noLogin ? "?islogin=0" : ""), e, function(e) {
        isNaN(e.time) || (0 == e.time ? L = !0 : M.setData(t({}, a + ".form.send.time", parseInt(e.time))), 
        y(e));
    });
}

var P = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, N = e(require("../common/WxValidate.js")), j = e(require("../vant/dialog/dialog")), z = require("../wxParse/wxParse.js"), M = (getApp(), 
{}), L = !1, A = {
    choose: function(e) {
        var a = x(), n = M.data[a].form.upload, i = n.max - (n.number.count || 0);
        return !n.being && (i <= 0 && n.max > 1 ? wx.showToast({
            title: "图片限传" + n.max + "个",
            icon: "none",
            duration: 2e3
        }) : void wx.chooseImage({
            count: i,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(i) {
                var o = i.tempFilePaths;
                n.max > 1 ? (n.list.ing = n.list.ing.concat(o), n.ingFiles = n.ingFiles.concat(i.tempFiles), 
                n.number.ing = o.length + (n.number.ing || 0), n.number.count = o.length + (n.number.count || 0)) : (n.list.ing = o, 
                n.ingFiles = i.tempFiles, n.number.ing = 1, n.number.count = 1), M.setData(t({}, a + ".form.upload", n)), 
                n.direct && setTimeout(function() {
                    w(e.data);
                }, 500);
            }
        }));
    },
    delete: function(e) {
        var a = x(), n = M.data[a].form.upload, i = e.info, o = e.data;
        if (n.being) return !1;
        if ("suc" == o) {
            var r = n.list[o][i].split("/").slice(-1).join(""), s = r.split(".").slice(-1).join(""), l = [ "jpg", "png", "gif", "svg" ].indexOf(s) >= 0 ? "图片" : "附件";
            wx.showModal({
                title: "提示",
                content: "您确定要删除此" + l + "吗？",
                success: function(e) {
                    e.confirm && (n.list.del.push(r), n.list[o].splice(i, 1), n.number[o] -= 1, n.number.count -= 1, 
                    wx.showModal({
                        title: "小提示",
                        content: l + "在最终操作“确认提交”后实际删除",
                        confirmText: "我知道了",
                        showCancel: !1,
                        success: function(e) {
                            M.setData(t({}, a + ".form.upload", n));
                        }
                    }));
                }
            });
        } else "ing" == o && n.ingFiles.splice(i, 1), n.list[o].splice(i, 1), n.number[o] -= 1, 
        n.number.count -= 1, M.setData(t({}, a + ".form.upload", n));
    }
};

module.exports = {
    lazyHeight: O,
    dynamicGet: I,
    querySelect: F,
    initialFun: function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if (a.push("spin", "url", "__proto__", "__webviewId__", "initialValue"), e) {
            var n = JSON.parse(JSON.stringify(M.data.initialValue));
            for (var i in n) a.indexOf(i) < 0 && M.setData(t({}, i, n[i]));
        } else if (!M.data.initialValue) {
            var o = {}, r = JSON.parse(JSON.stringify(M.data));
            for (var i in r) a.indexOf(i) < 0 && (o[i] = r[i]);
            M.setData({
                initialValue: o
            });
        }
    },
    Http: s,
    HttpMember: c,
    PostMember: l,
    formInput: C,
    uploadStart: w,
    Gethtml: g,
    UrlOptions: function(e) {
        var t = "", a = "";
        if (e) {
            for (var n in e) "url" == n ? t = e[n] : a += "&" + n + "=" + e[n];
            "" != a && (a = "?" + a.substr(1));
        }
        return t + a;
    },
    ArrayToUrl: function(e) {
        var t = "&";
        for (var a in e) t += a + "=" + e[a] + "&";
        return t.substring(0, t.length - 1);
    },
    getTableName: x,
    initializeRefresh: p,
    sendInterval: h,
    Wxlogin: b,
    Apage: a,
    feesTips: function() {
        var e = x(), a = M.data[e].form;
        if (a.input.money || "" == a.input.money) {
            var n = parseFloat(a.input.money || 0), i = parseFloat(a.input.rate), o = a.radio.fees, r = parseFloat((n * i).toFixed(2));
            a.feesData = {
                show: !1
            }, n > 0 && (a.feesData.show = !0, "buy" == o ? (a.feesData.buy = parseFloat((1 * n + 1 * r).toFixed(2)), 
            a.feesData.sell = parseFloat(n)) : "sell" == o ? (a.feesData.buy = parseFloat(n), 
            a.feesData.sell = parseFloat((n - r).toFixed(2))) : (a.feesData.buy = parseFloat((n + r / 2).toFixed(2)), 
            a.feesData.sell = parseFloat((n - r / 2).toFixed(2)))), M.setData(t({}, e + ".form", a));
        }
    },
    CashierTotal: function() {
        var e = x(), a = M.data[e].form, n = a.cashData;
        if (a.radio.paytype) {
            var i;
            if (!a.radio.paytype) return !1;
            var o = a.radio.paytype || "j", r = {
                j: parseFloat(n.j),
                m: parseFloat(n.m)
            }, s = {
                j: parseFloat(n.mj),
                m: parseFloat(n.mm)
            }, l = a.radio.piece || 1, c = parseFloat(r[o] * l), u = !0;
            c > s[o] ? n.info = "j" == o ? "积分不足 " + c + " 积分，无法兑换" : "余额不足 " + c + " 元，无法兑换" : (n.info = c + ("j" == o ? " 积分" : " 元"), 
            u = !1), M.setData((i = {}, t(i, e + ".form.cashData", n), t(i, e + ".submit[0].disabled", u), 
            i));
        } else {
            var f = a.radio.editionIndex, d = M.data[e].Mlist[f], m = parseFloat(d.money), p = a.radio.piece || 1, g = parseFloat(m * p);
            M.setData(t({}, e + ".form.cashData", {
                total: g,
                money: m,
                edition: d.edition
            }));
        }
    },
    GetList: function(e) {
        M.setData({
            loading: !0
        }), a(function(a) {
            var n, i = M.data, o = void 0 !== i.listIndex ? "listdata." + i.listIndex : "listdata";
            if (M.setData((n = {}, t(n, o, a), t(n, "loading", !1), n)), i.Form.lazy) {
                var r = i.Form.lazy;
                r.pos > 0 && r.pos != i.initialValue.Form.lazy.pos && M.setData(t({}, "Form.lazy.pos", r.pos + r.add));
            }
            e && e(a);
        });
    },
    Alert: function(e, t) {
        wx.showModal({
            title: e.title || "提示",
            content: e.text,
            showCancel: !e.showcancel,
            cancelText: e.canceltext || "取消",
            cancelColor: e.cancelcolor || "#000000",
            confirmText: e.confirmtext || "确定",
            confirmColor: e.confirmcolor || "#3cc51f",
            success: function(t) {
                var a = e.action;
                t.confirm && "clip" == a && n(e.cliptext || e.text);
            }
        });
    },
    timestamp: function() {
        var e = Date.parse(new Date());
        return e /= 1e3;
    },
    Refresh: i,
    getShare: function() {
        var e = {}, t = [ "Form" ], a = [ "title", "path", "image" ];
        for (var n in a) {
            var i = a[n];
            for (var r in t) {
                var s = t[r];
                M.data[s] && (M.data[s].share && M.data[s].share[i] ? e[i] = M.data[s].share[i] : M.data[s][i] && (e[i] = M.data[s][i]));
            }
        }
        return {
            title: e.title || "互站网",
            path: e.path || o(),
            imageUrl: e.image || !1
        };
    },
    Getdom: function(e, t) {
        var a = wx.createSelectorQuery();
        a.select(e).boundingClientRect(), a.exec(function(e) {
            t(e[0]);
        });
    },
    Popup: S,
    Lay: y,
    init: function(e) {
        M.data && e.route == M.route && e.__wxExparserNodeId__ == M.__wxExparserNodeId__ || (M = e, 
        T());
    }
};