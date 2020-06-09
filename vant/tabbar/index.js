var e = require("../common/component"), t = require("../mixins/safe-area");

(0, e.VantComponent)({
    mixins: [ (0, t.safeArea)() ],
    relation: {
        name: "tabbar-item",
        type: "descendant",
        linked: function(e) {
            this.children = this.children || [], this.children.push(e), this.setActiveItem();
        },
        unlinked: function(e) {
            this.children = this.children || [], this.children = this.children.filter(function(t) {
                return t !== e;
            }), this.setActiveItem();
        }
    },
    props: {
        active: Number,
        activeColor: String,
        fixed: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    watch: {
        active: function(e) {
            this.currentActive = e, this.setActiveItem();
        }
    },
    created: function() {
        this.currentActive = this.data.active;
    },
    methods: {
        setActiveItem: function() {
            var e = this;
            return Array.isArray(this.children) && this.children.length ? Promise.all(this.children.map(function(t, i) {
                return t.setActive({
                    active: i === e.currentActive,
                    color: e.data.activeColor
                });
            })) : Promise.resolve();
        },
        onChange: function(e) {
            var t = this, i = (this.children || []).indexOf(e);
            i !== this.currentActive && -1 !== i && (this.currentActive = i, this.setActiveItem().then(function() {
                t.$emit("change", i);
            }));
        }
    }
});