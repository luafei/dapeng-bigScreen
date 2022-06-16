// import { getWarnginTypeList } from '@/api/dicData'
import store from '@/store'
export default {
    data() {
        return {
            // roadList: [], //道路
            // direactionRoadList: [], //出入口
            // vehicleTypeList: [], //车辆类型字典
            // warningTypeList: []    //车辆报警类型
        }
    },
    created() {
        store.dispatch('GetRaodList', 0)
        store.dispatch('GetDirectionRaodList', 1)
        store.dispatch('GetVehicleTypeList')
    },
    mounted() {
        // this.getWarnginTypeList()
    },
    methods: {

        // async getWarnginTypeList(){

        //     const res = await getWarnginTypeList();
        //     this.warningTypeList = []
        //     res.data.data.forEach(item => {
        //         this.warningTypeList.push({
        //             label: item,
        //             value: item
        //         })
        //     })
        // },
    },
}