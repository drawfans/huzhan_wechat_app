(0, require("../common/component").VantComponent)({
    field: !0,
    classes: [ "input-class", "right-icon-class" ],
    props: {
        size: String,
        icon: String,
        label: String,
        toggle: Boolean,
        error: Boolean,
        fixed: Boolean,
        focus: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        rightIcon: String,
        disabled: Boolean,
        autosize: Boolean,
        readonly: Boolean,
        required: Boolean,
        password: Boolean,
        iconClass: String,
        clearable: Boolean,
        inputAlign: String,
        inputClass: String,
        customClass: String,
        customStyle: String,
        confirmType: String,
        confirmHold: Boolean,
        errorMessage: String,
        placeholder: String,
        placeholderStyle: String,
        errorMessageAlign: String,
        showConfirmBar: {
            type: Boolean,
            value: !0
        },
        adjustPosition: {
            type: Boolean,
            value: !0
        },
        cursorSpacing: {
            type: Number,
            value: 50
        },
        maxlength: {
            type: Number,
            value: -1
        },
        type: {
            type: String,
            value: "text"
        },
        border: {
            type: Boolean,
            value: !0
        },
        titleWidth: {
            type: String,
            value: "78px"
        },
        hidden: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        showClear: !1
    },
    beforeCreate: function() {
        this.focused = !1, this.set({
            placeholder: 1
        });
    },
    created: function() {
        this.data.placeholder && this.set({
            placeholder: this.data.placeholder.replace(/<br>/g, "\n")
        }), "textarea" == this.data.type && this.data.value && this.set({
            value: this.data.value.replace(/\\n/g, "\n").replace(/\\t/g, "\t")
        });
    },
    methods: {
        onLoad: function() {},
        onInput: function(e) {
            var t = this, a = (e.detail || {}).value, o = void 0 === a ? "" : a;
            this.set({
                value: o,
                showClear: this.getShowClear(o)
            }, function() {
                t.emitChange(o);
            });
        },
        onFocus: function(e) {
            var t = e.detail || {}, a = t.value, o = void 0 === a ? "" : a, i = t.height, n = void 0 === i ? 0 : i;
            this.$emit("focus", {
                value: o,
                height: n
            }), this.focused = !0, this.blurFromClear = !1, this.set({
                showClear: this.getShowClear()
            });
        },
        onBlur: function(e) {
            var t = this, a = e.detail || {}, o = a.value, i = void 0 === o ? "" : o, n = a.cursor, l = void 0 === n ? 0 : n;
            this.$emit("blur", {
                value: i,
                cursor: l
            }), this.focused = !1;
            var r = this.getShowClear();
            this.data.value === i ? this.set({
                showClear: r
            }) : this.blurFromClear || this.set({
                value: i,
                showClear: r
            }, function() {
                t.emitChange(i);
            });
        },
        onClickIcon: function() {
            this.$emit("click-icon");
        },
        getShowClear: function(e) {
            return e = void 0 === e ? this.data.value : e, this.data.clearable && this.focused && e && !this.data.readonly;
        },
        onClear: function() {
            var e = this;
            wx.showModal({
                title: "提示",
                content: "确定清空当前输入框内容吗？",
                success: function(t) {
                    t.confirm && (e.blurFromClear = !0, e.set({
                        value: "",
                        showClear: e.getShowClear("")
                    }, function() {
                        e.emitChange(""), e.$emit("clear", "");
                    }));
                }
            });
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.value);
        },
        emitChange: function(e) {
            var t = this.data.name, a = this.data.label;
            this.$emit("input", e), this.$emit("change", {
                name: t,
                label: a,
                value: e
            });
        }
    }
});