//index.js
const app = getApp();

Page({
	data:
  {
		
	},

	onLoad(opt) 
  {
		
	},

	onShow() 
  {
    //当信道连接或者重连了时，关闭已连接的信道
		this.closeTunnel()
	},

	gotoFighting() 
  {
		wx.navigateTo({
			url: '../fighting_sort/fighting_sort'
		})
	},

	gotoFriends() 
  {
		wx.navigateTo({
			url: '../friends_sort/friends_sort'
		})
	},

  //前往排行榜页面
  gotoLeaderboard: function()
  {
    wx.navigateTo({
      url: '../leaderboard/leaderboard'
    })
  },

	closeTunnel() 
  {
		//当信道连接或者重连了时，关闭已连接的信道
		if (app.appData.tunnelStatus == 'connect' ||
        app.appData.tunnelStatus == 'reconnect') 
    {
			app.tunnel.close();
		}
	}
})
