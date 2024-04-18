const { Router } = require("express");
const { categoryControllers } = require("../controllers/categories.controller");
const router = Router();

router.get('/category', categoryControllers.getAllCategories)
router.post('/category', categoryControllers.categoryCreate)
router.delete('/admin/category/:categoryId', categoryControllers.categoryRemoveAdmin)
router.patch('/admin/category/:categoryId', categoryControllers.categoryUpdateAdmin)


module.exports = router;