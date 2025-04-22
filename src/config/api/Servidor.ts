import express from "express";
import cors from "cors";
import morgan from "morgan";
import rutaRolApi from "../../app/rol/route/RutaRol";
import rutaTipoVehiculoApi from "../../app/tipo_vehiculo/route/RutaTipoVehiculo";
import rutaTarifaDiariaApi from "../../app/tarifa_diaria/route/RutaTarifaDiaria";
import rutaLoginApi from "../../app/Login/route/RutaLogin";

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
        this.app.use("/api/tarifa_diaria", rutaTarifaDiariaApi);
        this.app.use("/api/login", rutaLoginApi);

    }

    public arranquelo(): void {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo el backend en el puerto ", this.app.get("PORT"));
        });
    }
}

export default Servidor;