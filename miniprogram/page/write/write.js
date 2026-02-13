let db = wx.cloud.database()
let Article = db.collection('Article')
// page/write/write.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:"",
    imgsname:"",
    poster:"",
    yun:"",
    article:{
      write:"",
      title:"",
      add_time:"",
      id:"",
      poster:"",
      content:""
    }
  },
  titleInput:function(e){
    let get=e.detail.value;
    this.setData({
      'article.title':get
    })
  },
  contentnput:function(e){
    let get=e.detail.value;
    this.setData({
      'article.content':get
    })
  },
  uploadImg:function(){
    let res,p;
    wx.chooseMedia({
      // 同时选中的图片的数量
      count: 1,
      // 选择媒体为图片
      mediaType:['image'],
      // 图片的格式  原图 
      sizeType: ['original'],
      // 图片的来源  相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result);
        let t=result.tempFiles[0].tempFilePath.split('.');
        t=t[0].split("/");
        t=t[3]
        p=t;
        res=result.tempFiles[0].tempFilePath;
        this.setData({
          imgs:res,
          imgsname:p
        })
      }
    });
           
    
  },
    // 手动删除数据库代码
    // Article.where({
    //   poster:''
    // }).remove().then(res=>{
    //   console.log(res);
    // })
  // console.log(this.data.article)

  giveup:function(){
    var name1=this.data.imgsname;
    var chooseImgs1=this.data.imgs;
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: "article_pic/"+name1,
      // 指定要上传的文件的小程序临时文件路径
      filePath: chooseImgs1,
      // 成功回调
      success: res => {
        console.log('上传成功', res)
        this.setData({
          'article.poster':res.fileID,
           poster:res.fileID
        })
        Article.add({
          data:{
          write:this.data.article.write,
          title:this.data.article.title,
           add_date:this.data.article.add_time,
           id:this.data.article.id,
           poster:res.fileID,
           content:this.data.article.content,
           type:"text"
          }
         }).then(res=>{
           console.log(res);
          if(res.errMsg=="collection.add:ok"){
            wx.switchTab({
              url: '../space/space',
            })
          }
         })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let t=new Date().toLocaleDateString();
    app.Data.max_id++;
   
    this.setData({
      'article.id': app.Data.max_id,
      'article.add_time':t,
      'article.write': app.Data.nickName
    })
    app.Data.max_id++;
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