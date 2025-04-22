"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Functionality {
    constructor(codFuncionalidad, codPadreFuncionalidad, nombreFuncionalidad, urlFuncionalidad) {
        this._codFuncionalidad = codFuncionalidad;
        this._codPadreFuncionalidad = codPadreFuncionalidad;
        this._nombreFuncionalidad = nombreFuncionalidad;
        this._urlFuncionalidad = urlFuncionalidad;
    }
    get codFuncionalidad() {
        return this._codFuncionalidad;
    }
    set codFuncionalidad(codFuncionalidad) {
        this._codFuncionalidad = codFuncionalidad;
    }
    get codPadreFuncionalidad() {
        return this._codPadreFuncionalidad;
    }
    set codPadreFuncionalidad(codPadreFuncionalidad) {
        this._codPadreFuncionalidad = codPadreFuncionalidad;
    }
    get nombreFuncionalidad() {
        return this._nombreFuncionalidad;
    }
    set nombreFuncionalidad(nombreFuncionalidad) {
        this._nombreFuncionalidad = nombreFuncionalidad;
    }
    get urlFuncionalidad() {
        return this._urlFuncionalidad;
    }
    set urlFuncionalidad(urlFuncionalidad) {
        this._urlFuncionalidad = urlFuncionalidad;
    }
}
exports.default = Functionality;
