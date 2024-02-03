import { Router } from 'express'
import {registerAdmin,loginAdmin,logoutAdmin } from '../controllers/admin.controller.js'
import isLoggein from '../middleware/auth.moddleware.js'

const  adminRouter = Router()

adminRouter.route('/register').post(registerAdmin)
adminRouter.route('/login').post(loginAdmin)
adminRouter.route('/logout').get(logoutAdmin)
// adminRouter.route('/admin').get(isLoggein,getAdmin)



export default adminRouter

