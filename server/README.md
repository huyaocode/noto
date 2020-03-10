# noto-server

### 项目运行

``` bash
修改config.default.js中sequelize的配置
mysql的账号密码改为自己的
mysql 中 authorities 表添加一个角色

npm run dev

npm test

npm run test-local
```

### 参考文档

**参考项目地址**：[https://github.com/k-water/egg-blog](https://github.com/k-water/egg-blog)(喜欢的请点个star^_^)

[Egg官方文档](eggjs.org/zh-cn/intro/)

[Sequelize(中文)](https://github.com/demopark/sequelize-docs-Zh-CN)

### 技术选型

后台框架：Egg
数据库：Mysql
插件：egg-sequelize

### 数据库设计

实体有
> 
* blogs
* comments
* users
* catalogs
* authorities(用户角色)
