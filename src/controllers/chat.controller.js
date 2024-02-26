import asyncHandler  from "express-async-handler"
import Chat from "../models/chat.model.js";
import Student from "../models/student.model.js";


const accessChat = asyncHandler(async ( ) => {
  const { userId } = req.body;
  console.log("user id",req.user.id)
  console.log(',,,,,,,<<<',userId)
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.send.status(400);
  } 
  
  console.log("this is my id",req.user._id )

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { students: { $elemMatch: { $eq: req.user._id } } },
      { students: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("students", "-password")
    .populate("latestMessage");

  isChat = await Student.populate(isChat, {
    path: "latestMessage.sender",   
    select: "username email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      students: [req.user._id, userId],
    };

    try { 
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "students",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    // console.log("Fetch Chats aPI : ", req);
    console.log("ID FROM fetchchats",req.user._id)
    Chat.find({ students: { $elemMatch: { $eq: req.user._id } } })
      .populate("students", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await Student.populate(results, {
          path: "latestMessage.sender",
          select: "username email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchGroups = asyncHandler(async (req, res) => {
  try {
    const allGroups = await Chat.where("isGroupChat").equals(true);
    res.status(200).send(allGroups);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  
  if (!req.body.students || !req.body.username) {
    return res.status(400).send({ message: "Data is insufficient" });
  }

  var students = JSON.parse(req.body.students);
  console.log("chatController/createGroups : ", req);
  students.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.username,
      students: students,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("students", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const groupExit = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { students: userId },
    },
    {
      new: true,
    }
  )
    .populate("students", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});
export  {
  fetchChats,
  fetchGroups,
  createGroupChat,
  groupExit,
  accessChat
};