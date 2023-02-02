<template>
  <div class="typhoonDefence">
    <DpHeader :active-on="2">
      <span>台风防御</span>
    </DpHeader>
    <div class="typhoone-chart">
      <div class="typhoone-left">
        <div class="left-content">
            <div class="title">
                <img src="../../assets/images/typhoon/left_title.png" alt="">
                <span>重点防御部位</span>
            </div>
            <div class="main">
                <div  v-for="(item, index) in typhoonMessages" class="mainBlock"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    <div class="caption">{{item.title}}:</div>
                    <p class="substance">{{item.content}};</p>
                </div>
            </div>
        </div>
      </div>
      <div class="typhoone-right">
        <div class="right-content">
            <div class="search">
              <el-autocomplete
                class="inline-input"
                v-model="message"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="true"
                placeholder="请输入关键字"
                @select="handleSelect"
                clearable
                @clear="blurForBug()"
                >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                <!-- <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="delMessage"></i> -->
              </el-autocomplete>
            </div>
            
            <div class="main">
              <el-tree
                class="filter-tree"
                :load="loadNode"
                lazy
                :props="defaultProps"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                ref="tree">
              </el-tree>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DpHeader from "@/components/content/DpHeader";
import { getTyphoonDefenceTitle, getTyphoonDefenceVideoList, getTyphoonDefenceVideoListByName } from "@/api/dumpTruck";

export default {
  name: "service",
  data() {
    return {
        name: 'typhoonDefence',
        typhoonMessages: [],
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        count: 1,
        defaultProps: {
          label: 'name',
          children: 'zones'
        },
        message: ''
    };
  },
  inject: ['mapPageVm'],
  components: {
      DpHeader
  },
  mounted() {
    this.getTyphoonList();
  },
  methods: {
    async getTyphoonList() {
        const res = await getTyphoonDefenceTitle();
        console.log('getlist', res);
        this.typhoonMessages = res.data.data;
    },
    filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
        console.log([data]);
        console.log(this.mapPageVm)
        if (data.videoCode === null) {
          return
        }
        this.mapPageVm.removePoints('cameraVideo')
        this.mapPageVm.renderPoints('cameraVideo', [data])
    },
    async loadNode(node, resolve) {
        if (node.level === 0) {
          var res = await getTyphoonDefenceVideoList({id: 'root'})
          console.log(res.data.data)
          var arr = [];
          res.data.data.forEach(item => {
            arr.push({
              name: item.name,
              id: item.id,
              pointCode: item.videoCode,
              videoCode: item.videoCode,
              pointType: 'cameraVideo',
              pointName: item.name,
              latitude: item.lat,
              longitude: item.lon
            })
          })
          return resolve(arr);
        }else if (node.level >0 && node.data.videoCode == null) {
          var res = await getTyphoonDefenceVideoList({id: node.data.id})
          console.log(res.data.data)
          var arr = [];
          res.data.data.forEach(item => {
            arr.push({
              name: item.name,
              id: item.id,
              pointCode: item.videoCode,
              videoCode: item.videoCode,
              pointType: 'cameraVideo',
              pointName: item.name,
              latitude: item.lat,
              longitude: item.lon
            })
          })
          return resolve(arr);
        }else {
          return resolve([])
        }
    },
    async querySearch(queryString, cb) {
        var allData =  await getTyphoonDefenceVideoListByName({name: queryString})
        allData.data.data.forEach(item => {
          item.value = item.name;
        })
        cb(allData.data.data);
    },
    handleSelect(item) {
        item.pointCode = item.videoCode;
        item.pointType = 'cameraVideo';
        item.pointName = item.name;
        item.latitude =  item.lat;
        item.longitude =  item.lon;
        this.mapPageVm.removePoints('cameraVideo')
        this.mapPageVm.renderPoints('cameraVideo', [item])
    },
    blurForBug() {
      // this.message = '';
      document.activeElement.blur()
    }
  }
};
</script>

<style lang="scss">
.el-autocomplete-suggestion{
  li {
    color: #ffffff;
    &:hover {
      background-color: #0f2034;
    }
  }
}
</style>

<style lang="scss" scoped>
.typhoonDefence {
  position: absolute;
  height: 100%;
  width: 100%;
}
@media screen and (max-width:1400px){
  .typhoonDefence{
    height: 100%;
  }
}

.typhoone-chart {
    height: calc(100% - 70px);
    display: flex;
    justify-content: space-between;
    padding: 0 26px;
    
}

.typhoone-left {
    width: 360px;
    pointer-events: auto;
    position: relative;
    .left-content {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 70%;
        background: url('../../assets/images/typhoon/left_frame.png') no-repeat;
        background-size: 100% 100%;
        padding: 15px;
        .title {
            width: 100%;
            height: 50px;
            position: relative;
            img {
                width: 100%;
                height: 50px;
            }
            span {
                position: absolute;
                left: 60px;
                top: 8px;
                color: #00c1a0;
                font-weight: bolder;
                font-size: 20px;
            }
        }
        .main {
            height: calc(100% - 50px);
            position: relative;
            overflow-y: auto;
            padding: 10px 0;
            .mainBlock {
                font-size: 20px;
                margin: 10px 0;
                div {
                    color: #00c1a0;
                    font-weight: bolder;
                }
                p {
                    color: #ffffff;
                    word-wrap: break-word;
                    word-break: normal;
                }
            }
        }
    }
    .today-flow {
        justify-content: space-between;
        margin-bottom: 30px;
    }

    .row-bg {
        flex-direction: column;
        height: 100%;
    }
}

.typhoone-right {
    width: 360px;
    pointer-events: auto;
    .right-content {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 70%;
        background: url('../../assets/images/typhoon/left_frame.png') no-repeat;
        background-size: 100% 100%;
        padding: 30px;
        .search {
          height: 80px;
          width: 100%;
          display: flex;
          align-items: center;
          ::v-deep .inline-input{
            width: 100%;
            .el-input {
              margin: 10px 0;
              .el-input__inner {
                  background-color: #5b9495;
                  border: 1px solid #00dfb2;
                  color: #ffffff;
                  border-radius: 20px;
              }
            }
          }
        }
        .main {
          width: 100%;
          height: calc(100% - 80px);
          overflow-y: auto;
          ::v-deep .el-tree {
            background-color: #0c1d31;
            .el-tree-node
            {
              &:focus {
                &>.el-tree-node__content {
                  background-color: #000000;
                }
              }
              &.is-current {
                & > .el-tree-node__content{
                 background-color: #000000;
                }
              }
            }
            .el-tree-node__label {
              color: #ffffff;
            }
            .el-tree-node__content{
              &:hover {
                background-color: #000000;
              }
            }
          }
        }
        
    }
    .row-bg {
        flex-direction: column;
        height: 100%;
    }
}

</style>