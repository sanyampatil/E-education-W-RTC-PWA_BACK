import { Router } from 'express'
import { loginAdmin, logoutAdmin, registerAdmin } from '../controllers/admin.controller.js'
import isLoggein from '../middleware/auth.moddleware.js'

const adminRouter = Router()

adminRouter.route('/register').post(registerAdmin)
adminRouter.route('/login').post(loginAdmin)
adminRouter.route('/logout').get(isLoggein,logoutAdmin)


export default adminRouter
