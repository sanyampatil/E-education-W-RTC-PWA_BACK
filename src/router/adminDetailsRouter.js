import { Router } from 'express'
import upload from '../middleware/multer.middleware.js'
import { createAdminDatail } from '../controllers/AdminDetail.controller.js'
const DetailRouter = Router()

DetailRouter.route('/details').post(upload.single('avatar'), createAdminDatail)
export default DetailRouter
