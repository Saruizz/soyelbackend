"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Acceso {
    constructor(codUsuario, correoAccs, claveAccs, uuidAcceso) {
        this._codUsuario = codUsuario;
        this._correoAcceso = correoAccs;
        this._claveAcceso = claveAccs;
        this._uuidAcceso = uuidAcceso;
    }
    get codUsuario() {
        return this._codUsuario;
    }
    get correoAcceso() {
        return this._correoAcceso;
    }
    get claveAcceso() {
        return this._claveAcceso;
    }
    get uuidAcceso() {
        return this._uuidAcceso;
    }
    set codUsuario(cod) {
        this._codUsuario = cod;
    }
    set correoAcceso(correo) {
        this._correoAcceso = correo;
    }
    set claveAcceso(clave) {
        this._claveAcceso = clave;
    }
    set uuidAcceso(idAccs) {
        this._uuidAcceso = idAccs;
    }
}
exports.default = Acceso;
