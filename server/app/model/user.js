'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, TEXT } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: STRING,
      password: STRING,
      nickname: STRING,
      created_at: DATE,
      avatar: TEXT,
      profile: TEXT,
      authority: INTEGER
    },
    {
      timestamps: false
    }
  );

  User.associate = function() {
    app.model.User.hasMany(app.model.Diary, {
      as: 'diaries'
    });
    app.model.User.hasMany(app.model.Comment, {
      as: 'comments'
    });
    app.model.User.hasMany(app.model.Todo, {
      as: 'todos'
    });
  };

  return User;
};
