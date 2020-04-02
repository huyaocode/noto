'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    TEXT,
    DATE,
  } = app.Sequelize;

  const Diary = app.model.define('diary', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING,
      validate: {
        min: 2,
        max: 50,
      },
    },
    content: {
      type: TEXT,
    },
    commentSize: {
      type: INTEGER,
      defaultValue: 0,
    },
    created_at: DATE,
  },{
    'timestamps': false,
  });

  Diary.associate = function() {
    app.model.Diary.belongsTo(app.model.User);
    app.model.Diary.hasMany(app.model.Comment, {
      as: 'comment',
    });
  };
  return Diary;
};
