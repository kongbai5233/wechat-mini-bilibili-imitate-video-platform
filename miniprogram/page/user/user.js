// page/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: "",
    list: [{
      text: "首页",
      src: "../../images/主页.png "
    }, {
      text: "账户",
      src: "../../images/帐户.png "
    }, {
      text: "点赞",
      src: "../../images/点赞.png  "
    }, {
      text: "收藏",
      src: "../../images/收藏.png "
    }, {
      text: "游戏",
      src: "../../images/游戏.png "
    }, {
      text: "退出",
      src: "../../images/退出.png "
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.setData({
      isLogin: app.Data.isLogin
    })
  },
  noLogin: function () {
    this.setData({
        isLogin: ""
      }),
      app.Data.isLogin = ""
  },
  getfunction: function (e) {
    let op = e.mark.now;
    if (op == 0) {
      wx.switchTab({
        url: '../index/index',
      })
    }else if(op==1){
      wx.navigateTo({
        url: '../about_me/about_me',
      })
    }else if(op==2){
      wx.navigateTo({
        url: '../add/add',
      })
    }else if(op==3){
      wx.navigateTo({
        url: '../love/love',
      })
    }else if(op==4){
      wx.navigateTo({
        url: '../game/game',
      })
    } else if (op == 5) {
      this.noLogin();
    } else {
      wx.showToast({
        title: '未完待续',
        icon: "error"
      })
    }
  },
  getMyInfo: function (e) {
    var that = this

    wx.showModal({
      title: '温馨提示',
      content: '亲，授权微信登录后才能正常使用小程序功能',
      success(res) {
       // console.log(res)
        //如果用户点击了确定按钮
        if (res.confirm) {
          wx.getUserProfile({
              desc: '用于完善会员资料',
              success: (res) => {
           //     console.log(res),
                  that.setData({
                    isLogin: "true", //确认登陆状态
                    src: res.userInfo.avatarUrl, //更新图片来源
                    nickName: res.userInfo.nickName //更新昵称
                  });
                  app.Data.isLogin = 1;
                  app.Data.user_src = res.userInfo.avatarUrl;
                  app.Data.nickName = res.userInfo.nickName
              }
            })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})