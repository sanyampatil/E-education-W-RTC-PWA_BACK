import express from 'express'
import {
  loginController,
  registerController,
  fetchAllUsersController
} from '../controllers/student.controller.js'
import isLoggein from '../middleware/auth.moddleware.js'
import protect from '../middleware/studentAuthmiddleware.js'

const stuRouter = express.Router()

stuRouter.route('/register').post(registerController)
stuRouter.route('/login').post(loginController)
// stuRouter.route('/logout').get(logoutStu)
stuRouter.route('/getusers').get(protect, fetchAllUsersController)

export default stuRouter
