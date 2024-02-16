import express from 'express'
import {
  accessChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
} from "../controllers/chat.controller.js"
import protect from '../middleware/studentAuthmiddleware.js'; 


const chatRouter = express.Router();

chatRouter.route("/").post(protect, accessChat);
chatRouter.route("/").get(protect, fetchChats);
chatRouter.route("/createGroup").post(protect, createGroupChat);
chatRouter.route("/fetchGroups").get(protect, fetchGroups);
chatRouter.route("/groupExit").put(protect, groupExit);

export default chatRouter

