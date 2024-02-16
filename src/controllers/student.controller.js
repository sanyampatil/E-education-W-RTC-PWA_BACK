import { generateToken } from '../config/generateToken.js';
import Student from '../models/student.model.js';

import expressAsyncHandler from 'express-async-handler';
// Login
const loginController = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(username,password)
  console.log("enter case 1")

  const user = await Student.findOne({username });

  console.log("fetched user Data", user);
  // console.log(await user.matchPassword(password));
  if (user && (await user.matchPassword(password))) {
    
    const response = {
      _id: user._id,
      username: user.username,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
  console.log("enter case 2")

    console.log(response);
    res.status(200).json({
      response,
      success:true,
      message:"student login sucessesfully"
    })
  } else {
    res.status(401);
    throw new Error("Invalid UserName or Password");
  }
});

// Registration
const registerController = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // check for all fields
  if (!username || !email || !password) {
    res.send(400);
    throw Error("All necessary input fields have not been filled");
  }
  console.log("case 2 pass")

  // pre-existing user
  const userExist = await Student.findOne({ email });
  if (userExist) {
    // res.send(405);
    throw new Error("User already Exists");
  }
  console.log("case 2 pass")

  // userName already Taken
  const emailExist = await Student.findOne({ email });
  if (emailExist) {
    // res.send(406);
    throw new Error("UserName already taken");
  }


  console.log("case 3 pass")

  // create an entry in the db
  const user = await Student.create({ username, email, password });
  if (user) {
    res.status(201).json({
      success:true,
      message:"student registrastion sucessesfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration Error");
  }
  console.log("case 4 pass")

});

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await Student.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

export{
  loginController,
  registerController,
  fetchAllUsersController,
}