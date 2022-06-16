
 import  { getbusinNetwork, getbusinDetail  } from '@/api/service'
export default {
  
  methods:{
    async getServiceNetPointList () {//服务网点
      const res = await getbusinNetwork ()
      let data = res.data.data
      data.forEach ((item) =>{
      item.pointType = 'serviceNet',
      item.pointName = item.networkName
      //  delete item.type
      })
      this.serviceNetPointList = data
    },
    async showServiceNetInfo({id}) {
      this.source && this.source.cancel('取消请求')
      this.source = request.CancelToken.source()
      this.beachInfoDialog = true;
      this.infoList = []
      const res = await getbusinDetail(id, this.source.token) 
      if(!res || !res.data.data) return 
      let {address , minutes , networkName, } = res.data.data
      this.infoList.push({
        id:1,
        label: '名称: ',
        value: networkName
      },{
        id:2,
        label:'地址：',
        value: address
      },{
        id:3,
        label:'平均等候时长: ',
        value: minutes
      },{
        id: 4,
        label: '周边视频',
        name: networkName,
        icon: 'el-icon-video-play',
        style: 'width: 45%; border: 1px solid #0ab8eb; float:left;margin:0.04rem 0.04rem 0.02rem 0.045rem;',
        onClick: (item) => {
          this.showAroundVideo(res.data.data,'zbVideo')
        }
      },{
        id: 5,
        label: '行为监测',
        name: networkName ,
        icon: 'el-icon-video-play',
        style: 'width: 45%; border: 1px solid #0ab8eb; float:left;margin:0.04rem 0.04rem 0.02rem 0.045rem;',
        onClick: (item) => {
          this.showAroundVideo(res.data.data,'xwjcVideo')
        }
      }) 
    },
  }
}