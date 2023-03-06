import { Router } from "express";
import {auth } from './../../middlewear/auth.js'
import * as postController from './controller/post.controller.js';
import * as commentController from './controller/comment.controller.js';

import { mymulter, filevalidation, HME } from './../../services/multer.js';
const router =Router();

router.post('/createpost',auth(),mymulter(filevalidation.image).array('image',3),HME,postController.createpost)
router.post('/:id/comment',auth(),commentController.createcomment)
router.get('/',postController.getposts)
router.patch('/postlikes/:postId',auth(),postController.likepost)
router.patch('/postunlike/:postId',auth(),postController.unlikepost)

export default router;
