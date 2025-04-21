"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parqueadero {
    constructor(codP, codU, nombreP, dirP, telP) {
        this._codParqueadero = codP;
        this._codUbicacion = codU;
        this._nombreParqueadero = nombreP;
        this._dirParqueadero = dirP;
        this._telParqueadero = telP;
    }
    get codParqueadero() {
        return this._codParqueadero;
    }
    get codUbicacion() {
        return this._codUbicacion;
    }
    get nombreParqueadero() {
        return this._nombreParqueadero;
    }
    get dirParqueadero() {
        return this._dirParqueadero;
    }
    get telParqueadero() {
        return this._telParqueadero;
    }
    set codParqueadero(codP) {
        this._codParqueadero = codP;
    }
    set codUbicacion(codU) {
        this._codUbicacion = codU;
    }
    set nombreParqueadero(nombreP) {
        this._nombreParqueadero = nombreP;
    }
    set dirParqueadero(dirP) {
        this._dirParqueadero = dirP;
    }
    set telParqueadero(telP) {
        this._telParqueadero = telP;
    }
}
exports.default = Parqueadero;
