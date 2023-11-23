const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../config/generateToken");
const { search } = require("../routes/userRoutes");

const registerUser = asyncHandler(async (req, res) => {
    try {
      const { name, email, password, pic } = req.body;
     console.log('req.body>>>>', req.body)
      if (!name || !email || !password) {
        res.status(500).json({ success: false, message: "Please enter all the fields" });
        return; // Added return to exit the function
      }
  
      const userExist = await User.findOne({ email });
  
      if (userExist) {
        res.status(500).json({ success: false, message: "User already exists" });
        return; // Added return to exit the function
      }
  
      const user = await User.create({
        name,
        email,
        password,
        pic,
      });
  
      // Use user instance to call matchPassword
      if (user && (await user.matchPassword(password))) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        });
      }
    } catch (err) {
      console.error(err);
      res.status(402).json({ success: false, message: "Something went wrong" });
    }
  });
  
const authUser =  asyncHandler(async (req,res) =>{
    try{
 const {email,password} = req.body;
 console.log('data from the front end', req.body)
 if(!email || !password ){
    res
        .status(500)
        .json({ success: false, message: "please enter the all the fields" });
 }
 const user = await User.findOne({ email });
 if(user && (await user.matchPassword(password))){
    res
        .status(201)
        .json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        });
 }
    }catch(err){

    }
})

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search;
  console.log('keyword>>', keyword);

  const users = await User.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { email: { $regex: keyword, $options: 'i' } }
    ],
  }).find({ _id: { $ne: req.user._id } });

  res.send(users);
});

module.exports ={
    registerUser,
    authUser,
    allUsers
}
