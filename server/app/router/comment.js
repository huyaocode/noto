'use strict';

module.exports = app => {
  app.post('/api/users/comment', 'comment.create');
  app.del('/api/users/:user_id/comment/:id', 'comment.destroy');
  app.get('/api/diary/:diary_id/comment', 'comment.get');
};
