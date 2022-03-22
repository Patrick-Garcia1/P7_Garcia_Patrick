//----------------------------------------------------------------------------------
// Routes commentaire
//----------------------------------------------------------------------------------
const express = require("express");
const router = express.Router();
const commentairesCtrl = require("../controllers/Commentaire");
const auth = require("../middleware/auth");

router.post("/:id", auth,  commentairesCtrl.createCommentaire);
router.get("/commentaires", auth, commentairesCtrl.getAllCommentaire);
router.delete("/:id/:idcom", auth, commentairesCtrl.deleteCommentaire);

module.exports = router;