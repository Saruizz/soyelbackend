"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

class Turno {
    constructor(cod, parqueadero, descripcion, fecha, horaInicio, horaFin) {
        this._codTurno = cod;
        this._codParqueadero = parqueadero;
        this._descripcionTurno = descripcion;
        this._fechaTurno = fecha;
        this._horaInicioTurno = horaInicio;
        this._horaFinTurno = horaFin;
    }

    get codTurno() {
        return this._codTurno;
    }

    get codParqueadero() {
        return this._codParqueadero;
    }

    get descripcionTurno() {
        return this._descripcionTurno;
    }

    get fechaTurno() {
        return this._fechaTurno;
    }

    get horaInicioTurno() {
        return this._horaInicioTurno;
    }

    get horaFinTurno() {
        return this._horaFinTurno;
    }

    set codTurno(cod) {
        this._codTurno = cod;
    }

    set codParqueadero(parqueadero) {
        this._codParqueadero = parqueadero;
    }

    set descripcionTurno(descripcion) {
        this._descripcionTurno = descripcion;
    }

    set fechaTurno(fecha) {
        this._fechaTurno = fecha;
    }

    set horaInicioTurno(horaInicio) {
        this._horaInicioTurno = horaInicio;
    }

    set horaFinTurno(horaFin) {
        this._horaFinTurno = horaFin;
    }
}

exports.default = Turno;
