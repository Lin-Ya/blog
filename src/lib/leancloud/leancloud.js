import AV from 'leancloud-storage'

//设置app的id和key

var APP_ID = 'IopWttzagjnQOOwyPn8VX1eW-gzGzoHsz';
var APP_KEY = 'zmKD3VKkSV9Kr1Q2Dffbu8kW';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV;