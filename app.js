//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: {},//微信获取的用户信息
    user:{},//后台返回的用户信息
    //server:'http://localhost',
    server:'http://106.53.227.216',
    haslogin: false,
    fromsettings: false,
    result:{},
    category: [
      {
        name: '工学',
        id: '1',
        options: [
          { id: '1', text: '力学类' },
          { id: '2', text: '机械类' },
          { id: '3', text: '计算机类' },
          { id: '4', text: '材料类' },
          { id: '5', text: '能源动力类' },
          { id: '6', text: '电气类' },
          { id: '7', text: '电子信息类' },
          { id: '8', text: '自动化类' },
          { id: '9', text: '仪器类' },
          { id: '10', text: '土木类' },
          { id: '11', text: '地质类' },
          { id: '12', text: '交通运输类' }
        ],
      },
      {
        name: '理学',
         id: '2',
        options: [
          { id: '1', text: '数学类' },
          { id: '2', text: '物理类' },
          { id: '3', text: '化学类' },
          { id: '4', text: '生物类' }
        ],
      },
      {
        name: '文史',
         id: '3',
        options: [
          { id: '1', text: '考古类' },
          { id: '2', text: '新闻类' },
          { id: '3', text: '经济学' },
          { id: '4', text: '会计学' }
        ],
      },
      {
        name: '外语',
         id: '4',
        options: [
          { id: '1', text: 'u校园' },
          { id: '2', text: '课本答案' },
          { id: '3', text: '日语' },
          { id: '4', text: '德语' },
          { id: '5', text: '法语' },
          { id: '6', text: '西班牙语' },
          { id: '7', text: '朝鲜语' },
          { id: '8', text: '其他语种' }
        ],
      },
      {
        name: '医学', 
        id: '5',
        options: [
          { id: '1', text: '人体寄生虫学' },
          { id: '2', text: '局部解剖学' },
          { id: '3', text: '病理学' },
          { id: '4', text: '药理学' },
          { id: '5', text: '生理学' }
        ],
      },
      {
        name: "政治",
         id: '6',
        options: [
          { id: '1', text: '思修' },
          { id: '2', text: '马原' },
          { id: '3', text: '毛概' },
          { id: '4', text: '近代史' }
        ],
      },
      {
        name: '考证',
         id: '7',
        options: [
          { id: '1', text: '英语四级' },
          { id: '2', text: '英语六级' },
          { id: '3', text: '初级会计' },
          { id: '4', text: '中级会计' },
          { id: '5', text: 'CPA' },
          { id: '6', text: 'ACCA' },
          { id: '7', text: '计算机二级' }
        ],
      },
      {
        name: '考研',
         id: '8',
        options: [
          { id: '1', text: '数学' },
          { id: '2', text: '英语' },
          { id: '3', text: '政治' },
          { id: '4', text: '专业课' }
        ],
      },
      {
        name: '其他', 
        id: '9',
        options: [
          { id: '1', text: '电影资源' },
          { id: '2', text: '生活技巧' },
          { id: '3', text: '精彩书籍' },
          { id: '4', text: '传统歌单' }
        ],
      },
    ],
  },
  confirmlogin: function() {
    wx.showModal({
      title: '提示',
      content: '请登录后使用',
      confirmText: "现在登录",
      cancelText: "取消",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../login/login'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})