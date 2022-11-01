const commentsController = require("../controllers/commentsController");
const router = require("express").Router();

router.route("/comments").post(commentsController.createComment);
router.route("/allcomments").get(commentsController.getAllComments);
router.route("/comments").get(commentsController.getComments);

module.exports = router;
