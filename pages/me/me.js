// pages/Personal/Personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: ''
    },
    haslogin: false,
    user: {}
  },

  jumplogin: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },

  logout: function () {
    getApp().globalData.haslogin = false
    wx.showToast({
      title: '注销成功',
      icon: 'success',
      duration: 2000
    })
    //console.log(app.globalData.haslogin)
    this.setData({
      haslogin: app.globalData.haslogin,
    })
  },

  jumphistory: function () {
    if (getApp().globalData.haslogin) {
      wx.navigateTo({
        url: '../history/history'
      })
    } else {
      getApp().confirmlogin()
    }
  },

  /*我的收藏 */
  jumpcollection: function () {
    if (getApp().globalData.haslogin) {
      wx.navigateTo({
        url: '../collection/collection'
      })
    } else {
      getApp().confirmlogin()
    }
  },

  jumpsettings: function () {
    if (getApp().globalData.haslogin) {
      wx.navigateTo({
        url: '../settings/settings'
      })
    } else {
      getApp().confirmlogin()
    }
  },

  jumpabout: function () {
    wx.navigateTo({
      url: '../about/about'
    })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      wx.getUserInfo({
        success: function (res) {
          var avatarUrl = 'userInfo.avatarUrl';
          that.setData({
            [avatarUrl]: res.userInfo.avatarUrl,
          })
        }
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      //每次加载本页面判断登录状态
      var that = this
      that.setData({
        haslogin: app.globalData.haslogin
      })
      console.log("登录状态" + that.data.haslogin)

      //从全局变量获取用户信息
      if (that.data.haslogin)
        that.setData({
          user: app.globalData.user
        })
      console.log(that.data.user)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },



  })