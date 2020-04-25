'use strict';

module.exports = app => {
  const {
    STRING,
  } = app.Sequelize;

  const I18n = app.model.define('i18n', {
    id: {
      type: STRING,
      primaryKey: true,
    },
    zh: STRING,
    en: STRING
  },{
    'timestamps': false,
  });
  return I18n;
};
