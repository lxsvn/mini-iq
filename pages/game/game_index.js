// pages/game_centre/game_centre.js

const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : '',
  },

  /**
   * 开始游戏
   */
  playGame:function(){
    wx.navigateTo({
      url: '../game/game_room',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})