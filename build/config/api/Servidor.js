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
const RutaTurno_1 = __importDefault(require("../../app/turno/route/RutaTurno"));
const RutaParqueadero_1 = __importDefault(require("../../app/parqueadero/route/RutaParqueadero"));
const RutaUbicacion_1 = __importDefault(require("../../app/ubicaciones/route/RutaUbicacion"));
const RutaRelTurnoUsuario_1 = __importDefault(require("../../app/rel-turno-usuario/route/RutaRelTurnoUsuario"));
const routeUser_1 = __importDefault(require("../../app/usuarios/route/routeUser"));
const RouteIncome_1 = __importDefault(require("../../app/ingresos/route/RouteIncome"));
const RouteAccess_1 = __importDefault(require("../../app/accesos/route/RouteAccess"));
const routeFunctionality_1 = __importDefault(require("../../app/funcionalidades/route/routeFunctionality"));
const RouteRelRolFuncionality_1 = __importDefault(require("../../app/rel_rol_functionalidad/route/RouteRelRolFuncionality"));
const RouteRelUserFunctionality_1 = __importDefault(require("../../app/rel_usuario_funcionalidad/route/RouteRelUserFunctionality"));
const RutaPuesto_1 = __importDefault(require("../../app/puesto/route/RutaPuesto"));
const RutaServicioDiario_1 = __importDefault(require("../../app/servicio_diario/route/RutaServicioDiario"));
const RutaVehiculo_1 = __importDefault(require("../../app/vehiculos/route/RutaVehiculo"));
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
        this.app.use("/api/turno", Security_1.default.check, RutaTurno_1.default);
        this.app.use("/api/rel_turno_usuario", Security_1.default.check, RutaRelTurnoUsuario_1.default);
        this.app.use("/api/parqueadero", Security_1.default.check, RutaParqueadero_1.default);
        this.app.use("/api/ubicacion", Security_1.default.check, RutaUbicacion_1.default);
        this.app.use("/api/usuarios", Security_1.default.check, routeUser_1.default);
        this.app.use("/api/ingresos", Security_1.default.check, RouteIncome_1.default);
        this.app.use("/api/acceso", Security_1.default.check, RouteAccess_1.default);
        this.app.use("/api/funcionalidades", Security_1.default.check, routeFunctionality_1.default);
        this.app.use("/api/rel_rol_functionality", Security_1.default.check, RouteRelRolFuncionality_1.default);
        this.app.use("/api/rel_user_functionality", Security_1.default.check, RouteRelUserFunctionality_1.default);
        this.app.use("/api/vehiculo", Security_1.default.check, RutaVehiculo_1.default);
        this.app.use("/api/puesto", Security_1.default.check, RutaPuesto_1.default);
        this.app.use("/api/servicio_diario", Security_1.default.check, RutaServicioDiario_1.default);
    }
    arranquelo() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo el backend en el puerto ", this.app.get("PORT"));
        });
    }
}
exports.default = Servidor;
