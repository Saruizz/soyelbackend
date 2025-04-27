"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "variables.env" });
const secret = process.env.JWT_SECRET;
class Security {
    check(req, res, next) {
        var _a;
        if (!req.headers.authorization) {
            res.status(401).json({
                respuesta: "Hace fata el token del usuario"
            });
        }
        else {
            try {
                const miToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const datos = jsonwebtoken_1.default.verify(miToken, secret);
                if (datos) {
                    next();
                }
                else {
                    res.status(401).json({
                        respuesta: "Token inválido"
                    });
                }
            }
            catch (error) {
                res.status(401).json({
                    respuesta: "Token falsificado"
                });
            }
        }
    }
}
const security = new Security();
exports.default = security;
