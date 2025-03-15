const express = require("express");
const apiRouter = require("./routes/apiRoutes");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const app = express();

require("dotenv").config();
require("./config/passport");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));