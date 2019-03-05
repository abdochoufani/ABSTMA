const passport=require('passport');
const upcyclerPassport= new passport.Passport();
const LocalStrategy=require('passport-local')
const Upcycler=require("../../models/upcyclers")



upcyclerPassport.serializeUser((upcycler,done)=>{
  done(null,upcycler.id)
})

upcyclerPassport.deserializeUser((id,done)=>{
  Upcycler.findById(id).then((upcycler)=>{
      done(null,upcycler)
  })
})

passport.use("upcycler-local", new LocalStrategy(
    function(username, password, done) {
      Upcycler.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.use("recycler-local", new LocalStrategy(
    function(username, password, done) {
      Upcycler.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  module.exports = upcyclerPassport