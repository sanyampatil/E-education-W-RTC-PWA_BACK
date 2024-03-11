import { Router } from 'express'
import upload from '../middleware/multer.middleware.js'
import { createAdminDatail, getProfile } from '../controllers/AdminDetail.controller.js'
const DetailRouter = Router()

DetailRouter.route('/details').post(upload.single('avatar'), createAdminDatail)
DetailRouter.route('/profile/:id').get(getProfile)
export default DetailRouter
