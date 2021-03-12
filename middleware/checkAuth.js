const userModel = require("../models/userModel").userModel;

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },
  // ensureAuthenticatedAdmin: function (req, res, next){
  //   if(!req.isAuthenticated()){
  //     return res.redirect("/auth/login");
  //   } else if(userModel.findUserTypeById(req.user.id) !== "admin"){
  //     return res.redirect("/forbidden");
  //   }
  //   return next()
  // }
  ensureAuthenticatedAdmin: function (req, res, next){
    if(req.isAuthenticated()){
      if(userModel.findUserTypeById(req.user.id) === "admin"){
        return next()
      }
    }
    return res.redirect("/forbidden")
  }
};
