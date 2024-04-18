const { Router } = require("express");
const router = Router();

router.use(require("./users.route"));
router.use(require('./places.route'))
router.use(require('./comments.route'))
router.use(require('./image.route'))
router.use(require('./categories.route'))
router.use(require('./areas.route'))
router.use(require('./trips.route'))

module.exports = router;
