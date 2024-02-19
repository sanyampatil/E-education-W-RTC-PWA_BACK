import { Router } from 'express'
import {createAdminDatail} from '../controllers/AdminDetail.controller.js'
const DetailRouter = Router()

DetailRouter.route('/details').post(createAdminDatail)

export default DetailRouter
