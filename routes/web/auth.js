var express = require('express');
var router = express.Router();
//导入 用户的模型
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

//注册
router.get('/reg', (req, res) => {
  //响应html内容
  res.render('auth/reg');
})

//注册用户
router.post('/reg', (req, res) => {
  //TODO: 做表单验证
  //获取请求体的数据
  UserModel.create({...req.body, password: md5(req.body.password)}).then(() => {
    res.render('success', {msg: '注册成功', url: '/login'});
  }).catch((err) => {
    res.status(500).send('注册失败,请稍后再试');
    return
  });
})
module.exports = router;
