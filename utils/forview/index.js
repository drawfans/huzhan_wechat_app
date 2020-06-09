Component({
    options: {
        styleIsolation: "apply-shared"
    },
    properties: {
        data: Object,
        form: Object
    },
    lifetimes: {},
    methods: {
        Lay: function(t) {
            this.triggerEvent("Event", "Event" == t.type ? t.detail : t);
        }
    }
});