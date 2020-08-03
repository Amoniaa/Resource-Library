// pages/Block/Block.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    toView: '1',
    activeId: '1',
    category: [],
    op: '工学',
    subop: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      op: '工学',
      activeId: '1',
      toView: '1',
      category: getApp().globalData.category
    })
  },

  clickItem(e) {
    this.setData({
      activeId: e.currentTarget.dataset.id,
      op: e.currentTarget.dataset.op
    })
    //console.log(this.data.op)
  },

  clicksubItem(e) {
    this.setData({
      subop: e.currentTarget.dataset.subop
    })
    //console.log(this.data.subop)

    var that = this

    //这里根据搜索方式请求API
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().globalData.server + '/srclib/index.php/Home/Resource/get_resources_by_class',
      data: {
        class: that.data.op,
        subclass: that.data.subop
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.error_code != 0) {
          wx.showModal({
            title: '哎呀～',
            content: '出错了呢！' + res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else if (res.data.error_code == 0) {
          getApp().globalData.result = res.data.data
          //console.log(getApp().globalData.result)
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '哎呀～',
          content: '网络不在状态呢！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
    })

    setTimeout(() => {
      wx.hideLoading()
    }, 500);

    wx.navigateTo({
      url: '../searchresult/searchresult'
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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