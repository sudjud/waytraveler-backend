const { Router } = require("express");
const { userController } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

router.get("/users", userController.getUser);
router.post("/register", userController.registerUsers);
router.post("/login", userController.login);
router.patch("/users/travel", authMiddleware, userController.addTravel);
module.exports = router;
