'use strict';

module.exports = app => {
  app.get('/api/diary', 'diary.index');
  app.post('/api/diary', 'diary.create');
  app.get('/api/diary/:id', 'diary.find');
  app.get('/api/diary/:id/edit', 'diary.edit');
  app.get('/api/tags', 'diary.tags');
  app.del('/api/users/:user_id/diary/:id', 'diary.destroy');
  app.put('/api/users/:user_id/diary/:id', 'diary.update');
  app.get('/api/archive', 'diary.archive');
};
