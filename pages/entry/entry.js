//index.js
const app = getApp();

Page({
	data:
  {
    hasUserInfo: false
	},

	onLoad(opt) 
  {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
	},

  onReady()
  {
    this.getUserMessage();
  },
  
  login: function () 
  {
    var that = this
    wx.login({
      success: function (res) 
      {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        that.update()
      }
    })
  },

  getUserInfo: function () 
  {
    this.getUserMessage();
  },

  getUserMessage() {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    }
    else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          that.update()
        }
      })
    }
  },

	onShow() 
  {
    //当信道连接或者重连了时，关闭已连接的信道
	//	this.closeTunnel()
	},

	gotoFighting() 
  {
		wx.navigateTo({
      url: '../game_centre/game_centre'  
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

