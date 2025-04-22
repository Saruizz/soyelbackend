"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Puesto {
    constructor(codPuesto, codParqueadero, codTipoVehiculo, detallePuesto) {
        this._codPuesto = codPuesto;
        this._codParqueadero = codParqueadero;
        this._codTipoVehiculo = codTipoVehiculo;
        this._detallePuesto = detallePuesto;
    }
    get codPuesto() {
        return this._codPuesto;
    }
    get codParqueadero() {
        return this._codParqueadero;
    }
    get codTipoVehiculo() {
        return this._codTipoVehiculo;
    }
    get detallePuesto() {
        return this._detallePuesto;
    }
    set codPuesto(cod) {
        this._codPuesto = cod;
    }
    set codParqueadero(cod) {
        this._codParqueadero = cod;
    }
    set codTipoVehiculo(cod) {
        this._codTipoVehiculo = cod;
    }
    set detallePuesto(detalle) {
        this._detallePuesto = detalle;
    }
}
exports.default = Puesto;
