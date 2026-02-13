let db = wx.cloud.database()
let Article = db.collection('Article')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //临时新闻数据
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    // console.log(options);
    //获取携带的新闻id编号
    let id = options.id
    let _id = options._id
    let write=""
    //检查当前新闻是否在收藏夹中
    let key=options._id+"_love"
    var article = wx.getStorageSync(key)

    //已存在
    if (article != '') {
      this.setData({
        isAdd: true,
        article: article
      })
    }
    //不存在
    else {
      
      this.setData({
        isAdd: false
      })
      Article.where({
        _id: _id
      }).get().then(res => {
        
        this.setData({
          article: res.data[0],
         
        })
        write=res.data[0].write
        console.log(write)

        if (write == app.Data.nickName) {
          this.setData({
            my_art : "true"
          })
        }
      })
    }
   
    
  },

  //添加到收藏夹
  addFavorites: function (options) {
    let article = this.data.article; //获取当前新闻
    let key=article._id+"_love"
    wx.setStorageSync(key, article); //添加到本地缓存
    this.setData({
      isAdd: true
    }); //更新按钮显示
  },
  //取消收藏
  cancelFavorites: function () {
    let article = this.data.article; //获取当前新闻
    let key=article._id+"_love"
    wx.removeStorageSync(key); //从本地缓存删除
    this.setData({
      isAdd: false
    }); //更新按钮显示
  },
  removeTap:function(e){
    let remove_id=parseInt(this.options.id)
    
    console.log(remove_id)
    Article.where({
        id:remove_id
    }).remove().then(res=>{
      console.log(res);
      let nu=res.stats.removed;
      if(nu=="1"){
        wx.switchTab({
          url: '../space/space',
        })
      }
    })
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