import { Router } from 'express'
import {  fetchAllDoubts, sendDoubt } from '../controllers/Doubt.controller.js'
import protect from '../middleware/studentAuthmiddleware.js';
// import  sendDoubt  from '../controllers/Doubt.controller.js'

const DoutRouter = Router()

DoutRouter.route('/ask-Dout').post(sendDoubt);
DoutRouter.route('/fetch-AllDout/:id').get(fetchAllDoubts);




export default DoutRouter
