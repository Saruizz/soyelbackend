"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ubicacion {
    constructor(codU, codP, codExterno, nombreU) {
        this._codUbicacion = codU;
        this._codPadreUbicacion = codP;
        this._codExternoUbicacion = codExterno;
        this._nombreUbicacion = nombreU;
    }
    get codUbicacion() {
        return this._codUbicacion;
    }
    get codPadreUbicacion() {
        return this._codPadreUbicacion;
    }
    get codExternoUbicacion() {
        return this._codExternoUbicacion;
    }
    get nombreUbicacion() {
        return this._nombreUbicacion;
    }
    set codUbicacion(codU) {
        this._codUbicacion = codU;
    }
    set codPadreUbicacion(codP) {
        this._codPadreUbicacion = codP;
    }
    set codExternoUbicacion(codExterno) {
        this._codExternoUbicacion = codExterno;
    }
    set nombreUbicacion(nombreU) {
        this._nombreUbicacion = nombreU;
    }
}
exports.default = Ubicacion;
