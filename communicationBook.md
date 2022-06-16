├── dist   发布目录（npm run build 打包后生成）
├── package.json  配置文件
├── package-lock.json    npm依赖版本文件
├── src
│   ├── api     接口定义目录
│   ├── assets    css，图片等静态资源目录
│   ├── components     公共组件目录
│   ├── config      引入UI组件配置目录（按需加载）
│   ├── const   静态下拉框数据
│   ├── mixins  混合机制组件目录
│   ├── mock    模拟数据目录
│   ├── router    路由配置目录
│   ├── store    状态管理目录
│   ├── utils    公共方法目录
│   ├── views  页面路由组件
│   └── main.js  入口文件
└── public 静态资源目录（包含index.html入口页面）
└── node_modules  依赖资源目录（npm install 生成）
├── vue.config.js 项目配置文件（包括代理服务器等）
├── babel.config.js babel配置文件
├── .postcssrc.js postcss配置文件
├── .eslintrc.js eslint配置文件
└── .env.production 生产环境变量
└── .env.development 测试环境变量
└── .browserslistrc 目标浏览器配置表文件
└── README.md  说明文档

### 1.车辆监测模块
        所有图表已联调完毕
        点击图表的详情单页面  接口有问题，后期再沟通
### 2.公交运力保障
        公交站客流预警只有周日有数据，后续需要沟通
        公交车统计  现是静态页面  没有进行前后端联调
        公交车预警排名 前端静态数据 没有进行前后端联调
### 3.道路运行
        是一个链接
### 4.旅游-沙滩
        静态页面构架已完成
### 5.预警界面
        前后端联调完毕
