var express = require('express');
var router = express.Router();
//导入 moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

//记账本的列表
router.get('/account', function(req, res, next) {
  //获取所有账单信息
  // let accounts = db.get('accounts').value();
  //读取集合信息
  AccountModel.find().sort({time: -1}).exec().then((data) => {
    console.log(data);
    //响应成功的提示
    res.json({
      //响应编号
      code:  '0000',
      //响应的信息
      msg: '读取成功',
      //响应的数据
      data: data
    });
  }).catch((err) => {
    res.json({
      code: '1001',
      msg: '读取失败~~',
      data: null
    })
    return;
  })
});

//新增记录
router.post('/account', (req, res) => {
  // TODO: 表单验证
  //插入数据库
  AccountModel.create({
    ...req.body,
    //修改 time 属性的值
    time: moment(req.body.time).toDate()
  }).then((data) => {
    //成功提醒
    res.json({
      //响应编号
      code:  '0000',
      //响应的信息
      msg: '创建成功',
      //响应的数据
      data: data
    });
  }).catch((err) => {
    res.json({
      code:  '1002',
      msg: '创建失败~~',
      data: null
    })
    return;
  })
})

//删除记录
router.delete('/account/:id', (req, res) => {
  //获取params的id参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({_id: id}).then(() => {
    //提醒
    //成功提醒
    res.json({
      code:  '0000',
      msg: '删除成功',
      data: {}
    });
  }).catch((err) => {
    res.json({
      code:  '1003',
      msg: '删除账单失败',
      data: null
    })
    return;
  });
})

module.exports = router;
