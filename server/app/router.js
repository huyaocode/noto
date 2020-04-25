'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/diary')(app);
  require('./router/user')(app);
  require('./router/comment')(app);
  require('./router/todo')(app);
  require('./router/i18n')(app);
};
