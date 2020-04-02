'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: STRING,
    created_at: DATE,
  },{
    'timestamps': false,
  });

  Comment.associate = function() {
    app.model.Comment.belongsTo(app.model.User);
    app.model.Comment.belongsTo(app.model.Diary);
  };

  return Comment;
};
