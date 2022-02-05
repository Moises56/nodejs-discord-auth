const { Strategy } = require("passport-discord");
const passport = require("passport");
const User = require("../models/User");
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = require("../config");

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if(user) done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: '/auth/redirect',
      scope: ['identify', 'guilds'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(profile);
        const user = await User.findOne({discordId: profile.id})
        if (user) return done(null, user)

        const newUser = new User({
          discordId: profile.id,
          username: profile.username,
          guilds: profile.guilds,
        });
        const saveUser = await newUser.save();
        done(null, saveUser);

      } catch (error) {
        console.log('este es el error: ', error);
        return done(error, null);
      }
    }
  )
);
