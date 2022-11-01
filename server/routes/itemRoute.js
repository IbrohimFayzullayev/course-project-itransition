const itemController = require("../controllers/itemController");
const router = require("express").Router();

router.route("/items").post(itemController.createItem);
router.route("/items").get(itemController.getItems);
router.route("/items/:id").delete(itemController.deleteItem);
router.route("/allitems").get(itemController.getAllItems);
// router.route("/items").put(itemController.addComment);

module.exports = router;
