// page/space/space.js
const app = getApp()

let db = wx.cloud.database()
let Article = db.collection('Article')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:"",
    user_icon:"",
    article:[],
    img_bg:"../../images/spacebg.png"
  },
  gotoLogin:function(){
    wx.switchTab({
      url: '../user/user',
    })
  },
  ChangeBg:function(){
    wx.chooseMedia({
      count: 1,
      mediaType:['image'],
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: result => {
        console.log(result);
      
        let res=result.tempFiles[0].tempFilePath;
        this.setData({
          img_bg:res
        })
      }
    })
  },

  goToWrite:function(){
    wx.navigateTo({
      url: '../write/write'
    })
  },
  goTodetail:function(e){
   
    wx.navigateTo({
      url: '../detail/detail?id='+e.mark.id+'&_id='+e.mark._id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Article.get().then(res=>{
      // console.log(res.data)
      let max_id='';
     for(var t in res.data){
        let now_id=res.data[t].id;
        if(max_id<now_id)max_id=now_id;
      }
      this.setData({
        article:res.data
      })
      app.Data.max_id=max_id
    })
    this.setData({
      isLogin:app.Data.isLogin,
      user_icon:app.Data.user_src
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
    this.onLoad();
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