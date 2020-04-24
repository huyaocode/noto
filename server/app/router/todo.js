'use strict';

module.exports = app => {
  app.post('/api/todo', 'todo.create')
  app.del('/api/todo/:id', 'todo.destroy');
  app.get('/api/todos', 'todo.get');
  app.put('/api/todo/:id', 'todo.update');
};
