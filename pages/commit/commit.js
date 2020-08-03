// pages/commit/commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: "",
    category: [],
    activeId: '',
    activesubId: '',
    op: '',
    subop: '',
    url: '',
    description: ''
  },

  clickItem(e) {
    this.setData({
      activeId: e.currentTarget.dataset.id,
      op: e.currentTarget.dataset.op
    })
    console.log(this.data.op)
  },

  clicksubItem(e) {
    this.setData({
      activesubId: e.currentTarget.dataset.id,
      subop: e.currentTarget.dataset.subop
    })
    console.log(this.data.subop)
  },

  bindTextAreaUrl: function (e) {
    // console.log(e.detail.value)
    this.data.url = e.detail.value
    //console.log(this.data.url)
  },

  bindTextAreaDesc: function (e) {
    // console.log(e.detail.value)
    this.data.description = e.detail.value
    //console.log(this.data.description)
  },

  send: function (e) {
    var that = this
    if (that.data.url == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '资源链接不能为空！',
        success: function (res) { }
      })
    } else if (that.data.description == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '资源简介不能为空！',
        success: function (res) { }
      })
    }  else if (that.data.op == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请选择合适的一级分类',
        success: function (res) { }
      })
    }  else if (that.data.subop == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请选择合适的二级分类',
        success: function (res) { }
      })
    } else {
      //与服务器交互
      wx.request({
        url: getApp().globalData.server + '/srclib/index.php/Home/Resource/publish_new_resource',
        data: {
          userid: getApp().globalData.user.userid,
          url: that.data.url,
          description: that.data.description,
          class: that.data.op,
          subclass: that.data.subop
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log(getApp().globalData.user)
          if (res.data.error_code == 1) {
            wx.showModal({
              title: '提示！',
              content: res.data.msg,
              showCancel: false,
              success(res) { }
            })
          } else if (res.data.error_code == 0) {
            wx.showModal({
              title: '恭喜',
              content: '发布成功！',
              showCancel: false,
              success(res) { },
              complete: function (res) {
                wx.reLaunch({
                  url: '/pages/mainpage/mainpage',
                })
              }
            })
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '提示！',
            content: '网络好像出了点问题',
            showCancel: false,
            success(res) { }
          })
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      category: getApp().globalData.category
    })
    //console.log(this.data.category)
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

  }
})