const { Router } = require("express");
const mongoose = require("mongoose");
const { commentController } = require("../controllers/comments.controller");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");


router.get("/comment", commentController.getComment);
router.post("/comment/place/:idParams", 
  authMiddleware,
  commentController.postComment
);
router.delete("/delete/comment/:commentId", commentController.deleteComment);
router.patch("/patch/comment/:commentId", commentController.patchComment);

module.exports = router;
