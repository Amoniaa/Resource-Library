// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mine: false,
    color1: "#f76767",
    color2: "#fd8282",
    resourceid: 0,
    face_url: '',
    username: '',
    description: '',
    url: '',
    classs: '',
    subclass: '',
    timestamp: '',
    total_collects: 0,
    total_comments: 0,
    comments: {},
    newcomment: ''
  },

  get_all_comments: function () {
    var that = this
    wx.request({
      url: getApp().globalData.server + '/srclib/index.php/Home/Comment/get_all_comments',
      data: {
        resourceid: that.data.resourceid
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
            comments: res.data.data
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
  },

  get_one_user_all_comments: function () {
    var that = this
    wx.request({
      url: getApp().globalData.server + '/srclib/index.php/Home/Comment/get_one_user_all_comments',
      data: {
        resourceid: that.data.resourceid,
        userid: getApp().globalData.user.userid
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
            comments: res.data.data
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
  },

  delete: function (e) {
    var that = this
    wx.request({
      url: getApp().globalData.server + '/srclib/index.php/Home/Comment/delete_comment',
      data: {
        commentid: e.target.id,
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
          var num =Number(that.data.total_comments)
           num--
          wx.showModal({
            title: '提示！',
            showCancel: false,
            content: '删除成功',
            success(res) {
              that.setData({
                total_comments: num
              })
            },
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
    this.switch2()
  },

  bindTextAreaCom: function (e) {
    // console.log(e.detail.value)
    this.data.newcomment = e.detail.value
    console.log(this.data.newcomment)
  },

  sendcommit: function (e) {
    var that = this    
    if (getApp().globalData.haslogin) {
      console.log(that.data.newcomment)
      if (that.data.newcomment == '') {
        wx.showModal({
          title: '提示！',
          showCancel: false,
          content: '请输入评论内容！',
          success: function (res) { }
        })
      } else{
         //与服务器交互
          wx.request({
            url: getApp().globalData.server + '/srclib/index.php/Home/Comment/publish_new_comment',
            data: {
              userid: getApp().globalData.user.userid,
              content: that.data.newcomment,
              resourceid: that.data.resourceid,
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
                var num =Number(that.data.total_comments)
                num++
                wx.showModal({
                  title: '恭喜',
                  content: '评论成功！',
                  showCancel: false,
                  success(res) { 
                    that.setData({
                      total_comments: num
                    })
                    that.switch1()
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
    }
    else {
      getApp().confirmlogin()
    }
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
          resourceid: that.data.resourceid,
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
              }
            })
          }
        }
      })
    } else {
      getApp().confirmlogin()
    }
  },

  switch1: function () {
    this.setData({
      mine: false,
      color1: "#f76767",
      color2: "#fd8282",
    })
    this.get_all_comments()
  },

  switch2: function () {
    if (getApp().globalData.haslogin) {
      this.setData({
        mine: true,
        color2: "#f76767",
        color1: "#fd8282",
      })
      this.get_one_user_all_comments()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      resourceid: options.resourceid,
      face_url: options.face_url,
      username: options.username,
      description: options.desc,
      url: options.url,
      class: options.classs,
      subclass: options.subclass,
      timestamp: options.timestamp,
      total_collects: options.total_collects,
      total_comments: options.total_comments
    })
    //console.log("resourceid:" + this.data.resourceid)
    this.get_all_comments()
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