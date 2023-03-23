const { Router } = require('express');
const router = Router();
const { 
    modsGet,modsWarframeGet,modsPatch } = require("../controller/mods")

router.get('/modsGet', modsGet);
router.get('/modsWarframeGet/:name', modsWarframeGet);
router.patch('/', modsPatch );
module.exports = router;