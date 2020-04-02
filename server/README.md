# noto-server

### 项目结构
```
app
├─model  定义数据库模型
├─router  定义路由，讲请求转到 controller
├─controller  接收参数，调用 service 
└─service  做业务逻辑，生成请求的相应结果
```

### 项目运行

``` bash
修改config.default.js中sequelize的配置
mysql的账号密码改为自己的

npm run dev

npm test

npm run test-local
```

### 参考文档

**参考项目地址**：[https://github.com/k-water/egg-diary](https://github.com/k-water/egg-diary)(喜欢的请点个star^_^)

[Egg官方文档](eggjs.org/zh-cn/intro/)

[Sequelize(中文)](https://github.com/demopark/sequelize-docs-Zh-CN)

### 技术选型

后台框架：Egg
数据库：Mysql
插件：egg-sequelize
