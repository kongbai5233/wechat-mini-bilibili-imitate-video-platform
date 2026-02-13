
const QQMapWX=require("../../libs/qqmap-wx-jssdk.js")
 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scale:18,
    longitude:0,
    latitude:0,
    markers:[]
  },
  mapCtx:null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getLocation({
        type:'gcj02',
            success:res=>{
                this.setData({
                    longitude:res.longitude,
                    latitude:res.latitude
                })
            }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.mapCtx=wx.createMapContext('myMap')
  },

  bannerTap:function(){
      wx.navigateTo({
        url: '/pages/coupon/coupon',
      })
  },

 
  getFood: function (longitude, latitude) {
    // 调用接口
    var qqmapsdk=new QQMapWX({
        key:'VBABZ-L3KWJ-LY7FY-XOPUZ-DR74V-2SFJS'
    })
    console.log(qqmapsdk)
    qqmapsdk.search({
        keyword: '游戏',
        location: {
          longitude: longitude,
          latitude: latitude
        },
        success: res => {
          var markers = []
          for (let i in res.data) {
            markers.push({
              iconPath: '../../images/find.png',
              id: markers.length,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              width: 30,
              height: 30
            })
          }
          markers.push({
            iconPath: '../../images/center.png',
            id: res.data.length,
            latitude: latitude,
            longitude: longitude,
            width: 15,
            height: 40
          })
          this.setData({
            markers
          })
        }
      })
  },

  regionChange:function(e){
    this.mapCtx=wx.createMapContext('myMap')
   // console.log(this.mapCtx)
    if(e.type==="end"){
       
        this.mapCtx.getCenterLocation({
            success:res=>{
                this.getFood(res.longitude,res.latitude)
             //   console.log(res)
            }
        })
    }
  },

  controlTap:function(e){
    this.mapCtx.moveToLocation()
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