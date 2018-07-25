//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  // onGotUserInfo: function (e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.userInfo)
  //   console.log(e.detail.rawData)
  // },
  onLoad: function () {
    //  wx.getSetting({
    //    success(res){
    //      if (!res.authSetting['scope.userInfo']) {
    //       //  console.log(scope.userInfo);
    //        wx.authorize({
    //          scope: 'scope.userInfo',
    //          success() {
    //            wx.getUserInfo({
    //              success: function (res) {
    //                console.log(res.userInfo)
    //              }
    //            })
    //          }
    //        })
    //      }
    //    }
    //  })
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  }
})
