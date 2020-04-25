'use strict';

module.exports = app => {
  app.get('/api/diary', 'diary.index');
  app.post('/api/diary', 'diary.create');
  app.get('/api/user/:user_id/diary', 'diary.find');
  app.del('/api/diary/:id', 'diary.destroy');
  app.put('/api/diary/:id', 'diary.update');
};
