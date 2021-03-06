'use strict';
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520690141955_3949';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: 'noto_db',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: 'root',
    timezone: '+08:00',
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*', 'http://127.0.0.1:3000'],
  };

  config.cors = {
    origin: 'http://127.0.0.1:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  return config;
};
