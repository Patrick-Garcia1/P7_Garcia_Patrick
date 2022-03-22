//----------------------------------------------------------------------------------
// Route user
//----------------------------------------------------------------------------------
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/User");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// la version 6.0 plante visiblement 'raterLimit() n'est pas une fonction', la version 5.0.1  à l'air ok
const raterLimit = require("express-rate-limit");
const limiter = raterLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 essais
});

router.post("/signup", userCtrl.signup);
router.post("/login", limiter, userCtrl.login);
router.get("/userProfil", auth, userCtrl.userProfil);
router.put("/MAJ", auth, multer, userCtrl.userMaj);
router.post("/logout", userCtrl.userLogout);
router.delete("/MAJ", auth, userCtrl.userDelete);

module.exports = router;
