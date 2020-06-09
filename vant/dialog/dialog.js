function e() {
    var e = getCurrentPages();
    return e[e.length - 1];
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = [], n = function n(o) {
    return o = Object.assign({}, n.currentOptions, o), o.html = -1 != o.message.indexOf("<"), 
    new Promise(function(n, s) {
        var c = (o.context || e()).selectComponent(o.selector);
        delete o.selector, c ? (c.set(Object.assign({
            onCancel: s,
            onConfirm: n
        }, o)), t.push(c)) : console.warn("未找到 van-dialog 节点，请确认 selector 及 context 是否正确");
    });
};

n.defaultOptions = {
    show: !0,
    title: "",
    message: "",
    zIndex: 2e4,
    overlay: !0,
    className: "",
    asyncClose: !1,
    messageAlign: "",
    transition: "scale",
    selector: "#van-dialog",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnClickOverlay: !1,
    confirmButtonOpenType: ""
}, n.alert = n, n.confirm = function(e) {
    return n(Object.assign({
        showCancelButton: !0
    }, e));
}, n.close = function() {
    t.forEach(function(e) {
        e.close();
    }), t = [];
}, n.stopLoading = function() {
    t.forEach(function(e) {
        e.stopLoading();
    });
}, n.setDefaultOptions = function(e) {
    Object.assign(n.currentOptions, e);
}, n.resetDefaultOptions = function() {
    n.currentOptions = Object.assign({}, n.defaultOptions);
}, n.resetDefaultOptions(), exports.default = n;