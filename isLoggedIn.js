const isLoggedIn = function(req, res, next){
  if(req.signedCookies.email){
    return next();
  }
  res.redirect('/');
}

function loggedOut(req, res, next, ) {
  if (req.session && req.session.userId) {
    return res.redirect('upcycler/profile');
  }
  return next();
}

module.exports = loggedOut=loggedOut;