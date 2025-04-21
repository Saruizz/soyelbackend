"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Turno {
    constructor(codTurno, codParqueadero, desc, fecha, horaI, horaF) {
        this._codTurno = codTurno;
        this._codParqueadero = codParqueadero;
        this._descripcionTurno = desc;
        this._fechaTurno = fecha;
        this._horaIncioTurno = horaI;
        this._horaFinTurno = horaF;
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
        return this._horaIncioTurno;
    }
    get horaFinTurno() {
        return this._horaFinTurno;
    }
    set codTurno(codTurno) {
        this._codTurno = codTurno;
    }
    set codParqueadero(codParqueadero) {
        this._codParqueadero = codParqueadero;
    }
    set descripcionTurno(desc) {
        this._descripcionTurno = desc;
    }
    set fechaTurno(fecha) {
        this._fechaTurno = fecha;
    }
    set horaInicioTurno(horaI) {
        this._horaIncioTurno = horaI;
    }
    set horaFinTurno(horaF) {
        this._horaFinTurno = horaF;
    }
}
exports.default = Turno;
