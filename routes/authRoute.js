const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { createUser } = require("../controllers/userController")


const router = express.Router();

//At /login check if the user is already signed in, if they are redirect to dashboard, if they aren't bring up the "login" view
router.get(
    "/login",
    forwardAuthenticated,
    (req, res) => res.render("login")
);

//Routes to handle Email login
router.get(
    '/email',
    (req, res) => res.render(
        "loginByEmail"
        )
);

router.post(
  "/email",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get(
    '/register',
    (req, res) => res.render("register")
);

router.post(
    '/register',
    (req, res) => {
        const user = req.body;
        createUser(user.name, user.email, user.password, res);
        console.log("information available to post @ /register");
        console.log(req);
    }
);

//Routes to handle GitHub login
router.get('/github',
    passport.authenticate('github')
);

router.get('/returnGitHub',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/dashboard');
    }
);

//Routes to handle Facebook login
router.get('/facebook',
    passport.authenticate('facebook')
);

router.get('/returnFacebook',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/dashboard');
    }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
