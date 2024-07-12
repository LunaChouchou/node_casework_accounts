var express = require('express');
var router = express.Router();

//注册
router.get('/reg', (req, res) => {
    //响应html内容
    res.render('auth/reg');
})


module.exports = router;
