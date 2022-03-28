const passport = require("passport");
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt =passportJwt.Strategy
const User  = require('../models/User')


  passport.use( new StrategyJwt({
  jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:process.env.JWT_SECRET,
  },
   function (jwtPayLoad, done){
   return User.findOne({where:{id:jwtPayLoad.id}}).then((user)=>{
   return done(null, user);
   }).catch((err)=>{
     return done(err);
     })
  }
  )
  );
