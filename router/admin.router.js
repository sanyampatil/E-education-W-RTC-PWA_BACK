import { Router } from 'express'
import { registerAdmin } from '../controllers/admin.controller.js'

const adminRouter = Router()

adminRouter.route('/register').post(registerAdmin)
export default adminRouter
