const express = require('express')
const dockerController = require('../controllers/dockerController')
const router = express.Router()
const { cookieJwtAuth } = require("../middlewares/cookieJwtAuth");

router.route('/containers').get(cookieJwtAuth, dockerController.getAllContainers)
router.route('/start').post(cookieJwtAuth, dockerController.startContainer)
router.route('/stop').post(cookieJwtAuth, dockerController.stopContainer)
router.route('/container').post(cookieJwtAuth, dockerController.getOneContainer)


module.exports = router