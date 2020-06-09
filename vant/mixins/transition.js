Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transition = void 0;

var e = require("../common/utils"), t = function(e) {
    return {
        enter: "van-" + e + "-enter van-" + e + "-enter-active enter-class enter-active-class",
        "enter-to": "van-" + e + "-enter-to van-" + e + "-enter-active enter-to-class enter-active-class",
        leave: "van-" + e + "-leave van-" + e + "-leave-active leave-class leave-active-class",
        "leave-to": "van-" + e + "-leave-to van-" + e + "-leave-active leave-to-class leave-active-class"
    };
}, s = function() {
    return new Promise(function(e) {
        return setTimeout(e, 1e3 / 30);
    });
};

exports.transition = function(n) {
    return Behavior({
        properties: {
            customStyle: String,
            show: {
                type: Boolean,
                value: n,
                observer: "observeShow"
            },
            duration: {
                type: [ Number, Object ],
                value: 300,
                observer: "observeDuration"
            },
            name: {
                type: String,
                value: "fade",
                observer: "updateClasses"
            }
        },
        data: {
            type: "",
            inited: !1,
            display: !1,
            classNames: t("fade")
        },
        attached: function() {
            this.data.show && this.show();
        },
        methods: {
            observeShow: function(e) {
                e ? this.show() : this.leave();
            },
            updateClasses: function(e) {
                this.set({
                    classNames: t(e)
                });
            },
            show: function() {
                var t = this, n = this.data, a = n.classNames, i = n.duration, r = (0, e.isObj)(i) ? i.leave : i;
                Promise.resolve().then(s).then(function() {
                    return t.set({
                        inited: !0,
                        display: !0,
                        classes: a.enter,
                        currentDuration: r
                    });
                }).then(s).then(function() {
                    return t.set({
                        classes: a["enter-to"]
                    });
                });
            },
            leave: function() {
                var t = this, n = this.data, a = n.classNames, i = n.duration, r = (0, e.isObj)(i) ? i.leave : i;
                0 != +r ? Promise.resolve().then(s).then(function() {
                    return t.set({
                        classes: a.leave,
                        currentDuration: r
                    });
                }).then(s).then(function() {
                    return t.set({
                        classes: a["leave-to"]
                    });
                }) : this.onTransitionEnd();
            },
            onTransitionEnd: function() {
                this.data.show || (this.set({
                    display: !1
                }), this.$emit("transitionEnd"));
            }
        }
    });
};