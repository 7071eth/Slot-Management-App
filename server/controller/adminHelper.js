const Admin = require("../model/User").admin_data;
const Slotrequest = require("../model/User").slotrequest;
const RefreshToken = require("../model/User").refresh_token;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1m" });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_KEY);
};

const Login = async (req, res) => {
  const { name, password } = req.body;
  const user = await Admin.findOne({ name: name }).exec();
  if (!user) return res.status(401).json({ message: "User does not exist !" });

  let pwd = await bcrypt.compare(password, user.password);

  if (!pwd) return res.status(401).json({ message: "Incorrect password" });

  //Generate jwt tokens if authenticated

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  console.log(accessToken);
  console.log(refreshToken);

  const result = await RefreshToken.create({
    token: refreshToken,
  });

  res.status(200).json({
    userId: user.id,
    name: user.name,
    accessToken,
    refreshToken,
  });
};

const Requests = async (req, res) => {
 
  try{
    const user = await Slotrequest.find().exec();
  console.log(user);
  res.status(200).json({
    user
  });
  } catch (err) {
    console.log(err);
    res.status(404).json("Requests not found!")
  }
};

const Reject = async (req, res) => {
 
  try{
    const user = await Slotrequest.updateOne({_id:req.query.userid},{status:"rejected"},(e,s)=>{
      console.log(s);
    })
  console.log(user);
  res.status(200).json({
    user
  });
  } catch (err) {
    console.log(err);
    res.status(404).json("Requests not found!")
  }
};

const Accept = async (req, res) => {
 
  try{
    const user = await Slotrequest.updateOne({_id:req.query.userid},{status:"accepted"},(e,s)=>{
      console.log(s);
    })
  console.log(user);
  res.status(200).json({
    user
  });
  } catch (err) {
    console.log(err);
    res.status(404).json("Requests not found!")
  }
};
const Bookslot = async (req, res) => {
  console.log('gddad');
 console.log(req.body);

 try{
  const user = await Slotrequest.updateOne({_id:req.body.name},{seat:req.body.slotnumber},(e,s)=>{
    console.log(s);
    console.log("Working");
  }).clone()
console.log(user);
res.status(200).json({
  user
});
} catch (err) {
  console.log(err);
  res.status(404).json("Requests not found!")
}
};



module.exports = {Login,Requests,Accept,Reject,Bookslot}