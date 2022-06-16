<template>
  <div class="sub-title">
    <h2 @click="handleTitle(0)" class="title" :class="titleIndex === 0 ? 'title-sel' : ''">{{title}}</h2>
    <h2
      @click="handleTitle(1)"
      class="title"
      :class="titleIndex === 1 ? 'title-sel' : ''"
    >{{subTitle}}</h2>
    <div class="right" v-if="isShowRight" >
      <template v-if="onType === 1">
        <el-button-group>
          <el-button
            size="mini"
            @click="handleComeInOut(0)"
            class="btn-mini"
            :class="btnIndexSel === 0 && 'btn-mini-sel'"
            type="primary"
          >驶入</el-button>
          <el-button
            size="mini"
            @click="handleComeInOut(1)"
            class="btn-mini"
            :class="btnIndexSel === 1 && 'btn-mini-sel'"
            type="primary"
          >驶出</el-button>
        </el-button-group>
      </template>
      <template v-else>
        <el-select
          class="dp-select"
          popper-class="dp-select-popper"
          v-model="initValueChild"
          @change="handleChange"
          placeholder="请选择"
        >
          <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </template>
    </div>
    <img class="title-upper-line" src="@/assets/images/flow.png" alt />
  </div>
</template>
<script>
export default {
  name: "subTitle",
  props: {
    isShowRight: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: () => "今日车流量",
    },
    selTitleIndex: {
      type: Number,
      default: 0,
    },
    subTitle: {
      type: String,
      default: "",
    },
    onType: {
      type: Number,
      default: 1,
    },
    option: {
      type: Array,
      default: () => [],
    },
    timeType: {
      type: String,
      default: "hour",
    },
    initValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      btnIndexSel: 0,
      titleIndex: this.selTitleIndex,
      initValueChild: "",
    };
  },
  watch: {
    initValue(val) {
      this.initValueChild = val;
      this.$emit("onRoadChange", { roadName: val });
    },
    option: {
      handler(val) {
        if (val.length > 0) {
          this.initValueChild = this.initValue;
          this.$emit("onRoadChange", { roadName: this.initValueChild });
        }
      },
    },
  },
  created() {
    this.initValueChild = this.initValue;
  },
  methods: {
    handleComeInOut(index) {
      this.btnIndexSel = index;
      this.$emit("onComeInOut", { index });
    },
    handleChange(val) {
      this.$emit("onRoadChange", { roadName: val });
    },
    handleTitle(index) {
      this.titleIndex = index;
      this.$emit("onToggle", { index });
    },
    showSandBeach() {
      if (this.carType === "sandBeach") {
        return (this.isShowRight = true);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sub-title {
  position: relative;
  font-size: 16px;
  padding-bottom: 10px;
  overflow: hidden;
  &:after {
    content: "";
    height: 0;
    clear: both;
  }
  .sub-title-wrap {
    float: left;
  }
  .title {
    line-height: 26px;
    float: left;
    font-weight: normal;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    vertical-align: baseline;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title:nth-child(1) {
    margin-right: 18px;
  }
  .title-sel {
    line-height: 20px;
    font-size: 16px;
    color: #fff;
    width: auto;
  }
  .title-upper-line {
    width: 263px;
    height: 4px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
    .btn-mini {
      background: rgba(47, 234, 156, 0.06);
      border-radius: 1px 0px 0px 1px;
      width: 42px;
      height: 15px;
      line-height: 15px;
      font-size: 10px;
      border: none;
      padding: 0;
      span {
        height: 15px;
        line-height: 15px;
      }
    }
    .btn-mini--opacity {
      background: rgba(47, 234, 156, 0.06);
    }
    .btn-mini-sel {
      background: rgba(0, 242, 152, 1);
    }
  }
}
</style>