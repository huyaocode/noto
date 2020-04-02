'use strict';

module.exports = app => {
  const {
    INTEGER,
    DATE,
  } = app.Sequelize;

  const Calendar = app.model.define('calendar', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    time: DATE,
    size: INTEGER
  },{
    'timestamps': false,
  });
  return Calendar;
};