import { Router } from "express";
import * as authController from './controller/auth.controller.js';
const router =Router();

router.post('/signup',authController.signup)
router.get('/confirmEmail/:token',authController.confirmEmail)
router.get('/signin',authController.signin)

export default router;