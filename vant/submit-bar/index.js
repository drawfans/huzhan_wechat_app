(0, require("../common/component").VantComponent)({
    classes: [ "bar-class", "price-class", "button-class" ],
    props: {
        tip: {
            type: null,
            observer: "updateTip"
        },
        tipIcon: String,
        type: Number,
        price: {
            type: null,
            observer: "updatePrice"
        },
        label: String,
        loading: Boolean,
        disabled: Boolean,
        buttonHidden: Boolean,
        buttonText: String,
        currency: {
            type: String,
            value: "¥"
        },
        buttonType: {
            type: String,
            value: "danger"
        },
        decimalLength: {
            type: Number,
            value: 2,
            observer: "updatePrice"
        },
        suffixLabel: String,
        safeAreaInsetBottom: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        updatePrice: function() {
            var e = this.data, t = e.price, i = e.decimalLength;
            this.setData({
                hasPrice: "number" == typeof t,
                priceStr: (t / 100).toFixed(i)
            });
        },
        updateTip: function() {
            this.setData({
                hasTip: "string" == typeof this.data.tip
            });
        },
        onSubmit: function(e) {
            this.$emit("submit", e.detail);
        }
    }
});