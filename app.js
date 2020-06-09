App({
    onLaunch: function(n) {
        wx.setStorageSync("apiurl", "https://m.huzhan.com/");
    },
    globalData: {
        userInfo: null
    }
});