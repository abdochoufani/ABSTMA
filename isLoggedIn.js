const isLoggedIn = function(req, res, next){
  if(req.signedCookies.email){
    return next();
  }
  res.redirect('/');
}

function loggedOut(req, res, next, url) {
  if (req.session && req.session.userId) {
    return res.redirect(url);
  }
  return next();
}

module.exports = loggedOut=loggedOut;