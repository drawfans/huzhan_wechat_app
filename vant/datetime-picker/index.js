function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function t(e) {
    return (0, s.isDef)(e) && !isNaN(new Date(e).getTime());
}

function n(e, t, n) {
    return Math.min(Math.max(e, t), n);
}

function a(e) {
    return ("00" + e).slice(-2);
}

function r(e, t) {
    for (var n = -1, a = Array(e); ++n < e; ) a[n] = t(n);
    return a;
}

function u(e) {
    if (e) {
        for (;isNaN(parseInt(e, 10)); ) e = e.slice(1);
        return parseInt(e, 10);
    }
}

function i(e, t) {
    return 32 - new Date(e, t - 1, 32).getDate();
}

var o = function() {
    function e(e, t) {
        var n = [], a = !0, r = !1, u = void 0;
        try {
            for (var i, o = e[Symbol.iterator](); !(a = (i = o.next()).done) && (n.push(i.value), 
            !t || n.length !== t); a = !0) ;
        } catch (e) {
            r = !0, u = e;
        } finally {
            try {
                !a && o.return && o.return();
            } finally {
                if (r) throw u;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), m = require("../common/component"), s = require("../common/utils"), l = require("../picker/shared"), c = new Date().getFullYear(), h = function(e, t) {
    return t;
};

(0, m.VantComponent)({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: Object.assign({}, l.pickerProps, {
        formatter: {
            type: Function,
            value: h
        },
        value: null,
        type: {
            type: String,
            value: "datetime"
        },
        showToolbar: {
            type: Boolean,
            value: !0
        },
        minDate: {
            type: Number,
            value: new Date(c - 10, 0, 1).getTime()
        },
        maxDate: {
            type: Number,
            value: new Date(c + 10, 11, 31).getTime()
        },
        minHour: {
            type: Number,
            value: 0
        },
        maxHour: {
            type: Number,
            value: 23
        },
        minMinute: {
            type: Number,
            value: 0
        },
        maxMinute: {
            type: Number,
            value: 59
        }
    }),
    data: {
        innerValue: Date.now(),
        columns: []
    },
    watch: {
        value: function(e) {
            var t = this, n = this.data;
            (e = this.correctValue(e)) === n.innerValue || this.updateColumnValue(e).then(function() {
                t.$emit("input", e);
            });
        },
        type: "updateColumns",
        minHour: "updateColumns",
        maxHour: "updateColumns",
        minMinute: "updateColumns",
        maxMinute: "updateColumns"
    },
    methods: {
        getPicker: function() {
            if (null == this.picker) {
                var e = this.picker = this.selectComponent(".van-datetime-picker"), t = e.setColumnValues;
                e.setColumnValues = function() {
                    for (var n = arguments.length, a = Array(n), r = 0; r < n; r++) a[r] = arguments[r];
                    return t.apply(e, [].concat(a, [ !1 ]));
                };
            }
            return this.picker;
        },
        updateColumns: function() {
            var e = this.data.formatter, t = void 0 === e ? h : e, n = this.getRanges().map(function(e, n) {
                var u = e.type, i = e.range;
                return {
                    values: r(i[1] - i[0] + 1, function(e) {
                        var n = i[0] + e;
                        return n = "year" === u ? "" + n : a(n), t(u, n);
                    })
                };
            });
            return this.set({
                columns: n
            });
        },
        getRanges: function() {
            var e = this.data;
            if ("time" === e.type) return [ {
                type: "hour",
                range: [ e.minHour, e.maxHour ]
            }, {
                type: "minute",
                range: [ e.minMinute, e.maxMinute ]
            } ];
            var t = this.getBoundary("max", e.innerValue), n = t.maxYear, a = t.maxDate, r = t.maxMonth, u = t.maxHour, i = t.maxMinute, o = this.getBoundary("min", e.innerValue), m = o.minYear, s = o.minDate, l = [ {
                type: "year",
                range: [ m, n ]
            }, {
                type: "month",
                range: [ o.minMonth, r ]
            }, {
                type: "day",
                range: [ s, a ]
            }, {
                type: "hour",
                range: [ o.minHour, u ]
            }, {
                type: "minute",
                range: [ o.minMinute, i ]
            } ];
            return "date" === e.type && l.splice(3, 2), "year-month" === e.type && l.splice(2, 3), 
            l;
        },
        correctValue: function(e) {
            var r = this.data, u = "time" !== r.type;
            if (u && !t(e) ? e = r.minDate : u || e || (e = a(r.minHour) + ":00"), !u) {
                var i = e.split(":"), m = o(i, 2), s = m[0], l = m[1];
                return s = a(n(s, r.minHour, r.maxHour)), l = a(n(l, r.minMinute, r.maxMinute)), 
                s + ":" + l;
            }
            return e = Math.max(e, r.minDate), e = Math.min(e, r.maxDate);
        },
        getBoundary: function(t, n) {
            var a, r = new Date(n), u = new Date(this.data[t + "Date"]), o = u.getFullYear(), m = 1, s = 1, l = 0, c = 0;
            return "max" === t && (m = 12, s = i(r.getFullYear(), r.getMonth() + 1), l = 23, 
            c = 59), r.getFullYear() === o && (m = u.getMonth() + 1, r.getMonth() + 1 === m && (s = u.getDate(), 
            r.getDate() === s && (l = u.getHours(), r.getHours() === l && (c = u.getMinutes())))), 
            a = {}, e(a, t + "Year", o), e(a, t + "Month", m), e(a, t + "Date", s), e(a, t + "Hour", l), 
            e(a, t + "Minute", c), a;
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.innerValue);
        },
        onChange: function() {
            var e = this, t = this.data, n = void 0, a = this.getPicker();
            if ("time" === t.type) {
                var r = a.getIndexes();
                n = r[0] + t.minHour + ":" + (r[1] + t.minMinute);
            } else {
                var o = a.getValues(), m = u(o[0]), s = u(o[1]), l = i(m, s), c = u(o[2]);
                "year-month" === t.type && (c = 1), c = c > l ? l : c;
                var h = 0, p = 0;
                "datetime" === t.type && (h = u(o[3]), p = u(o[4])), n = new Date(m, s - 1, c, h, p);
            }
            n = this.correctValue(n), this.updateColumnValue(n).then(function() {
                e.$emit("input", n), e.$emit("change", a);
            });
        },
        updateColumnValue: function(e) {
            var t = this, n = [], r = this.data, u = r.type, i = r.formatter, o = void 0 === i ? h : i, m = this.getPicker();
            if ("time" === u) {
                var s = e.split(":");
                n = [ o("hour", s[0]), o("minute", s[1]) ];
            } else {
                var l = new Date(e);
                n = [ o("year", "" + l.getFullYear()), o("month", a(l.getMonth() + 1)) ], "date" === u && n.push(o("day", a(l.getDate()))), 
                "datetime" === u && n.push(o("day", a(l.getDate())), o("hour", a(l.getHours())), o("minute", a(l.getMinutes())));
            }
            return this.set({
                innerValue: e
            }).then(function() {
                return t.updateColumns();
            }).then(function() {
                return m.setValues(n);
            });
        }
    },
    created: function() {
        var e = this, t = this.correctValue(this.data.value);
        this.updateColumnValue(t).then(function() {
            e.$emit("input", t);
        });
    }
});