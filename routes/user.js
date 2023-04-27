const express = require("express");
const { register, login, auth } = require("../controllers/user.controller");
const { validatorr, registerRoules } = require("../middlewares/validator");
const { verifyAuth } = require("../middlewares/verifyAuth");

const router = express.Router();
router.post("/register", registerRoules(), validatorr, register);
router.post("/login", validatorr, login);
router.get("/auth", verifyAuth, auth);

// ///getAllUser
// router.get("/getAllUser", getAllUser);
// ///// update user
// router.put("/updateUser/:_id", updateUser);

module.exports = router;
