<template>
    <!--视频窗口展示-->
    <div>
        <div :id="palyerId" class="playWnd">
        </div>
        <div v-if="loading" class="loaing-wrap">
            <i class="el-icon-loading"></i>
            <span class="tips">创建视频中，请稍等...</span>
        </div>
    </div>
</template>

<script>
 //声明公用变量
var initCount = 0;
var pubKey = '';
// var oWebControl = null
// 推送消息
function cbIntegrationCallBack(oData) {
    // console.log(oData,'oData')
    // showCBInfo(JSON.stringify(oData.responseMsg));
}
import { hankaiAppInfo } from '@/config/config'
import { generateCode } from '@/utils/util'

export default {
    props: {
        cameraIndexCode: {
            type: String,
            default: ''
        },
        width: {
            type: Number,
            default: 800
        },
        height: {
            type: Number,
            default: 480
        },
        layout: {
            type: String,
            default: '1x1'
        },
        index: {
            type: Number,
            default: 0
        },
        showToolbar: {
            type: Number,
            default: 1
        }
    },
    data(){
        return {
            _width:0,
            _height: 0,
            loading: false,
            palyerId: '',
            oWebControl: null
        }
    },
    created(){
        this._width = this.width
        this._height = this.height
        this.palyerId = `${generateCode(10)}_haikanPlayerId`
    },
    mounted(){
        this.initPlugin();
        // 监听resize事件，使插件窗口尺寸跟随DIV窗口变化
        $(window).resize(() => { 
            if (this.oWebControl != null) {
                // var oDivRect = $(`#${this.palyerId}`).get(0).getBoundingClientRect()
                // console.log(oDivRect,'oDivRect')
                // console.log($(`#${this.palyerId}`).get(0),'dom')
                // this._width = oDivRect.width
                // this._height = oDivRect.height
                this.setWndCover();
                this.oWebControl.JS_Resize(this._width, this._height);
            }
        });
        
        // 监听滚动条scroll事件，使插件窗口跟随浏览器滚动而移动
        $(window).scroll(() => {
            if (this.oWebControl != null) {
                this.setWndCover();
                this.oWebControl.JS_Resize(this._width, this._height);
            }
        });
    },
    methods: {
        // 创建播放实例
        initPlugin () {
            let _this = this
            _this.loading = true
            this.oWebControl = new WebControl({
                szPluginContainer: _this.palyerId,                       // 指定容器id
                iServicePortStart: 15900,                           // 指定起止端口号，建议使用该值
                iServicePortEnd: 15909,                             
                szClassId:"23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",   // 用于IE10使用ActiveX的clsid
                cbConnectSuccess: function () {     
                     _this.loading = false
                    console.log(_this.palyerId,'WebControl实例成功')      // 创建WebControl实例成功											
                    let promiseOweb = _this.oWebControl.JS_StartService("window", {         // WebControl实例创建成功后需要启动服务   不能并行执行该方法，只能串行执行
                        dllPath: "./VideoPluginConnect.dll"         // 值"./VideoPluginConnect.dll"写死 
                    }).then(function () {                           // 启动插件服务成功
                        _this.oWebControl.JS_SetWindowControlCallback({   // 设置消息回调
                            cbIntegrationCallBack: cbIntegrationCallBack
                        });
                        console.log('启动成功')
                        _this.oWebControl.JS_CreateWnd(_this.palyerId, _this._width, _this._height).then(() => { //JS_CreateWnd创建视频播放窗口，宽高可设定
                            console.log('窗口创建成功')
                            _this.init();  // 创建播放实例成功后初始化
                        });
                    }, function () { // 启动插件服务失败
                        console.log(_this.palyerId,'启动失败')
                    });
                },
                cbConnectError: function () { // 创建WebControl实例失败
                    console.log('创建WebControl实例失败')                								
                    _this.oWebControl = null;
                    $(`#${_this.palyerId}`).html("插件未启动，正在尝试启动，请稍候...");
                    WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
                    initCount ++;
                    if (initCount < 3) {                             
                        setTimeout(function () {
                            _this.initPlugin();
                        }, 3000)
                    } else {
                        $(`#${_this.palyerId}`).html("插件启动失败，请检查插件是否安装！");
                    }
                },
                cbConnectClose: function (bNormalClose) {            
                    // 异常断开：bNormalClose = false
                    // JS_Disconnect正常断开：bNormalClose = true	
                    console.log("cbConnectClose");
                    _this.oWebControl = null;
                }
            });
        },
        // 设置窗口控制回调
        setCallbacks() {
            this.oWebControl.JS_SetWindowControlCallback({
                cbIntegrationCallBack: cbIntegrationCallBack
            });
        },
        init(){
            this.getPubKey(() => {
                
                ////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////		
                var appkey = hankaiAppInfo.appKey;                           //综合安防管理平台提供的appkey，必填
                var secret = this.setEncrypt(hankaiAppInfo.appSecret);   //综合安防管理平台提供的secret，必填
                // var ip = "10.19.132.75";                           //综合安防管理平台IP地址，必填
                var ip = hankaiAppInfo.ip;                           //综合安防管理平台IP地址，必填
                var playMode = 0;                                  //初始播放模式：0-预览，1-回放
                // var port = 443;                                    //综合安防管理平台端口，若启用HTTPS协议，默认443
                var port = hankaiAppInfo.port;                                    //综合安防管理平台端口，若启用HTTPS协议，默认443
                var snapDir = "D:\\SnapDir";                       //抓图存储路径
                var videoDir = "D:\\VideoDir";                     //紧急录像或录像剪辑存储路径
                var layout = this.layout;                                //playMode指定模式的布局
                var enableHTTPS = 1;                               //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
                var encryptedFields = 'secret';					   //加密字段，默认加密领域为secret
                var showToolbar = this.showToolbar;                               //是否显示工具栏，0-不显示，非0-显示
                var showSmart = 1;                                 //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
                var buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";  //自定义工具条按钮
                ////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////

                this.oWebControl.JS_RequestInterface({
                    funcName: "init",
                    argument: JSON.stringify({
                        appkey: appkey,                            //API网关提供的appkey
                        secret: secret,                            //API网关提供的secret
                        ip: ip,                                    //API网关IP地址
                        playMode: playMode,                        //播放模式（决定显示预览还是回放界面）
                        port: port,                                //端口
                        snapDir: snapDir,                          //抓图存储路径
                        videoDir: videoDir,                        //紧急录像或录像剪辑存储路径
                        layout: layout,                            //布局
                        enableHTTPS: enableHTTPS,                  //是否启用HTTPS协议
                        encryptedFields: encryptedFields,          //加密字段
                        showToolbar: showToolbar,                  //是否显示工具栏
                        showSmart: showSmart,                      //是否显示智能信息
                        buttonIDs: buttonIDs                       //自定义工具条按钮
                    })
                }).then((oData) => {
                    console.log('init video')
                    this.resetWidthHeight()
                    setTimeout(() => {
                        this.oWebControl.JS_Resize(this._width, this._height);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
                        this.cameraIndexCode && this.startPreview(this.cameraIndexCode)
                    }, 50);
                });
            });
        },
        //获取公钥
        getPubKey (callback) {
            this.oWebControl.JS_RequestInterface({
                funcName: "getRSAPubKey",
                argument: JSON.stringify({
                    keyLength: 1024
                })
            }).then(function (oData) {
                if (oData.responseMsg.data) {
                    pubKey = oData.responseMsg.data;
                    callback()
                }
            })
        },
        //RSA加密
        setEncrypt(value) {
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(pubKey);
            return encrypt.encrypt(value);
        },
        // 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
        setWndCover() {
            var iWidth = $(window).width();
            var iHeight = $(window).height();
            var oDivRect = $(`#${this.palyerId}`).get(0).getBoundingClientRect();
            let {width, height} = oDivRect
            this._width =  width 
            this._height = height
            var iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left): 0;
            var iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top): 0;
            var iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
            var iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;

            // this.resetWidthHeight()
            iCoverLeft = (iCoverLeft > this._width) ? this._width : iCoverLeft;
            iCoverTop = (iCoverTop > this._height) ? this._height : iCoverTop;
            iCoverRight = (iCoverRight > this._width) ? this._width : iCoverRight;
            iCoverBottom = (iCoverBottom > this._height) ? this._height : iCoverBottom;
            this.oWebControl.JS_RepairPartWindow(0, 0, this._width+1, this._height);    // 多1个像素点防止还原后边界缺失一个像素条
            if (iCoverLeft != 0) {
                this.oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, this._height);
            }
            if (iCoverTop != 0) {
                this.oWebControl.JS_CuttingPartWindow(0, 0, this._width+1, iCoverTop);    // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
            }
            if (iCoverRight != 0) {
                this.oWebControl.JS_CuttingPartWindow(this._width - iCoverRight, 0, iCoverRight, this._height);
            }
            if (iCoverBottom != 0) {
                this.oWebControl.JS_CuttingPartWindow(0, this._height - iCoverBottom, this._width, iCoverBottom);
            }
        },
        startPreview(cameraIndexCode){
            // var cameraIndexCode  = $("#cameraIndexCode").val();     //获取输入的监控点编号值，必填
            var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
            var transMode = 1;                                      //传输协议：0-UDP，1-TCP
            var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用
            var wndId = 1;                                         //播放窗口序号（在2x2以上布局下可指定播放窗口）

            cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
            cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");

            let argumentArr = []
            cameraIndexCode.split(',').forEach((item, index) => {
                argumentArr.push({
                    cameraIndexCode: item,                          //监控点编号
                    streamMode: streamMode,                         //主子码流标识
                    transMode: transMode,                           //传输协议
                    gpuMode: gpuMode,                               //是否开启GPU硬解
                    wndId: index + 1,  
                })
            })
            this.oWebControl.JS_RequestInterface({
                funcName: "startMultiPreviewByCameraIndexCode",
                argument: {
                    list: argumentArr
                }
                // argument: {
                //     cameraIndexCode:cameraIndexCode,                //监控点编号
                //     streamMode: streamMode,                         //主子码流标识
                //     transMode: transMode,                           //传输协议
                //     gpuMode: gpuMode,                               //是否开启GPU硬解
                //     wndId:wndId                                     //可指定播放窗口
                // }
                // JSON.stringify({
                //     cameraIndexCode:cameraIndexCode,                //监控点编号
                //     streamMode: streamMode,                         //主子码流标识
                //     transMode: transMode,                           //传输协议
                //     gpuMode: gpuMode,                               //是否开启GPU硬解
                //     wndId:wndId                                     //可指定播放窗口
                // })
            }).then(res => {
                this.$emit('onSuccess',{...res.responseMsg, index:this.index})
            })
        },
        hideWnd(){
            this.oWebControl && this.oWebControl.JS_HideWnd();// 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题 
        },
        destroyWnd(){
            this.oWebControl && this.oWebControl.JS_DestroyWnd().then(function(){ // this.oWebControl 为 WebControl 的对象
                // 销毁插件窗口成功
            },function(){
            // 销毁插件窗口失败
            });
        },
        disconnectWnd(){
            this.oWebControl && this.oWebControl.JS_Disconnect().then(function(){  // 断开与插件服务连接成功
			}, 
			function() {  // 断开与插件服务连接失败
			});
        },
        resetWidthHeight(){
            var oDivRect = $(`#${this.palyerId}`).get(0).getBoundingClientRect();
            let {width, height} = oDivRect
            this._width = width
            this._height = height ? height : width*0.6
        },
        closeHaikanPlayer(){
            this.hideWnd()
            this.destroyWnd()
            this.disconnectWnd()
        }
    },
    beforeDestroy(){
        console.log(222)
        this.closeHaikanPlayer()
    }
}
</script>

<style lang="scss" scoped>
    .playWnd{
        font-size: 0;
            margin-top:1px;
        img{
        }
    }
    .loaing-wrap{
        display: flex;
        flex-direction: column;
        text-align:center;
        color: #fff;
        padding: 30px;
        font-size: 30px;
        .el-icon-loading{
        }
        .tips{
            margin-top: 5px;
            font-size: 14px;
        }
    }
</style>