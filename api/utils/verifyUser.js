import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'


export const  verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;
    if(!token){
        return next( errorHandler(res, 'unauthorized'))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next( errorHandler(res, 'unauthorized'))
        req.user = user;
        next();
    })
}
