import { Router } from 'express'
import {  fetchAllDoubts, sendDoubt } from '../controllers/Doubt.controller.js'
import protect from '../middleware/studentAuthmiddleware.js';
// import  sendDoubt  from '../controllers/Doubt.controller.js'

const DoutRouter = Router()

DoutRouter.route('/ask-Dout').post(protect, sendDoubt);
DoutRouter.route('/my-AllDout').get(protect,fetchAllDoubts);




export default DoutRouter
