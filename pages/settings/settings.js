// pages/settings/settings.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newusername: '',
    password: '',
    newpassword: '',
    user: {}
  },

  newusernameInput: function (e) {
    this.data.newusername = e.detail.value
    console.log(this.data.newusername)
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value
    console.log(this.data.password)
  },

  newpasswordInput: function (e) {
    this.data.newpassword = e.detail.value
    console.log(this.data.newpassword)
  },

  //修改用户名的函数
  modifyusername: function (e) {
    var that = this
    if (that.data.newusername == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入新用户名！',
        success: function (res) { }
      })
    }
    else {
      console.log('success')
      wx.request({
        url: getApp().globalData.server + '/srclib/index.php/Home/User/modify_username',
        data: {
          newusername: that.data.newusername,
          userid: that.data.user.userid
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
          } else if (res.data.error_code == 2) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: '指定记录不存在',
              success: function (res) { }
            })
          }
          else if (res.data.error_code == 3) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: '新用户名不能与原来一致！',
              success: function (res) { }
            })
          }
          else if (res.data.error_code == 4) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: '数据保存失败！',
              success: function (res) { }
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
            getApp().globalData.user = res.data.data
            console.log(getApp().globalData.user)
            wx.showModal({
              title: '恭喜',
              content: '修改成功！',
              showCancel: false,
              success(res) { },
              complete: function (res) {
                wx.reLaunch({
                  url: '/pages/me/me',
                })
              }
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
    }
  },

  //修改密码的函数
  modifypassword: function (e) {
    var that = this
    if (that.data.password == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入原密码！',
        success: function (res) { }
      })
    }
    else if (that.data.newpassword == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入新密码！',
        success: function (res) { }
      })
    }else {
      console.log('success')
      wx.request({
        url: getApp().globalData.server + '/srclib/index.php/Home/User/modify_password',
        data: {
          password: that.data.password,
          newpassword: that.data.newpassword,
          userid: that.data.user.userid
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
          } else if (res.data.error_code == 2) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: '指定记录不存在',
              success: function (res) { }
            })
          }
          else if (res.data.error_code == 3) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: '新密码不能与原来一致！',
              success: function (res) { }
            })
          }
          else if (res.data.error_code == 4) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: '密码错误，请重试！',
              success: function (res) { }
            })
          }
          else if (res.data.error_code == 5) {
            wx.showModal({
              title: '提示！',
              showCancel: false,
              content: '数据保存失败！',
              success: function (res) { }
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
            getApp().globalData.user = res.data.data
            console.log(getApp().globalData.user)
            wx.showModal({
              title: '恭喜',
              content: '修改成功，请重新登录！',
              showCancel: false,
              success(res) { },
              complete: function (res) {
                getApp().globalData.fromsettings = true
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              }
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //每次加载本页面判断登录状态
    var that = this
    that.setData({
      haslogin: app.globalData.haslogin,
      newusername: '',
      password: '',
      newpassword: ''
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