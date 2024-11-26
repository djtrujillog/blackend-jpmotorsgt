// checkAuth.mjs
import jwt from 'jsonwebtoken';
import config from '../utils/config.mjs';

const checkAuth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    req.userRoles = decoded.roles;
    next();
  });
};

const checkRole = (roles) => {
  return (req, res, next) => {
    const userRoles = req.userRoles;
    if (roles.some(role => userRoles.includes(role))) {
      next();
    } else {
      res.status(403).json({ message: 'Permiso denegado' });
    }
  };
};

export default { checkAuth, checkRole };
