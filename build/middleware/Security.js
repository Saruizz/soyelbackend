"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Security {
    check(req, res, next) {
        var _a;
        if (!req.headers.authorization) {
            res.status(401).json({
                respuesta: "Te falto el Token, uyyy"
            });
        }
        else {
            try {
                const miToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const datos = jsonwebtoken_1.default.verify(miToken, "miclavesecretaultrasegura");
                next();
            }
            catch (error) {
                res.status(401).json({
                    respuesta: "Falsificaste el token, mano"
                });
            }
        }
    }
}
const security = new Security();
exports.default = security;
