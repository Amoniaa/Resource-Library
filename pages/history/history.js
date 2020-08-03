// pages/MainPages/MainPages.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {},
    user: {}
  },

  /* 详情页面 */
  jumpdetails: function (e) {

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

  /* 收藏 */
  like: function (e) {
    console.log('id:' + e.target.id);
    var that = this
    var result = that.data.result
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
           var num =Number(that.data.total_collects)
           num++
            wx.showModal({
              title: '恭喜',
              content: '收藏成功！',
              showCancel: false,
              success(res) { 
                that.setData({
                  total_collects: num
                })
              },
              complete: function (res) {
                wx.reLaunch({
                  url: "/pages/history/history"
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

  delete: function (e) {
    console.log("delete resourceid:", e.target.id)
    var that = this
    wx.request({
      url: getApp().globalData.server + '/srclib/index.php/Home/Resource/delete_resource',
      data: {
        resourceid: e.target.id,
        userid: getApp().globalData.user.userid,
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.error_code != 0) {
          wx.showModal({
            title: '哎呀～',
            content: '删除失败！' + res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else if (res.data.error_code == 0) {
          wx.showModal({
            title: '提示！',
            showCancel: false,
            content: '删除成功',
            success(res) { },
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
      }
    })
    this.onShow()
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
    this.setData({
      result: getApp().globalData.result
    })
    console.log(getApp().globalData.result)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      user: getApp().globalData.user
    })

    //这里根据搜索方式请求API
    wx.showLoading({
      title: '加载中',
    })

    var that = this
    console.log(that.data.user.userid)
    wx.request({
      url: getApp().globalData.server + '/srclib/index.php/Home/Resource/get_one_user_all_resources',
      data: {
        userid: that.data.user.userid
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
          that.setData({
            result: getApp().globalData.result
          })
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
      }
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



