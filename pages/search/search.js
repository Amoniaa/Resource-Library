Page({
  data: {
    inputVal: '',
    searchRecord: [],
    searchValue: null,
    index: 0
  },
  /*
   *加载搜索记录
   */
  openHistorySearch: function () {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [],//若无储存则为空
    })
  },
  onLoad: function (options) {
    this.openHistorySearch()
  },

  onShow: function (options) {
    this.openHistorySearch()
  },

  /*
   * 实现搜索功能，在此函数需要请求h后端API
   */
  searchSubmitFn: function (e) {
    var that = this
    var inputVal = e.detail.value.input
    var searchRecord = this.data.searchRecord
    this.setData({
      inputVal:inputVal
    })
    if (inputVal == '') {
      //输入为空时的处理
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '内容不能为空！',
        success: function (res) { }
      })
    }
    else {

    //这里根据搜索方式请求API
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().globalData.server + '/srclib/index.php/Home/Resource/get_resources_by_condition',
      data: {
        condition: that.data.inputVal,
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
      complete: function (res) {
        wx.hideLoading()
      }
    })

    setTimeout(() => {
      wx.hideLoading()
    }, 2000);

      wx.navigateTo({
        url: '../searchresult/searchresult'
      })
      //将搜索值放入历史记录中,只放前十条
      if (searchRecord.length < 10) {
        this.setData({
          searchValue: inputVal
        })
        searchRecord.unshift(
          {
            value: inputVal,
            id: searchRecord.length
          }
        )
      }
      else {
        searchRecord.pop()//删掉旧的时间最早的第一条
        searchRecord.unshift(
          {
            value: inputVal,
            id: searchRecord.length
          }
        )
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', searchRecord)
    }
  },

  /*
   * 实现点击搜索记录填充输入框
   */
  autoinput: function (e) {
    this.setData({
      searchValue: e.currentTarget.dataset.hisitem
    })
  },

  /*
   * 删除搜索记录
   */
  historyDelFn: function () {
    wx.clearStorageSync('searhRecord')
    this.setData({
      searchRecord: []
    })
  },

  /*
   * 清空输入框内容
   */
  cleartext: function () {
    this.setData({
      searchValue: ''
    })
    console.log("clear")
  },
})