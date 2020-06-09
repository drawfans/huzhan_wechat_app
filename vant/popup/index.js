var e = require("../common/component"), t = require("../mixins/transition"), i = require("../mixins/safe-area");

(0, e.VantComponent)({
    classes: [ "enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class" ],
    mixins: [ (0, t.transition)(!1), (0, i.safeArea)() ],
    props: {
        transition: {
            type: String,
            observer: "observeClass"
        },
        title: String,
        titleStyle: String,
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            value: 100
        },
        widthFull: {
            type: Boolean,
            value: !1
        },
        heightFull: {
            type: Boolean,
            value: !1
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        position: {
            type: String,
            value: "center",
            observer: "observeClass"
        },
        closable: {
            type: Boolean,
            value: !0
        }
    },
    mounted: function() {
        var e = wx.getSystemInfoSync(), t = e.windowHeight, i = e.windowWidth;
        this.set({
            windowHeight: t % 2 == 0 ? t : t + 1,
            windowWidth: i % 2 == 0 ? i : i + 1
        });
    },
    methods: {
        onClickOverlay: function() {
            this.$emit("click-overlay"), this.data.closeOnClickOverlay && this.$emit("close");
        },
        onClickClosable: function() {
            this.$emit("close");
        },
        observeClass: function() {
            var e = this.data, t = e.transition, i = e.position;
            this.updateClasses(t || i), "none" === t && this.set({
                maxHeightduration: 0
            });
        }
    }
});