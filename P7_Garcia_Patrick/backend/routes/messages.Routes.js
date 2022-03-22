//----------------------------------------------------------------------------------
// Route message
//----------------------------------------------------------------------------------
const express = require("express");
const router = express.Router();
const messagesCtrl = require("../controllers/Message");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, messagesCtrl.getAllMessage);
router.post("/", auth, multer, messagesCtrl.createMessage);
router.delete("/:id", auth, messagesCtrl.deleteMessage);

module.exports = router;
