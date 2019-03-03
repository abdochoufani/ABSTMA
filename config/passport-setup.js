const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys')
const Recycler=require('../models/recyclers')


passport.serializeUser((recycler,done)=>{
    done(null,recycler.id)
})


passport.deserializeUser((id,done)=>{
    Recycler.findById(id).then((recycler)=>{
        done(null,recycler)
    })
})

passport.use(new GoogleStrategy({
    // options for google strategy
    callbackURL:"/auth/google/redirect",
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
        Recycler.findOne({googleId:profile.id}).then((recycler)=>{
            if (recycler){
                //user already exists then serilize passsword
                console.log("already exist")
                done(null,recycler)
            } else {
            new Recycler({
                fullName:profile.displayName,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                userName:profile.displayName,
                googleId:profile.id,
                imageUrl:profile.photos[0].value,
                gender:profile.gender
            }).save().then((newRecycler)=>{
                console.log("user:" + newRecycler)
                done(null,newRecycler)
            })
        }
    })
    console.log(profile)
}))