import jwt  from "jsonwebtoken";
import config from "../utils/config.mjs";
import Empleado from "../models/empleado.mjs";

const checkAuth = async (req, res, next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.SECRET);

            req.user = await Empleado.findByPk(decoded.id);
                        
            return next();
        } catch (error) {
            return res.status(404).json({message: 'Hubo un error'});
        }
    }

    if(!token){
        const error = new Error('Token no válido');
        return res.status(401).json({ message: error.message });
    }

    next();
}

export default checkAuth;