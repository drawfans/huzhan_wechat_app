(0, require("../common/component").VantComponent)({
    relation: {
        name: "tabs",
        type: "ancestor"
    },
    props: {
        icon: String,
        iconStyle: String,
        dot: Boolean,
        info: null,
        title: String,
        disabled: Boolean,
        titleStyle: String
    },
    data: {
        width: null,
        inited: !1,
        active: !1,
        animated: !1
    },
    watch: {
        icon: "update",
        title: "update",
        disabled: "update",
        dot: "update",
        info: "update",
        titleStyle: "update"
    },
    methods: {
        update: function() {
            var t = this.getRelationNodes("../tabs/index")[0];
            t && t.updateTabs();
        }
    }
});