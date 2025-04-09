import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class Security {
    public check(req: Request, res: Response, next: NextFunction): any {
        if (!req.headers.authorization) {
            res.status(401).json({
                respuesta: "Te falto el Token, uyyy"
            })
        } else {
            try {
                const miToken = req.headers.authorization?.split(" ")[1] as string;
                const datos = jwt.verify(miToken, "miclavesecretaultrasegura");
                next();
            } catch (error) {
                res.status(401).json({
                    respuesta: "Falsificaste el token, mano"
                })
            }
        }
    }
}

const security = new Security();
export default security;