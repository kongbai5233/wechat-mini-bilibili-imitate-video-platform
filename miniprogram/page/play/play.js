// page/play/play.js
let db = wx.cloud.database()
let video_mp4 = db.collection('video_mp4')
let Danmu = db.collection('Danmu')
const app = getApp()

function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd: false,
    islove: false,
    move: {},
    time: 0,
    content: [],
    danmuList: []
  },
  getLength: function (e) {
    let time1 = parseInt(e.detail.currentTime);
    this.setData({
      time: time1
    })
  },
  inputvalue: "",
  getDanmu: function (e) {
    this.inputvalue = e.detail.value;

  },
  sendDanmu: function (e) {
    if (app.Data.isLogin == "") {
      wx.showToast({
        title: '请先登录后再发送弹幕！！',
        icon: "error",
        mask:true
      })
      return;
    }
    let a = this.inputvalue;
    let b = getRandomColor();
    this.videoContext.sendDanmu({
      text: a,
      color: b
    })
    Danmu.add({
      data: {
        color: b,
        text: a,
        time: this.data.time
      }
    })  .then(res => {
    // console.log(res)
  })
  },

  Good: function (e) {
    if (app.Data.isLogin == "") {
      wx.showToast({
        title: '请先登录后再点赞！！',
        icon: "error"
      })
      return;
    }
    let move = this.data.move; //获取当前视频
    console.log(move)
    let key = move._id + "_add";
    wx.setStorageSync(key, move); //添加到本地缓存
    this.setData({
      isAdd: true
    }); //更新按钮显示
  },
  NOGood: function (e) {
    let move = this.data.move; //获取当前视频
    let key = move._id + "_add";
    wx.removeStorageSync(key); //从本地缓存删除
    this.setData({
      isAdd: false
    }); //更新按钮显示
  },


  Like: function (e) {
    if (app.Data.isLogin == "") {
      wx.showToast({
        title: '请先登录后再收藏！！',
        icon: "error"
      })
      return;
    }
    let move = this.data.move; //获取当前视频
    let key = move._id + "_love";
    wx.setStorageSync(key, move); //添加到本地缓存
    this.setData({
      islove: true
    }); //更新按钮显示
  },
  NOLike: function (e) {

    let move = this.data.move; //获取当前新闻
    let key = move._id + "_love";
    wx.removeStorageSync(key); //从本地缓存删除
    this.setData({
      islove: false
    }); //更新按钮显示
  },

  Search:function(){
    wx.showToast({
      title: '正在施工中！！！',
      image:"../../images/complete.png",
      mask:"true"
    })
  }
,
  watchMove:function(e){
   
    let _id=e.mark._id; 
   wx.navigateTo({
     url: '../play/play?_id='+_id,
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    let id = options._id;
    console.log(id)
    video_mp4.limit(5).get().then(res => {
      this.setData({
        content: res.data
      })

    })

    Danmu.get().then(res => {
      this.setData({
        danmuList: res.data
      })
    })
//查询点赞
    let key = id + "_add";
    //检查当前新闻是否在收藏夹中
    var move = wx.getStorageSync(key)
    //已存在
    if (move != ''&&app.Data.isLogin!="") {
      this.setData({
        isAdd: true,
        move: move
      })
    }
    //不存在
    else {
      video_mp4.where({
        _id: id
      }).get().then(res => {
        this.setData({
          move: res.data[0]
        })
      })
      this.setData({
        isAdd: false
      })
    }

    //查询收藏
     key = id + "_love";
    //检查当前新闻是否在收藏夹中
     move = wx.getStorageSync(key)
    //已存在
    if (move != ''&&app.Data.isLogin!="") {
      this.setData({
        islove: true,
      })
    }
    //不存在
    else {
      this.setData({
        islove: false
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
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