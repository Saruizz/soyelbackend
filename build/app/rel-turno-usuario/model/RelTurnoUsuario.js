"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RelTurnoUsuario {
    constructor(codTurnoUsuario, codTurno, codUsuario) {
        this._codTurnoUsuario = codTurnoUsuario;
        this._codTurno = codTurno;
        this._codUsuario = codUsuario;
    }
    get codTurnoUsuario() {
        return this._codTurnoUsuario;
    }
    get codTurno() {
        return this._codTurno;
    }
    get codUsuario() {
        return this._codUsuario;
    }
    set codTurnoUsuario(value) {
        this._codTurnoUsuario = value;
    }
    set codTurno(value) {
        this._codTurno = value;
    }
    set codUsuario(value) {
        this._codUsuario = value;
    }
}
exports.default = RelTurnoUsuario;
