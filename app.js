//app.js
App({
<<<<<<< HEAD
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
=======
  globalData: {
    hasLogin: false
  },
  // 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
  appData: {
    appId: config.service.appId,
    baseUrl: `${config.service.host}/weapp/`,
    tunnelStatus: 'close',//统一管理唯一的信道连接的状态：connect、close、reconnecting、reconnect、error
    friendsFightingRoom:undefined,//好友对战时创建的唯一房间名,作为好友匹配的标识
  },
  onLaunch(opt) {
    this.appData.opt = opt
    qcloud.setLoginUrl(config.service.loginUrl);  //设置登录地址
    // this.doLogin();
  },
  onShow(opt) {
    this.storeUser_network(opt)//每次打开程序都启动存储用户关系表
  },
  doLogin() { //登录
    let that = this
    util.showBusy('正在登录');
    qcloud.login({
      success(result) {//此处的result竟然不包含openid,所以res取缓存中的数据
        util.showSuccess('登录成功')
        let res = wx.getStorageSync('user_info_F2C224D4-2BCE-4C64-AF9F-A6D872000D1A');
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
      },
      fail(error) {
        util.showModel('登录失败', error);
      }
    });
  },
  pageGetUserInfo(page, openIdReadyCallback) { //在page中获取用户信息
    const userInfo = wx.getStorageSync('user_info_F2C224D4-2BCE-4C64-AF9F-A6D872000D1A')
    if (userInfo) {
      page.setData({
        userInfo,
        openId: userInfo.openId
      })
      this.appData.openId = userInfo.openId
      if (openIdReadyCallback) {
        openIdReadyCallback(userInfo.openId)
      }
    } else {
      this.userInfoReadyCallback = (userInfo) => {  //获取用户信息后的回调函数
        page.setData({  //每个page都会自动存储userInfo和openId
          userInfo,
          openId: userInfo.openId
        })
        if (openIdReadyCallback) {  //如果设置了openid的回调函数，则调用回调
          openIdReadyCallback(userInfo.openId)
        }
      }
    }
  },
  //tunnel:由于一个小程序只能同时连接一个信道而且设计页面跳转后信道对象会销毁问题，所以将其放在app.js中统一管理
  tunnelCreate() {//创建一个新信道，并监听相关数据的变化
    const that = this
    const tunnel = that.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)  //放在app对象下供全局使用
    tunnel.open()
    tunnel.on('connect', () => {//监听信道连接
      console.info("tunnelStatus = 'connect'")
      this.appData.tunnelStatus = 'connect' //改变信道状态为已连接
      if (that.tunnelConnectCallback) {//设置回调
        that.tunnelConnectCallback()
      }
    })
    tunnel.on('close', () => {//监听信道断开
      console.info("tunnelStatus = 'close'")
      this.appData.tunnelStatus = 'close' //改变信道状态为已断开
      if (that.tunnelCloseCallback) {//设置回调
        that.tunnelCloseCallback()
      }
    })
    tunnel.on('reconnecting', () => {//监听信道重新链接
      console.info("tunnelStatus = 'reconnecting'")
      this.appData.tunnelStatus = 'reconnecting' //改变信道状态为重新连接中
      if (that.tunnelReconnectingCallback) {//设置回调
        that.tunnelReconnectingCallback()
      }
    })
    tunnel.on('reconnect', () => {//监听信道重新连接成功
      console.info("tunnelStatus = 'reconnect'")
      console.info('重连后的信道为:' + tunnel.socketUrl.slice(tunnel.socketUrl.indexOf('tunnelId=') + 9, tunnel.socketUrl.indexOf('&')))
      this.appData.tunnelStatus = 'reconnect' //改变信道状态为重新连接成功
      if (that.tunnelReconnectCallback) {//设置回调
        that.tunnelReconnectCallback()
      }
    })
    tunnel.on('error', () => {//监听信道发生错误
      console.info("tunnelStatus = 'error'")
      this.appData.tunnelStatus = 'error' //改变信道状态为发生错误
      util.showSuccess('您已断线，请检查联网')
      wx.navigateBack({
        url: '../entry/entry'
      })
      if (that.tunnelErrorCallback) {//设置回调
        that.tunnelErrorCallback()
>>>>>>> 87d96642a04f98a1f5ad60f3c3220018dc88e647
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})