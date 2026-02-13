// page/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addList: [],
    num:0
  },
  goToplay:function(e){
    let _id=e.mark._id;
    wx.navigateTo({
      url: '../play/play?_id='+_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let info = wx.getStorageInfoSync() //读取本地缓存信息
    let keys = info.keys //获取全部key信息
    let num = keys.length //获取收藏数量
 
    let myList = []


    for (var i = 0; i < num; i++) {
      let t=keys[i].split('_');
      console.log(t)
      if(t[1]=='add'){
          let obj = wx.getStorageSync(keys[i])
          myList.push(obj) //将信息添加到数组中
      }
    }
    this.setData({
      addList: myList,
      num: num
    })

    wx.setNavigationBarTitle({
      title:"我的点赞"
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