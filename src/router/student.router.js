import express from 'express'
import {registerStu,loginStu,logoutStu} from '../controllers/student.controller.js'
const stuRouter = express.Router()

stuRouter.route('/register').post(registerStu)
stuRouter.route('/login').post(loginStu)

export default stuRouter
