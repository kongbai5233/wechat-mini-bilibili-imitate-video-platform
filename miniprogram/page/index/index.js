// page/index/index.js
let db = wx.cloud.database()
let swiper_item = db.collection('Swiper_item')
let video_mp4 = db.collection('video_mp4')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    swiper_item:[],
    content:[]
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
    swiper_item.get().then(res=>{

      this.setData({
        swiper_item:res.data
      })
    })
    video_mp4.get().then(res=>{
    
     this.setData({
        content:res.data
     })
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