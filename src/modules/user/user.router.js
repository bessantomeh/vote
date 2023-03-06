import { Router } from "express";
import { auth } from "../../middlewear/auth.js";
import * as userController from './controller/user.conrtoller.js';
import { mymulter, filevalidation, HME } from './../../services/multer.js';
import { endpoint } from './../post/post.endpoint.js';
const router =Router();

router.get('/profile',auth(endpoint.createpost),userController.getprofile)
router.patch( '/profilepic',auth(),mymulter(filevalidation.image).single('image'),HME,userController.profilepic )
router.patch('/profilecoverpic',auth(),mymulter(filevalidation.image).array('image',3),HME,userController.profilecoverimage)

export default router;