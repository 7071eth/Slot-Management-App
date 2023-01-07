const User = require('../model/User').user_data;
const RefreshToken = require('../model/User').refresh_token;
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const generateAccessToken = (user)=>{
  return jwt.sign({id: user.id},process.env.SECRET_KEY,{expiresIn: "1m"});
}
const generateRefreshToken = (user)=>{
  return jwt.sign({id: user.id},process.env.REFRESH_KEY);
}


const Register = async (req,res) => {
  console.log(req.body);
  const {name,password,email} = req.body;

  if(!name || !password) return res.status(400).json({'message':'Username and password are required'})
  
  const duplicate = await User.findOne({name: name}).exec();
  if(duplicate) return res.sendStatus(409); //Conflict

  try {
    const hashedPwd = await bcrypt.hash(password,10);

    const result = await User.create({
      "name": name,
      "email":email,
      "password": hashedPwd
    })

    console.log(result);
    res.status(201).json({'success':`New user ${name} Registered!`})
  } catch{(err) => {
    console.log(err);
  }}
  
}

const Login = async (req,res) => {

  const {name,password} = req.body;
  const user = await User.findOne({name: name}).exec();
  if(!user) return res.status(401).json({'message':'User does not exist !'})

  let pwd = await bcrypt.compare(
    password,
    user.password
  );
  console.log(user);
  
  if(!pwd) return res.status(401).json({'message':'Incorrect password'})

  //Generate jwt tokens if authenticated

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  
  console.log(accessToken);
  console.log(refreshToken);

  const result = await RefreshToken.create({
    "token": refreshToken,
  })
  
  res.status(200).json({
    userId : user.id,
    name : user.name,
    accessToken,
    refreshToken
  })
  
}

const Refresh = async (req,res)=>{
  
  //Take refresh token from user
  const refreshToken = req.body.token
  //Send error if there is no token or if its invalid
  
  if(!refreshToken) return res.status(401).json("You are not authenticated");
  let findToken = await RefreshToken.findOne({token: refreshToken}).exec();

  console.log(findToken);
  if(!findToken){
    return res.status(403).json("Refresh token not valid!")
  }
  jwt.verify(refreshToken,process.env.REFRESH_KEY, async (err,user) => {
    err && console.log(err);

   let result = await RefreshToken.findOneAndDelete({ token: refreshToken });

   console.log(result);

   const newAccessToken = generateAccessToken(user);
   const newRefreshToken = generateRefreshToken(user);
    
   let newResult = await RefreshToken.create({
    "token": newRefreshToken,
  })
   console.log(newResult);

   res.status(200).json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
   })
  })
  //If everything is ok, create new access token, refresh token and send to user
}

module.exports = {Register,Login,Refresh};