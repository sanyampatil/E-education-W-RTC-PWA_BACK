import { Router } from 'express'
import { AdminfetchAllDoubts } from '../controllers/Doubt.controller.js'

const dashboardRouter = Router()
dashboardRouter.route('/student-doubts').get(AdminfetchAllDoubts)

export default dashboardRouter
