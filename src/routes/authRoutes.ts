import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import autheticateToken from '../middlewares/auth';
import { changePassword } from '../controllers/authController';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', autheticateToken, changePassword);


export default router;
