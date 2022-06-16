<template>
  <div class="map-dialog">
    <el-dialog
      @close="closebusDialog"
      :visible.sync="value.isShow"
      top="10vh"
      width="52%"
      :append-to-body="true"
      class="map-dialog-container"
    >
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
          >
            {{activity.timestamp}}
            <span class="busNumbers">蔡涌中心客流量</span>
            <div class="busImg">
              <img src="../../assets/images/red.png" />
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { queryDangerDetail } from "@/api/dumpTruck";

export default {
  name: "mapDialog",
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      currentUrl: "",
      name: "",
      pointName: "",
      enterprise: {},
      activities: [
        {
          timestamp: "2018-04-12 20:46",
          content: "支持使用图标",
          size: "large",
          color: "#32FDF6",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#32FDF6",
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large",
          color: "#32FDF6",
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46",
          color: "#32FDF6",
        },
        {
          timestamp: "2018-04-12 20:46",
          content: "支持使用图标",
          size: "large",
          color: "#32FDF6",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#32FDF6",
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large",
          color: "#32FDF6",
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46",
          color: "#32FDF6",
        },
      ],
    };
  },
  methods: {
    closeIframeDialog() {
      // this.dialogVisible = false;
    },
    showPage(url, name) {
      // this.dialogVisible = true;
      this.currentUrl = url;
      this.currentTitle = name;
    },
    closebusDialog() {
      this.$emit("close");
    },
    async queryDangerDetail(name) {
      let data = {
        name: name,
      };
      const res = await queryDangerDetail(data);
      this.enterprise = res.data.data || {};
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val.isShow) {
          this.queryDangerDetail(val.name);
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.map-dialog {
  font-size: 12px;
  pointer-events: auto;
}
.map-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  .map-video {
    width: 100%;
    height: 100%;
    //  object-fit:contain"
  }
}
</style>
<style lang="scss">
.map-dialog-container {
  .el-dialog {
    background: transparent;
  }
  .el-dialog__header {
    font-size: 0;
    background: rgba(15, 75, 99, 1);
    padding-bottom: 20px;
    .el-dialog__title {
      color: #fff;
    }
  }
  .el-dialog__body {
    background: rgba(15, 75, 99, 0.7);
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .mpbox {
    margin: 30px 20px;
    color: #fff;
    text-align: left;
    border: 1px solid #fff;
    border-radius: 10px;
    margin-bottom: 10px;
    .mpTitle {
      font-size: 25px;
      line-height: 50px;
      height: 50px;
      margin-left: 20px;
    }
    .mpCenterBox {
      white-space: pre-wrap;
      font-size: 14px;
      padding: 15px;
      line-height: 40px;
    }
  }
}
.iframe-dialog {
  .el-dialog {
    height: 90%;
    .el-dialog__body {
      height: 100%;
      padding: 20px;
      overflow: scroll;
    }
  }
}
</style>