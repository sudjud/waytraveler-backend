const { Router } = require("express");
const { areasController } = require("../controllers/areas.controller");
const router = Router();


router.get('/area', areasController.getAllAreas)
router.post('/area', areasController.areasCreate)
router.delete('/admin/area/:areaId', areasController.areasRemoveAdmin)
router.patch('/admin/area/:areaId', areasController.areasUpdateAdmin)


module.exports = router;