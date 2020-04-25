'use strict';

module.exports = app => {
  app.post('/api/i18n', 'i18n.create')
  app.del('/api/i18n/:id', 'i18n.destroy');
  app.get('/api/i18ns', 'i18n.get');
  app.put('/api/i18n/:id', 'i18n.update');
};
