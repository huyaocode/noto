'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    FLOAT
  } = app.Sequelize;

  const Todo = app.model.define('todo', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: STRING,
    type: INTEGER,
    start_at: DATE,
    done_at: DATE
  },{
    'timestamps': false,
  });
  Todo.associate = function() {
    app.model.Todo.belongsTo(app.model.User);
  };
  return Todo;
};
