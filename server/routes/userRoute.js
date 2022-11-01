const userController = require("../controllers/userController");
const router = require("express").Router();

router.route("/users").get(userController.getUsers);
router.route("/user").get(userController.protect);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

router.route("/users/:id").get(userController.findOneUser);

module.exports = router;
