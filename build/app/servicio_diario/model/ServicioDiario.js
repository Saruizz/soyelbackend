"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServicioDiario {
    constructor(codServicioDiario, codParqueadero, codVehiculo, codPuesto, fechaInicio, fechaFin, valor) {
        this._codServicioDiario = codServicioDiario;
        this._codParqueadero = codParqueadero;
        this._codVehiculo = codVehiculo;
        this._codPuesto = codPuesto;
        this._FechaInicioServicioDiario = fechaInicio;
        this._FechaFinServicioDiario = fechaFin;
        this._valorServicioDiario = valor;
    }
    get codServicioDiario() {
        return this._codServicioDiario;
    }
    get codParqueadero() {
        return this._codParqueadero;
    }
    get codVehiculo() {
        return this._codVehiculo;
    }
    get codPuesto() {
        return this._codPuesto;
    }
    get fechaInicio() {
        return this._FechaInicioServicioDiario;
    }
    get fechaFin() {
        return this._FechaFinServicioDiario;
    }
    get valorServicioDiario() {
        return this._valorServicioDiario;
    }
    set codServicioDiario(cod) {
        this._codServicioDiario = cod;
    }
    set codParqueadero(cod) {
        this._codParqueadero = cod;
    }
    set codVehiculo(cod) {
        this._codVehiculo = cod;
    }
    set codPuesto(cod) {
        this._codPuesto = cod;
    }
    set fechaInicio(fecha) {
        this._FechaInicioServicioDiario = fecha;
    }
    set fechaFin(fecha) {
        this._FechaFinServicioDiario = fecha;
    }
    set valorServicioDiario(valor) {
        this._valorServicioDiario = valor;
    }
}
exports.default = ServicioDiario;
