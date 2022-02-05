const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const MongoStore = require("connect-mongo");
const { SECRET, MONGODB_URI } = require("./config");

const app = express();
require("./strategies/discordStrategy");

//Setting up the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(
  session({
    secret: SECRET,
    name: "theockles-discord-oauth2",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
    }),
    cookie: {
      maxAge: 60000 * 60 * 24, // 1 day
      // secure: true
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//Global variables
app.use((req, res, next) => {
  res.locals.user = req.user;
  console.log(req.user);
  next();
});

// Routes
app.use("/", require("./routes/index.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));

module.exports = app;
