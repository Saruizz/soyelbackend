"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vehiculo {
    constructor(codVehiculo, codTipoVehiculo, codUsuario, placaVehiculo) {
        this._codVehiculo = codVehiculo;
        this._codTipoVehiculo = codTipoVehiculo;
        this._codUsuario = codUsuario;
        this._placaVehiculo = placaVehiculo;
    }
    get codVehiculo() {
        return this._codVehiculo;
    }
    get codTipoVehiculo() {
        return this._codTipoVehiculo;
    }
    get codUsuario() {
        return this._codUsuario;
    }
    get placaVehiculo() {
        return this._placaVehiculo;
    }
    set codVehiculo(codVehiculo) {
        this._codVehiculo = codVehiculo;
    }
    set codTipoVehiculo(codTipoVehiculo) {
        this._codTipoVehiculo = codTipoVehiculo;
    }
    set codUsuario(codUsuario) {
        this._codUsuario = codUsuario;
    }
    set placaVehiculo(placaVehiculo) {
        this._placaVehiculo = placaVehiculo;
    }
}
exports.default = Vehiculo;
