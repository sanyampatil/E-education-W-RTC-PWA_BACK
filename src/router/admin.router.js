import { Router } from 'express'
import { loginAdmin, registerAdmin } from '../controllers/admin.controller.js'

const adminRouter = Router()

adminRouter.route('/register').post(registerAdmin)
adminRouter.route('/login').post(loginAdmin)

export default adminRouter
