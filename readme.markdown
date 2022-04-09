## 博客系统

### 基本介绍

本项目为博客系统的 FE，主要分为 admin（管理后台），和 web（博客前台）

博客服务端地址为 https://github.com/yq8023/blob-server

项目技术栈为：React + TS，全面采用 hooks 组件

UI 库为 antd-design

### 快速开始

**1. 确保 node 版本为 14 以上**

**2. npm i //安装父包依赖**

**3. npm run bootstrap //安装所有子包依赖**

**4. npm run dev //启动所有子服务**

### 目录介绍

packages/admin 博客系统管理后台，端口 3000

```
    src:
        |-- api             // 请求模块
        |-- common          //通用文件夹
        |-- components      // 组件
        |-- context         // context文件夹
        |-- pages           // 界面入口
        |-- router          // 路由
        |-- static          // 静态文件
        |-- utils           // 工具包
```

packages/web 博客系统前台，端口 4223
