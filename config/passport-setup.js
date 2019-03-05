const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const FacebookStrategy=require('passport-facebook')
const keys=require('./keys')
const Recycler=require('../models/recyclers')


passport.serializeUser((user,done)=>{
    let serializedUser = {
        id: user.id,
        userType: user.userType
    }
    done(null,serializedUser)
})


passport.deserializeUser((user,done)=>{
    if(user.userType === "recycler") {
        Recycler.findById(id).then((recycler)=>{
            recycler.userType = "recycler"
            done(null,recycler)
        })
    }
    else if (user.userType === "upCycler") {
    }

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
                newRecycler.userType = "recycler"
                done(null,recycler)
            } else {
                const imageUrl = profile.photos[0].value.replace("?sz=50", "")

            new Recycler({
                fullName:profile.displayName,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                userName:profile.displayName,
                googleId:profile.id,
                imageUrl,
                gender:profile.gender
            }).save().then((newRecycler)=>{
                console.log("user:" + newRecycler)
                newRecycler.userType = "recycler"
                done(null,newRecycler)
            }).catch(()=>{
                console.log("error")
            })
        }
    })
    console.log(profile)
}))



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
                newRecycler.userType = "recycler"
                done(null,recycler)
            } else {
                const imageUrl = profile.photos[0].value.replace("?sz=50", "")
            new Recycler({
                fullName:profile.displayName,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                userName:profile.displayName,
                googleId:profile.id,
                imageUrl,
                gender:profile.gender
            }).save().then((newRecycler)=>{
                console.log("user:" + newRecycler)
                newRecycler.userType = "recycler"
                done(null,newRecycler)
            }).catch(()=>{
                console.log("error")
            })
        }
    })
    console.log(profile)
}))



passport.use(new GoogleStrategy({
    // options for google strategy
    callbackURL:"/auth/google/redirect",
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
        Upcycler.findOne({googleId:profile.id}).then((upcycler)=>{
            if (upcycler){
                //user already exists then serilize passsword
                console.log("already exist")
                newUpcycler.userType = "upCycler"
                done(null,upcycler)
            } else {
                const imageUrl = profile.photos[0].value.replace("?sz=50", "")
            new Recycler({
                fullName:profile.displayName,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                userName:profile.displayName,
                googleId:profile.id,
                imageUrl,
                gender:profile.gender
            }).save().then((newUpcycler)=>{
                console.log("user:" + newUpcycler)
                newUpcycler.userType = "upCycler"
                done(null,newUpcycler)
            }).catch(()=>{
                console.log("error")
            })
        }
    })
    console.log(profile)
}))