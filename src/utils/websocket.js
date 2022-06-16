var websock = null;
var global_callback = null;
var serverPort = '8083';	//webSocket连接端口
 

function getWebIP(){
	var curIP = process.env.VUE_APP_WEBSOCKET_API
	return curIP;
}
 
function initWebSocket(){ //初始化weosocket
    //ws地址
    var wsuri = "ws://" +getWebIP()+ ":" + serverPort + '/ws/asset';
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e){
    	websocketonmessage(e);
    } 
    websock.onclose = function(e){
    	websocketclose(e);
    }
    websock.onopen = function () {
	    websocketOpen();
	}
    
    //连接发生错误的回调方法
	websock.onerror = function () {
		console.log("WebSocket连接发生错误");
	}
}
 
// 实际调用的方法
function sendSock(callback){
	initWebSocket()
    global_callback = callback;
    setTimeout(function () {
	    if (websock.readyState === websock.OPEN) {
	    	//若是ws开启状态
	        // websocketsend()
	    }else if (websock.readyState === websock.CONNECTING) {
	    	// 若是 正在开启状态，则等待1s后重新调用
        	setTimeout(() => {
        		sendSock(callback);
        	}, 1000)
	        
	    }else {
	    	// 若未开启 ，则等待1s后重新调用
	        setTimeout(function () {
	            sendSock(callback);
	        }, 1000);
	    }
    }, 2000);
}
 
//数据接收
function websocketonmessage(e){ 
    global_callback(e.data);
}
 
//数据发送
function websocketsend(){
    websock.send();
}
 
//关闭
function websocketclose(e){  
    console.log("connection closed (" + e.code + ")");
}

function closeSocket(){
	websock.close()
}
 
function websocketOpen(e){
	console.log("连接成功");
}
 
 
export{sendSock, closeSocket}