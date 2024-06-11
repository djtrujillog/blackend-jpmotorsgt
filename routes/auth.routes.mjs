import { Router } from 'express';
const router = Router();

import { 
    signIn,
    signUp,
    perfil
} from '../controllers/authController.mjs';
import checkAuth from '../middleware/checkAuth.mjs';

//Autenticación y registro de usuarios
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/perfil', checkAuth, perfil);

export default router;