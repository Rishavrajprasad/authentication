import express from 'express';
import {forgotPassword, signin, signout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/forget', forgotPassword)




export default router;