const { Router } = require("express");
const router = Router();
const { placeController } = require('../controllers/place.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/place', placeController.postPlace);
router.get('/place', placeController.getPlaces);
router.patch("/place/:id/add-like", authMiddleware, placeController.addLikePlace);
router.patch('/place/:id', placeController.updatePlace)

module.exports = router;