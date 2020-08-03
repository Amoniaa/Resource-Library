// pages/MainPages/MainPages.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:{}
  },

  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
          }
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      result: getApp().globalData.result
    })
    console.log(getApp().globalData.result)
    setTimeout(() => {
      wx.hideLoading()
    }, 500);
  },

  /* 详情页面 */
  jumpdetails: function(e){
   
    console.log(e.target.id)
    var id = e.target.id;
    console.log(id);

      var id = e.target.id;
      for (var i = 0; i < this.data.result.length; i++) {
        if (id == this.data.result[i].resourceid) {
          var resourceid = this.data.result[i].resourceid
          var face_url = this.data.result[i].face_url
          var descrption = this.data.result[i].description
          var username = this.data.result[i].username
          var url = this.data.result[i].url
          var classs = this.data.result[i].class
          var subclass = this.data.result[i].subclass
          var timestamp = this.data.result[i].send_timestamp
          var total_collects = this.data.result[i].total_collects
          var total_comments = this.data.result[i].total_comments
          wx.navigateTo({
            url: '/pages/details/details?resourceid=' + resourceid + '&face_url=' + face_url + '&desc=' + descrption + 
                 '&username=' + username + '&url=' + url + '&classs=' + classs + '&subclass=' + subclass + '&timestamp=' + timestamp
                 + '&total_collects=' + total_collects + '&total_comments=' + total_comments
          })
        }
      }
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

  },
})



