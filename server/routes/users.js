var express = require('express');
const { JsonWebTokenError,jwt } = require('jsonwebtoken');
var router = express.Router();
const adminHelper = require('../controller/adminHelper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',adminHelper.Login)
router.get('/getrequests',adminHelper.Requests)
router.get('/acceptrequest',adminHelper.Accept)
router.get('/rejectrequest',adminHelper.Reject)
router.post('/bookslot',adminHelper.Bookslot)

module.exports = router;
