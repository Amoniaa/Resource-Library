// pages/MainPages/MainPages.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      avatarUrl:'',
      nickName:'',
    },
    showdata: {}
  },

  jumpsearch: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  jumpcommit: function () {
    if (getApp().globalData.haslogin) {
      wx.navigateTo({
        url: '../commit/commit'
      })
    } else {
      getApp().confirmlogin()
    }
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

  /* 收藏 */
  like: function (e) {
    console.log('id:' + e.target.id);
    var that = this
    var showdata = that.data.showdata
    if (getApp().globalData.haslogin) {

      wx.request({
        url: getApp().globalData.server + '/srclib/index.php/Home/Resource/do_collect',
        data: {
          resourceid: e.target.id,
          userid: getApp().globalData.user.userid
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.error_code == 1) {
            wx.showModal({
              title: '提示！',
              content: res.data.msg,
              showCancel: false,
              success(res) { }
            })
          }
          else if (res.data.error_code == 2) {
            wx.showModal({
              title: '提示！',
              content: res.data.msg,
              showCancel: false,
              success(res) { }
            })

          }
          else if (res.data.error_code == 3) {
            wx.showModal({
              title: '提示！',
              content: res.data.msg,
              showCancel: false,
              success(res) { }
            })
          }
          else if (res.data.error_code != 0) {
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
          }
          else if (res.data.error_code == 0) {
            var showdata = that.data.showdata
            console.log(showdata)
            for (var i = 0; i < showdata.length; i++) {
              if (showdata[i].id == e.target.id) {
                // that.data.showdata[i].islike = 1
                that.setData({
                  showdata: res.data.data,
                })
              }
            }
            wx.showModal({
              title: '提示！',
              content: res.data.msg,
              showCancel: false,
              success(res) { },
              complete: function (res) {
                getApp().globalData.haslogin = true
                wx.reLaunch({
                  url: "/pages/mainpage/mainpage"
                })
              }
            })
          }
        }
      })
    } else {
      getApp().confirmlogin()
    }
  },

/* 详情页面 */
  jumpdetails: function(e){
   
    console.log(e.target.id)
    var id = e.target.id;
    console.log(id);
    //console.log(this.data.showdata[id]);
    
      var id = e.target.id;
      for (var i = 0; i < this.data.showdata.length; i++) {
        if (id == this.data.showdata[i].resourceid) {
          var resourceid = this.data.showdata[i].resourceid
          var face_url = this.data.showdata[i].face_url
          var descrption = this.data.showdata[i].description
          var username = this.data.showdata[i].username
          var url = this.data.showdata[i].url
          var classs = this.data.showdata[i].class
          var subclass = this.data.showdata[i].subclass
          var timestamp = this.data.showdata[i].send_timestamp
          var total_collects = this.data.showdata[i].total_collects
          var total_comments = this.data.showdata[i].total_comments
          wx.navigateTo({
            url: '/pages/details/details?resourceid=' + resourceid + '&face_url=' + face_url + '&desc=' + descrption + 
                 '&username=' + username + '&url=' + url + '&classs=' + classs + '&subclass=' + subclass + '&timestamp=' + timestamp
                 + '&total_collects=' + total_collects + '&total_comments=' + total_comments
          })
        }
      }
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().globalData.server + '/srclib/index.php/Home/Resource/get_all_resources',
      data: {},
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
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
          that.setData({
            showdata: res.data.data
          })
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



