"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TarifaDiaria {
    constructor(codParqueadero, codTpVh, valor) {
        this._codParqueadero = codParqueadero;
        this._codTipoVehiculo = codTpVh;
        this._valorTarifaDiaria = valor;
    }
    get codTipoVehiculo() {
        return this._codTipoVehiculo;
    }
    get codParqueadero() {
        return this._codParqueadero;
    }
    get valorTarifaDiaria() {
        return this._valorTarifaDiaria;
    }
    set codTipoVehiculo(cod) {
        this._codTipoVehiculo = cod;
    }
    set codParqueadero(cod) {
        this._codParqueadero = cod;
    }
    set valorTarifaDiaria(valor) {
        this._valorTarifaDiaria = valor;
    }
}
exports.default = TarifaDiaria;
