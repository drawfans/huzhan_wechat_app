Component({
    options: {
        addGlobalClass: !0
    },
    externalClasses: [ "class" ],
    properties: {
        format: {
            type: String,
            value: "天小时分秒"
        },
        expireText: {
            type: String,
            value: "已结束"
        },
        customClass: String,
        customStyle: String,
        showSlot: {
            type: Boolean,
            value: !1
        },
        expireTime: {
            type: String,
            observer: function(t, e, a) {
                this.timer && clearInterval(this.timer);
                var i = Number(this.getDate(t).getTime());
                this.timer = setInterval(function(t, e) {
                    return function() {
                        return t.apply(e, arguments);
                    };
                }(function() {
                    this.getRightTime(i);
                }, this), 1e3);
            }
        }
    },
    data: {
        downDate: {}
    },
    lifetimes: {
        attached: function() {
            this.data.__page = this.__getPage();
        },
        detached: function() {
            clearInterval(this.timer);
        }
    },
    methods: {
        onCountDown: function() {
            var t = {
                data: this.data
            }, e = {};
            this.triggerEvent("countDown", t, e);
        },
        onExpire: function() {
            this.showSlot || this.setData({
                countDownText: this.data.expireText
            }, function() {});
            var t = {
                data: this.data
            }, e = {};
            this.triggerEvent("expire", t, e);
        },
        checkTime: function(t) {
            return t < 10 && (t = "0" + t), t;
        },
        getRightTime: function(t) {
            var e = t - Number(new Date().getTime());
            if (e > 0) {
                var a = parseInt(e / 864e5, 10), i = parseInt((e - 864e5 * a) / 36e5, 10), n = parseInt((e - 864e5 * a - 36e5 * i) / 6e4, 10), s = parseInt((e - 864e5 * a - 36e5 * i - 6e4 * n) / 1e3, 10);
                this.data.downDate.day = this.checkTime(a), this.data.downDate.hour = this.checkTime(i), 
                this.data.downDate.minute = this.checkTime(n), this.data.downDate.second = this.checkTime(s);
                var r = null;
                if (this.data.showSlot) this.onCountDown(); else {
                    var o = this.data.format;
                    if (o) {
                        "function" == typeof this.__getPage()[o] && (o = this.__getPage()[o](this));
                        var h = {
                            day: "天",
                            hour: "小时",
                            minute: "分",
                            second: "秒"
                        };
                        for (var u in h) {
                            var c = parseInt(this.data.downDate[u]);
                            o = o.replace(h[u], c > 0 ? c + h[u] : "");
                        }
                        r = o, this.setData({
                            countDownText: r
                        }, function() {});
                    }
                }
            } else this.onExpire(), clearInterval(this.timer);
        },
        __getPage: function() {
            if (this.data.__page) return this.data.__page;
            var t = getCurrentPages();
            return t[t.length - 1];
        },
        getDate: function(t) {
            var e = t.split(/[- :]/), a = this._getValue(e[0]), i = this._getValue(e[1]) - 1, n = this._getValue(e[2]), s = this._getValue(e[3]), r = this._getValue(e[4]), o = this._getValue(e[5]);
            return new Date(a, i, n, s, r, o);
        },
        _getValue: function(t) {
            return t || 0;
        }
    }
});