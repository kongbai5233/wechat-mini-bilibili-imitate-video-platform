// app.js
// user_src:"https://thirdwx.qlogo.cn/mmopen/vi_32/cH3DzK3ZibWicndVat8Gu0EpDAID3wicwODOzNVF4wHg3VAI53hZafnRnuPPhK0kDciaI4ywIqicPZJzC26thAkWwZ14QQfnsAroRULrgtSo9hZc/132",
// nickName:"Kong",
App({
  Data:{
    isLogin:"",
    user_src:"",
    nickName:"",
    max_id:""
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-0gj2ax8j71ce8148',
        traceUser: true,
      });
    }

    this.globalData = {};
  }
});
