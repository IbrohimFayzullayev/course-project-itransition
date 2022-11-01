const likesController = require("../controllers/likesController");
const router = require("express").Router();

router.route("/likes").post(likesController.addLike);

module.exports = router;
