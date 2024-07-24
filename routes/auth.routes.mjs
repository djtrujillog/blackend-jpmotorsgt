// auth.routes.mjs
import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.mjs';
import checkAuth from '../middleware/checkAuth.mjs';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/perfil', checkAuth.checkAuth, (req, res) => {
  res.json({ message: 'Perfil del usuario', userId: req.userId, roles: req.userRoles });
});

export default router;
