import jwt from "jsonwebtoken";
const JWT_SECRET = "97Ur4r%PKv`!";

const generarJWT = id => {
    return jwt.sign( { id }, JWT_SECRET, { expiresIn: '3600' } );
};

export default generarJWT;