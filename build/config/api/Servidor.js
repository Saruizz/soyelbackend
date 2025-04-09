"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const RutaRol_1 = __importDefault(require("../../app/rol/route/RutaRol"));
const RutaTipoVehiculo_1 = __importDefault(require("../../app/tipo_vehiculo/route/RutaTipoVehiculo"));
const RutaTarifaDiaria_1 = __importDefault(require("../../app/tarifa_diaria/route/RutaTarifaDiaria"));
const RutaLogin_1 = __importDefault(require("../../app/Login/route/RutaLogin"));
const Security_1 = __importDefault(require("../../middleware/Security"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.set("PORT", 3123); // Solo un set para el puerto
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json({ limit: "100Mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use("/api/rol", RutaRol_1.default);
        this.app.use("/api/tipo_vehiculo", RutaTipoVehiculo_1.default);
        this.app.use("/api/tarifa_diaria", Security_1.default.check, RutaTarifaDiaria_1.default);
        this.app.use("/api/login", RutaLogin_1.default);
    }
    arranquelo() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo el backend en el puerto ", this.app.get("PORT"));
        });
    }
}
exports.default = Servidor;
