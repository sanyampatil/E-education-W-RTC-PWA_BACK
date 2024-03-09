 import { Router } from 'express'
 import { AdminfetchAllDoubts } from '../controllers/Doubt.controller.js'
 import {fetchAllStudent} from '../controllers/dashboard.controller.js'
 const dashboardRouter = Router()
 dashboardRouter.route('/student-doubts').get(AdminfetchAllDoubts)
 dashboardRouter.route('/all-student').get(fetchAllStudent)

 export default dashboardRouter
