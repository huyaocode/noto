'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
  } = app.Sequelize;

  const I18n = app.model.define('i18n', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: STRING,
    value: STRING
  },{
    'timestamps': false,
  });
  return I18n;
};
