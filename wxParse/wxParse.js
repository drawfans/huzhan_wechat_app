function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function e(t) {
    var e = this, a = t.target.dataset.src, i = t.target.dataset.from;
    console.log("nowImgUrl", a), console.log("nowImgUrl", e.data[i].imageUrls), void 0 !== i && i.length > 0 && wx.previewImage({
        current: a,
        urls: e.data[i].imageUrls
    });
}

function a(t) {
    var e = this, a = t.target.dataset.from, r = t.target.dataset.idx;
    void 0 !== a && a.length > 0 && i(t, r, e, a);
}

function i(e, a, i, n) {
    var d, o = i.data[n];
    if (o && 0 != o.images.length) {
        var g = o.images, s = r(e.detail.width, e.detail.height, i, n), l = g[a].index, h = "" + n, m = !0, u = !1, v = void 0;
        try {
            for (var w, f = l.split(".")[Symbol.iterator](); !(m = (w = f.next()).done); m = !0) h += ".nodes[" + w.value + "]";
        } catch (t) {
            u = !0, v = t;
        } finally {
            try {
                !m && f.return && f.return();
            } finally {
                if (u) throw v;
            }
        }
        var c = h + ".width", x = h + ".height", P = h + ".maxwidth", y = h + ".not";
        i.setData((d = {}, t(d, y, g[a].attr.not || ""), t(d, P, g[a].attr.maxwidth || "!/fw/" + s.imageWidth), 
        t(d, c, s.imageWidth), t(d, x, s.imageheight), d));
    }
}

function r(t, e, a, i) {
    var r = 0, n = 0, g = 0, s = {}, l = a.data[i].view.imagePadding;
    return r = d - 2 * l, o, t > r ? (g = (n = r) * e / t, s.imageWidth = n, s.imageheight = g) : (s.imageWidth = t, 
    s.imageheight = e), s;
}

var n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./html2json.js")), d = 0, o = 0;

wx.getSystemInfo({
    success: function(t) {
        d = t.windowWidth, o = t.windowHeight;
    }
}), module.exports = {
    wxParse: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "<div></div>", d = arguments[3], o = arguments[4], g = d, s = {};
        "html" == i && (s = n.default.html2json(r, t)), s.view = {}, s.view.imagePadding = 0, 
        void 0 !== o && (s.view.imagePadding = o);
        var l = {};
        l[t] = s, g.setData(l), g.wxParseImgLoad = a, g.wxParseImgTap = e;
    },
    wxParseTemArray: function(t, e, a, i) {
        for (var r = [], n = i.data, d = null, o = 0; o < a; o++) {
            var g = n[e + o].nodes;
            r.push(g);
        }
        t = t || "wxParseTemArray", (d = JSON.parse('{"' + t + '":""}'))[t] = r, i.setData(d);
    }
};