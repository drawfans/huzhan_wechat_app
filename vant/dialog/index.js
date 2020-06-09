function n(n, e, o) {
    return e in n ? Object.defineProperty(n, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[e] = o, n;
}

var e = require("../common/component"), o = require("../mixins/button"), t = require("../mixins/open-type");

(0, e.VantComponent)({
    mixins: [ o.button, t.openType ],
    props: {
        show: Boolean,
        title: String,
        message: String,
        useSlot: Boolean,
        className: String,
        asyncClose: Boolean,
        messageAlign: String,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        zIndex: {
            type: Number,
            value: 2e4
        },
        confirmButtonText: {
            type: String,
            value: "确认"
        },
        cancelButtonText: {
            type: String,
            value: "取消"
        },
        showConfirmButton: {
            type: Boolean,
            value: !0
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        transition: {
            type: String,
            value: "scale"
        },
        closable: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        loading: {
            confirm: !1,
            cancel: !1
        }
    },
    watch: {
        show: function(n) {
            !n && this.stopLoading();
        }
    },
    methods: {
        onConfirm: function() {
            this.handleAction("confirm");
        },
        onCancel: function() {
            this.handleAction("cancel");
        },
        onClickOverlay: function() {
            this.onClose("overlay");
        },
        handleAction: function(e) {
            this.data.asyncClose && this.set(n({}, "loading." + e, !0)), this.onClose(e);
        },
        close: function() {
            this.set({
                show: !1
            });
        },
        stopLoading: function() {
            this.set({
                loading: {
                    confirm: !1,
                    cancel: !1
                }
            });
        },
        onClose: function(n) {
            this.data.asyncClose || this.close(), this.$emit("close", n), this.$emit(n, {
                dialog: this
            });
            var e = this.data["confirm" === n ? "onConfirm" : "onCancel"];
            e && e(this);
        }
    }
});