const { Router } = require('express');
const router = Router();
const { 
    warframeGet,warframeGetName,warframePatch } = require("../controller/warframe")

router.get('/warframeGet', warframeGet);
router.get('/warframeGetName', warframeGetName);
router.patch('/', warframePatch );

module.exports = router;