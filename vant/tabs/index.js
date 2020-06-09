var t = function() {
    function t(t, e) {
        var i = [], a = !0, n = !1, s = void 0;
        try {
            for (var o, r = t[Symbol.iterator](); !(a = (o = r.next()).done) && (i.push(o.value), 
            !e || i.length !== e); a = !0) ;
        } catch (t) {
            n = !0, s = t;
        } finally {
            try {
                !a && r.return && r.return();
            } finally {
                if (n) throw s;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = require("../common/component"), i = require("../mixins/touch");

(0, e.VantComponent)({
    mixins: [ i.touch ],
    classes: [ "nav-class", "tab-class", "tab-active-class", "line-class" ],
    relation: {
        name: "tab",
        type: "descendant",
        linked: function(t) {
            this.child.push(t), this.updateTabs(this.data.tabs.concat(t.data));
        },
        unlinked: function(t) {
            var e = this.child.indexOf(t), i = this.data.tabs;
            i.splice(e, 1), this.child.splice(e, 1), this.updateTabs(i);
        }
    },
    props: {
        color: String,
        sticky: Boolean,
        animated: Boolean,
        swipeable: Boolean,
        scrollable: Boolean,
        lineWidth: {
            type: Number,
            value: -1
        },
        lineHeight: {
            type: Number,
            value: -1
        },
        active: {
            type: Number,
            value: 0
        },
        type: {
            type: String,
            value: "line"
        },
        border: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4
        },
        offsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        tabs: [],
        lineStyle: "",
        scrollLeft: 0,
        trackStyle: "",
        wrapStyle: "",
        position: ""
    },
    watch: {
        swipeThreshold: function() {
            this.set({
                scrollable: !1 !== this.data.scrollable && this.child.length > this.data.swipeThreshold
            });
        },
        color: "setLine",
        lineWidth: "setLine",
        lineHeight: "setLine",
        active: "setActiveTab",
        animated: "setTrack",
        offsetTop: "setWrapStyle"
    },
    beforeCreate: function() {
        this.child = [];
    },
    mounted: function() {
        var t = this;
        this.setLine(!0), this.setTrack(), this.scrollIntoView(), this.getRect(".van-tabs__wrap").then(function(e) {
            t.navHeight = e.height, t.observerContentScroll();
        });
    },
    destroyed: function() {
        this.createIntersectionObserver().disconnect();
    },
    methods: {
        updateTabs: function(t) {
            t = t || this.data.tabs, this.set({
                tabs: t,
                scrollable: !1 !== this.data.scrollable && t.length > this.data.swipeThreshold
            }), this.setActiveTab();
        },
        trigger: function(t, e) {
            this.$emit(t, {
                index: e,
                title: this.data.tabs[e].title
            });
        },
        onTap: function(t) {
            var e = t.currentTarget.dataset.index;
            this.data.tabs[e].disabled ? this.trigger("disabled", e) : (this.trigger("click", e), 
            this.setActive(e));
        },
        setActive: function(t) {
            t !== this.data.active && (this.trigger("change", t), this.set({
                active: t
            }), this.setActiveTab());
        },
        setLine: function(t) {
            var e = this;
            if ("line" === this.data.type) {
                var i = this.data, a = i.color, n = i.active, s = i.duration, o = i.lineWidth, r = i.lineHeight;
                this.getRect(".van-tab", !0).then(function(i) {
                    var c = i[n], l = -1 !== o ? o : c.width / 2, h = -1 !== r ? "height: " + r + "px;" : "", d = i.slice(0, n).reduce(function(t, e) {
                        return t + e.width;
                    }, 0);
                    d += (c.width - l) / 2;
                    var u = t ? "" : "transition-duration: " + s + "s; -webkit-transition-duration: " + s + "s;";
                    e.set({
                        lineStyle: "\n            " + h + "\n            width: " + l + "px;\n            background-color: " + a + ";\n            -webkit-transform: translateX(" + d + "px);\n            transform: translateX(" + d + "px);\n            " + u + "\n          "
                    });
                });
            }
        },
        setTrack: function() {
            var t = this, e = this.data, i = e.animated, a = e.active, n = e.duration;
            if (!i) return "";
            this.getRect(".van-tabs__content").then(function(e) {
                var s = e.width;
                t.set({
                    trackStyle: "\n            width: " + s * t.child.length + "px;\n            left: " + -1 * a * s + "px;\n            transition: left " + n + "s;\n            display: -webkit-box;\n            display: flex;\n          "
                });
                var o = {
                    width: s,
                    animated: i
                };
                t.child.forEach(function(t) {
                    t.set(o);
                });
            });
        },
        setActiveTab: function() {
            var t = this;
            this.child.forEach(function(e, i) {
                var a = {
                    active: i === t.data.active
                };
                a.active && (a.inited = !0), a.active !== e.data.active && e.set(a);
            }), this.set({}, function() {
                t.setLine(), t.setTrack(), t.scrollIntoView();
            });
        },
        scrollIntoView: function() {
            var e = this, i = this.data, a = i.active;
            i.scrollable && Promise.all([ this.getRect(".van-tab", !0), this.getRect(".van-tabs__nav") ]).then(function(i) {
                var n = t(i, 2), s = n[0], o = n[1], r = s[a], c = s.slice(0, a).reduce(function(t, e) {
                    return t + e.width;
                }, 0);
                e.set({
                    scrollLeft: c - (o.width - r.width) / 2
                });
            });
        },
        onTouchStart: function(t) {
            this.data.swipeable && this.touchStart(t);
        },
        onTouchMove: function(t) {
            this.data.swipeable && this.touchMove(t);
        },
        onTouchEnd: function() {
            if (this.data.swipeable) {
                var t = this.data, e = t.active, i = t.tabs, a = this.direction, n = this.deltaX, s = this.offsetX;
                "horizontal" === a && s >= 50 && (n > 0 && 0 !== e ? this.setActive(e - 1) : n < 0 && e !== i.length - 1 && this.setActive(e + 1));
            }
        },
        setWrapStyle: function() {
            var t = this.data, e = t.offsetTop, i = void 0;
            switch (t.position) {
              case "top":
                i = "\n            top: " + e + "px;\n            position: fixed;\n          ";
                break;

              case "bottom":
                i = "\n            top: auto;\n            bottom: 0;\n          ";
                break;

              default:
                i = "";
            }
            i !== this.data.wrapStyle && this.set({
                wrapStyle: i
            });
        },
        observerContentScroll: function() {
            var t = this;
            if (this.data.sticky) {
                var e = this.data.offsetTop, i = wx.getSystemInfoSync().windowHeight;
                this.createIntersectionObserver().disconnect(), this.createIntersectionObserver().relativeToViewport({
                    top: -(this.navHeight + e)
                }).observe(".van-tabs", function(i) {
                    var a = i.boundingClientRect.top;
                    if (!(a > e)) {
                        var n = i.intersectionRatio > 0 ? "top" : "bottom";
                        t.$emit("scroll", {
                            scrollTop: a + e,
                            isFixed: "top" === n
                        }), t.setPosition(n);
                    }
                }), this.createIntersectionObserver().relativeToViewport({
                    bottom: -(i - 1 - e)
                }).observe(".van-tabs", function(i) {
                    var a = i.boundingClientRect, n = a.top;
                    if (!(a.bottom < t.navHeight)) {
                        var s = i.intersectionRatio > 0 ? "top" : "";
                        t.$emit("scroll", {
                            scrollTop: n + e,
                            isFixed: "top" === s
                        }), t.setPosition(s);
                    }
                });
            }
        },
        setPosition: function(t) {
            var e = this;
            t !== this.data.position && this.set({
                position: t
            }).then(function() {
                e.setWrapStyle();
            });
        }
    }
});