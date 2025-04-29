import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "variables.env" });
const secret = process.env.JWT_SECRET as string;

class Security {
    public check(req: Request, res: Response, next: NextFunction): any {
        if (!req.headers.authorization) {
            res.status(401).json({
                respuesta: "Hace fata el token del usuario"
            })
        } else {
            try {
                const miToken = req.headers.authorization?.split(" ")[1] as string;
                const datos = jwt.verify(miToken, secret);
                if (datos) {
                    next();
                }else{
                    res.status(401).json({
                        respuesta: "Token inválido"
                    })
                }
            } catch (error) {
                res.status(401).json({
                    respuesta: "Token falsificado"
                })
            }
        }
    }
}

const security = new Security();
export default security;