function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), i = function() {
    function i() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        t(this, i), Object.assign(this, {
            data: {},
            rules: e,
            messages: n
        }), this.__init();
    }
    return n(i, [ {
        key: "__init",
        value: function() {
            this.__initMethods(), this.__initDefaults(), this.__initData();
        }
    }, {
        key: "__initData",
        value: function() {
            this.form = {}, this.errorList = [];
        }
    }, {
        key: "__initDefaults",
        value: function() {
            this.defaults = {
                messages: {
                    required: "不能为空",
                    email: "请输入有效的邮箱地址",
                    phone: "请输入11位的手机号码",
                    qq: "请输入5~11位的QQ号码",
                    url: "请输入有效的网址",
                    nice: "昵称必须为2~7位的数字、字母或汉字",
                    date: "请输入有效的日期",
                    dateISO: "请输入有效的日期（ISO），例如：2009-06-23，1998/01/22",
                    number: "请输入有效的数字",
                    digits: "只能输入数字",
                    idcard: "请输入18位的有效身份证",
                    safe: "不少于6位，且同时包含数字+字母",
                    pass: "密码长度要求6-20位",
                    vcode: "验证码错误，请重新输入",
                    equalTo: this.formatTpl("输入值必须和 {0} 相同"),
                    contains: this.formatTpl("输入值必须包含 {0}"),
                    minlength: this.formatTpl("最少需要输入 {0} 个字符"),
                    maxlength: this.formatTpl("最多允许输入 {0} 个字符"),
                    rangelength: this.formatTpl("长度要求：{0} 到 {1} 个字符"),
                    min: this.formatTpl("请输入不小于 {0} 的数字"),
                    max: this.formatTpl("请输入不大于 {0} 的数字"),
                    range: this.formatTpl("允许数字范围： {0} 到 {1} 之间")
                }
            };
        }
    }, {
        key: "__initMethods",
        value: function() {
            var t = this;
            t.methods = {
                required: function(e, n) {
                    if (!t.depend(n)) return "dependency-mismatch";
                    if ("number" == typeof e) e = e.toString(); else if ("boolean" == typeof e) return !0;
                    return e.length > 0;
                },
                email: function(e) {
                    return t.optional(e) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e);
                },
                phone: function(e) {
                    return t.optional(e) || /^1[345789]\d{9}$/.test(e);
                },
                qq: function(e) {
                    return t.optional(e) || /^[1-9]\d{5,11}$/.test(e);
                },
                nice: function(e) {
                    return t.optional(e) || /^[\u4e00-\u9fa5a_a-zA-Z0-9\-]{2,14}$/.test(e);
                },
                pass: function(e) {
                    return t.optional(e) || /^\S{6,20}$/.test(e);
                },
                vcode: function(e) {
                    return t.optional(e) || /^\S{4,6}$/.test(e);
                },
                url: function(e) {
                    return t.optional(e) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e);
                },
                date: function(e) {
                    return t.optional(e) || !/Invalid|NaN/.test(new Date(e).toString());
                },
                dateISO: function(e) {
                    return t.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e);
                },
                number: function(e) {
                    return t.optional(e) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e);
                },
                digits: function(e) {
                    return t.optional(e) || /^\d+$/.test(e);
                },
                idcard: function(e) {
                    return t.optional(e) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e);
                },
                equalTo: function(e, n) {
                    return t.optional(e) || e === t.data[n];
                },
                contains: function(e, n) {
                    return t.optional(e) || e.indexOf(n) >= 0;
                },
                minlength: function(e, n) {
                    return t.optional(e) || e.length >= n;
                },
                maxlength: function(e, n) {
                    return t.optional(e) || e.length <= n;
                },
                rangelength: function(e, n) {
                    return t.optional(e) || e.length >= n[0] && e.length <= n[1];
                },
                min: function(e, n) {
                    return t.optional(e) || e >= n;
                },
                max: function(e, n) {
                    return t.optional(e) || e <= n;
                },
                range: function(e, n) {
                    return t.optional(e) || e >= n[0] && e <= n[1];
                },
                safe: function(e, n) {
                    return t.optional(e) || /(?=^.*?\d)(?=^.*?[a-zA-Z])^[0-9a-zA-Z]{6,32}$/.test(e);
                }
            };
        }
    }, {
        key: "addMethod",
        value: function(t, e, n) {
            this.methods[t] = e, this.defaults.messages[t] = void 0 !== n ? n : this.defaults.messages[t];
        }
    }, {
        key: "isValidMethod",
        value: function(t) {
            var e = [];
            for (var n in this.methods) n && "function" == typeof this.methods[n] && e.push(n);
            return -1 !== e.indexOf(t);
        }
    }, {
        key: "formatTpl",
        value: function(t, e) {
            var n = this;
            return 1 === arguments.length ? function() {
                var e = Array.from(arguments);
                return e.unshift(t), n.formatTpl.apply(this, e);
            } : void 0 === e ? t : (arguments.length > 2 && e.constructor !== Array && (e = Array.from(arguments).slice(1)), 
            e.constructor !== Array && (e = [ e ]), e.forEach(function(e, n) {
                t = t.replace(new RegExp("\\{" + n + "\\}", "g"), function() {
                    return e;
                });
            }), t);
        }
    }, {
        key: "depend",
        value: function(t) {
            switch (void 0 === t ? "undefined" : e(t)) {
              case "boolean":
                t = t;
                break;

              case "string":
                t = !!t.length;
                break;

              case "function":
                t = t();

              default:
                t = !0;
            }
            return t;
        }
    }, {
        key: "optional",
        value: function(t) {
            return !this.methods.required(t) && "dependency-mismatch";
        }
    }, {
        key: "customMessage",
        value: function(t, n) {
            var i = this.messages[t], r = "object" === (void 0 === i ? "undefined" : e(i));
            if (i && r) return i[n.method];
        }
    }, {
        key: "defaultMessage",
        value: function(t, n) {
            var i = this.customMessage(t, n) || this.defaults.messages[n.method], r = void 0 === i ? "undefined" : e(i);
            return "undefined" === r ? i = "Warning: No message defined for " + n.method + "." : "function" === r && (i = i.call(this, n.parameters)), 
            void 0 !== this.messages[t] && this.messages[t].label ? i = "【" + this.messages[t].label + "】" + i : "required" == n.method && "不能为空" == i && (i = "此项" + i), 
            i;
        }
    }, {
        key: "formatTplAndAdd",
        value: function(t, e, n) {
            var i = this.defaultMessage(t, e);
            this.errorList.push({
                param: t,
                msg: i,
                value: n
            });
        }
    }, {
        key: "checkParam",
        value: function(t, n, i) {
            if (this.data = i, void 0 === i[t]) return !0;
            if (n.isShow) {
                var r = !0;
                for (var o in n.isShow) {
                    var a = n.isShow[o];
                    ("object" == e(i[o]) ? i[o].join("") : i[o]) !== a && (r = !1);
                }
                if (!r) return !0;
            }
            var s = null !== i[t] ? i[t] : "";
            for (var u in n) if ("isShow" != u && this.isValidMethod(u)) {
                var f = {
                    method: u,
                    parameters: n[u]
                }, l = this.methods[u](s, f.parameters);
                if (this.setValue(t, u, l, s), !l || "dependency-mismatch" === l) return this.formatTplAndAdd(t, f, s), 
                !1;
            }
            return !0;
        }
    }, {
        key: "setView",
        value: function(t) {
            this.form[t] = {
                $name: t,
                $valid: !0,
                $invalid: !1,
                $error: {},
                $success: {},
                $viewValue: ""
            };
        }
    }, {
        key: "setValue",
        value: function(t, e, n, i) {
            var r = this.form[t];
            r.$valid = n, r.$invalid = !n, r.$error[e] = !n, r.$success[e] = n, r.$viewValue = i;
        }
    }, {
        key: "checkForm",
        value: function(t) {
            this.__initData();
            for (var e in this.rules) if (!(t.Send && [ "phone", "email" ].indexOf(e) < 0 || (this.setView(e), 
            this.checkParam(e, this.rules[e], t)))) return !1;
            return this.valid();
        }
    }, {
        key: "valid",
        value: function() {
            return 0 === this.size();
        }
    }, {
        key: "size",
        value: function() {
            return this.errorList.length;
        }
    }, {
        key: "validationErrors",
        value: function() {
            return this.errorList;
        }
    } ]), i;
}();

exports.default = i;