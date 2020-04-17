/**
 * 使用方法：
 * const userId = getUIdFromCookie(this.ctx.request.header.cookie)
 */
function getUIdFromCookie(cookie) {
  const res = /user_id=(\d)/.exec(cookie)
  return res ? res[1] : null;
}


module.exports = getUIdFromCookie;