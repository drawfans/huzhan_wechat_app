var t = require("../common/component"), i = require("../mixins/link"), n = require("../mixins/button"), e = require("../mixins/open-type");

(0, t.VantComponent)({
    mixins: [ i.link, n.button, e.openType ],
    relation: {
        type: "ancestor",
        name: "goods-action",
        linked: function(t) {
            this.parent = t;
        }
    },
    props: {
        text: String,
        color: String,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            value: "danger"
        }
    },
    mounted: function() {
        this.updateStyle();
    },
    methods: {
        onClick: function(t) {
            this.$emit("click", t.detail), this.jumpLink();
        },
        updateStyle: function() {
            var t = this.parent.children, i = void 0 === t ? [] : t, n = i.indexOf(this);
            this.setData({
                isFirst: 0 === n,
                isLast: n === i.length - 1
            });
        }
    }
});