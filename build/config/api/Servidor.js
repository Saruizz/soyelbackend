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
//joan
//Miguel
//Wilson
//Sebastian
//Eduardo
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
        this.app.use("/api/turno", RutaTurno_1.default);
        this.app.use("/api/rel_turno_usuario", RutaRelTurnoUsuario_1.default);
        //joan
        //Miguel
        this.app.use("/api/turno", RutaTurno_1.default);
        this.app.use("/api/parqueadero", RutaParqueadero_1.default);
        this.app.use("/api/ubicacion", RutaUbicacion_1.default);
        this.app.use("/api/usuarios", routeUser_1.default);
        this.app.use("/api/ingresos", RouteIncome_1.default);
        this.app.use("/api/acceso", RouteAccess_1.default);
        this.app.use("/api/funcionalidades", routeFunctionality_1.default);
        this.app.use("/api/rel_rol_functionality", RouteRelRolFuncionality_1.default);
        this.app.use("/api/rel_user_functionality", RouteRelUserFunctionality_1.default);
        //Wilson
        //Sebastian
        this.app.use("api/vehiculo", RutaVehiculo_1.default);
        //Eduardo
        this.app.use("/api/puesto", RutaPuesto_1.default);
        this.app.use("/api/servicio_diario", RutaServicioDiario_1.default);
    }
    arranquelo() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo el backend en el puerto ", this.app.get("PORT"));
        });
    }
}
exports.default = Servidor;
