const { Router } = require('express');
const router = Router();
router.get('/', (req,res) =>{res.send('warframe api')});

module.exports = router;