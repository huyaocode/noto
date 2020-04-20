'use strict';

module.exports = app => {
  app.get('/api/diary', 'diary.index');
  app.post('/api/diary', 'diary.create');
  app.get('/api/user/:user_id/diary', 'diary.find');
  app.del('/api/users/:user_id/diary/:id', 'diary.destroy');
  app.put('/api/users/:user_id/diary/:id', 'diary.update');
};
