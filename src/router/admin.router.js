import { Router } from 'express'
import {upload} from '../middleware/multer.middleware.js'
import {registerAdmin,loginAdmin,logoutAdmin } from '../controllers/admin.controller.js'
import isLoggein from '../middleware/auth.moddleware.js'
import { createAdminDatail } from '../middleware/AdminDetail.Controller.js'

const  adminRouter = Router()

adminRouter.route('/register').post(registerAdmin)
adminRouter.route('/login').post(loginAdmin)
adminRouter.route('/logout').get(logoutAdmin)
adminRouter.route("/admin-detail").post(

 upload.fields([
     {
         name: "avatar",
         maxCount: 1
     }, 
     {
         name: "coverImage",
         maxCount: 1
     }
 ]),
 createAdminDatail
 )


// adminRouter.route('/admin').get(isLoggein,getAdmin)



export default adminRouter

