import express from "express";
import cors from "cors";
import morgan from "morgan";
import rutaRolApi from "../../app/rol/route/RutaRol";
import rutaTipoVehiculoApi from "../../app/tipo_vehiculo/route/RutaTipoVehiculo";
import rutaTarifaDiariaApi from "../../app/tarifa_diaria/route/RutaTarifaDiaria";
import rutaLoginApi from "../../app/Login/route/RutaLogin";
import security from "../../middleware/Security";
import rutaTurnoApi from "../../app/turno/route/RutaTurno";
import rutaParqueaderoApi from "../../app/parqueadero/route/RutaParqueadero";
import rutaUbicacionApi from "../../app/ubicaciones/route/RutaUbicacion";
import rutaRelTurnoUsuarioApi from "../../app/rel-turno-usuario/route/RutaRelTurnoUsuario";
import rutasUser from "../../app/usuarios/route/routeUser";
import routeIncome from "../../app/ingresos/route/RouteIncome";
import routeAccess from "../../app/accesos/route/RouteAccess";
import routeFunctionalityApi from "../../app/funcionalidades/route/routeFunctionality";
import routeRelRolFunctionality from "../../app/rel_rol_functionalidad/route/RouteRelRolFuncionality";
import routeRelUserFunctionality from "../../app/rel_usuario_funcionalidad/route/RouteRelUserFunctionality";
import rutaPuestoApi from "../../app/puesto/route/RutaPuesto";
import rutaServicioDiarioApi from "../../app/servicio_diario/route/RutaServicioDiario";
import rutaVehiculoApi from "../../app/vehiculos/route/RutaVehiculo";
//joan
//Miguel
//Wilson
//Sebastian
//Eduardo

class Servidor {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.set("PORT", 3123); // Solo un set para el puerto
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "100Mb" }));
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/api/rol", rutaRolApi);
    this.app.use("/api/tipo_vehiculo", rutaTipoVehiculoApi);

    this.app.use("/api/tarifa_diaria", security.check, rutaTarifaDiariaApi);

    this.app.use("/api/login", rutaLoginApi);
    this.app.use("/api/turno", rutaTurnoApi);
    this.app.use("/api/rel_turno_usuario", rutaRelTurnoUsuarioApi);
    //joan
    //Miguel
    this.app.use("/api/turno", rutaTurnoApi);
    this.app.use("/api/parqueadero", rutaParqueaderoApi);
    this.app.use("/api/ubicacion", rutaUbicacionApi);

    this.app.use("/api/usuarios", rutasUser);
    this.app.use("/api/ingresos", routeIncome);
    this.app.use("/api/acceso", routeAccess);
    this.app.use("/api/funcionalidades", routeFunctionalityApi);
    this.app.use("/api/rel_rol_functionality", routeRelRolFunctionality);
    this.app.use("/api/rel_user_functionality", routeRelUserFunctionality);
    //Wilson
    //Sebastian
    this.app.use("/api/vehiculo", rutaVehiculoApi);
    //Eduardo
    this.app.use("/api/puesto", rutaPuestoApi);
    this.app.use("/api/servicio_diario", rutaServicioDiarioApi);
  }

  public arranquelo(): void {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("Listo el backend en el puerto ", this.app.get("PORT"));
    });
  }
}

export default Servidor;
