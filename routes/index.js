var express = require('express');
var router = express.Router();
//导入lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json')
//获取db对象
const db = low(adapter)
//导入shortid
const shortid = require('shortid');
//导入 moment
const moment = require('moment');
const AccountModel = require('../models/AccountModel');

//测试
// console.log(moment('2024-06-23').toDate())

//记账本的列表
router.get('/account', function(req, res, next) {
  //获取所有账单信息
  let accounts = db.get('accounts').value();
  res.render('list', {accounts: accounts});
});

router.get('/account/create', function(req, res, next) {
  res.render('create')
});

//新增记录
router.post('/account', (req, res) => {
  //查看表单数据 2024-06-23 => new Date()
  // 2024-06-23 => moment => new Date()
  // console.log(req.body);
  //修改req.body.time的值
  // console.log(req.body.time); //'2024-06-23'
  // req.body.time = moment(req.body.time).toDate()
  //插入数据库
  AccountModel.create({
    ...req.body,
    //修改 time 属性的值
    time: moment(req.body.time).toDate()
  }).then(() => {
    //成功提醒
    res.render('success', {msg: '添加成功哦~~~', url: '/account'});
  }).catch((err) => {
    res.status(500).send('插入失败~~~');
    console.log(err);
    return;
  })
})

//删除记录
router.get('/account/:id', (req, res) => {
  //获取params的id参数
  let id = req.params.id;
  //删除
  db.get('accounts').remove({id:id}).write();
  //提醒
  res.render('success', {msg: '删除成功哦~~~', url: '/account'});
})

module.exports = router;
