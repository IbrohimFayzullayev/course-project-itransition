const collectionController = require("../controllers/collectionController");
const router = require("express").Router();

router.route("/collections").post(collectionController.createCollection);
router.route("/collections").get(collectionController.getCollections);
router.route("/allcollections").get(collectionController.getAllCollection);
router
  .route("/collections/:id")
  .delete(collectionController.deleteOneCollection);

module.exports = router;
