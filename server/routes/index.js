var express = require('express');
const { JsonWebTokenError,jwt } = require('jsonwebtoken');
var router = express.Router();
const userHelper = require('../controller/userHelper');

const verify = (req,res,next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
      if(err){
        return res.status(403).json("Token is not valid !")
      }

      req.user = user;
      next();
    })
  }else {
    res.status(401).json("You are not authenticated !")
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup',userHelper.Register)
router.post('/request',userHelper.Request)
router.get('/getrequest',userHelper.getRequest)
router.post('/login',userHelper.Login)
router.post('/refresh',userHelper.Refresh)
module.exports = router;
