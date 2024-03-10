 import { Router } from 'express'
 import { AdminfetchAllDoubts } from '../controllers/Doubt.controller.js'
 import {fetchAllStudent,CreateScheLiveClass, fetchAllSchedule} from '../controllers/dashboard.controller.js'
 const dashboardRouter = Router()
 dashboardRouter.route('/student-doubts').get(AdminfetchAllDoubts)
 dashboardRouter.route('/all-student').get(fetchAllStudent)
 dashboardRouter.route('/create-schedule').post(CreateScheLiveClass)
 dashboardRouter.route('/all-schedule').get(fetchAllSchedule)




 export default dashboardRouter
