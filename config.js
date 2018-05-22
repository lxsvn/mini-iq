/**
 * 小程序配置文件
 */
 
var hostWS = 'wss://mi-iq-socket-dev.houputech.com/iq'  //开发环境

var appId ='填写您申请的appId'

var config = {

    service: {
        appId,
        hostWS
    },
    apiCodes:{
        pushHandShake: '10000000',
        postLogin: '10000000',
        postLogin: '10000000',
    }
}


module.exports = config