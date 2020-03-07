/**
 * 添加路由规则，如把 home 添加到 / 
 */

// #region Global Imports
const nextRoutes = require("next-routes");
// #endregion Global Imports

const routes = (module.exports = nextRoutes());

routes.add("home", "/");

export default routes;
