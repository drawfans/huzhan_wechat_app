(0, require("../common/component").VantComponent)({
    field: !0,
    relation: {
        name: "radio",
        type: "descendant",
        linked: function(e) {
            var a = this.data, d = a.value, n = a.disabled, i = a.checkedClass;
            e.set({
                value: d,
                disabled: n || e.data.disabled,
                checkedClass: i
            });
        }
    },
    props: {
        value: null,
        disabled: Boolean,
        checkedClass: null
    },
    watch: {
        value: function(e) {
            this.getRelationNodes("../radio/index").forEach(function(a) {
                a.set({
                    value: e
                });
            });
        },
        checkedClass: function(e) {
            this.getRelationNodes("../radio/index").forEach(function(a) {
                a.set({
                    checkedClass: e
                });
            });
        },
        disabled: function(e) {
            this.getRelationNodes("../radio/index").forEach(function(a) {
                a.set({
                    disabled: e || a.data.disabled
                });
            });
        }
    }
});