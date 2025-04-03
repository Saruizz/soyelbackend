"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TipoVehiculo {
    constructor(cod, nom) {
        this._codTipoVehiculo = cod;
        this._claseTipoVehiculo = nom;
    }
    get codTipoVehiculo() {
        return this._codTipoVehiculo;
    }
    get claseTipoVehiculo() {
        return this._claseTipoVehiculo;
    }
    set codTipoVehiculo(cod) {
        this._codTipoVehiculo = cod;
    }
    set claseTipoVehiculo(nom) {
        this._claseTipoVehiculo = nom;
    }
}
exports.default = TipoVehiculo;
