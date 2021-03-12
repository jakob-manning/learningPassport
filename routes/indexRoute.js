const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureAuthenticatedAdmin } = require("../middleware/checkAuth");
const { database } = require("../models/userModel")

router.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticatedAdmin, (req, res) => {
  res.render("admin", {
    users: database,
  });
});

router.get("/forbidden", (req, res) => {
  res.render("forbidden");
});

module.exports = router;
