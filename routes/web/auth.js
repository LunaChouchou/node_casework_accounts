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

//登录页面
router.get('/login', (req, res) => {
    //响应html内容
    res.render('auth/login');
})

//登录操作
router.post('/login', (req, res) => {
  //获取用户名和密码
  let { username, password } = req.body;
  //查询数据库
  UserModel.findOne({username: username, password: md5(password)}).then((data) => {
    console.log(data);
    //判断的ata
    if(!data){
        return res.send('账号或密码错误~~');
    }
    //登录成功响应
    res.render('success', {msg: '登录成功', url: '/account'});
  }).catch((err) => {
    res.status(500).send('登录失败, 请稍后再试');
    return
  });
})


module.exports = router;
