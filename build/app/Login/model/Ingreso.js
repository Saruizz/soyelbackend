"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ingreso {
    constructor(codIngreso, codUsu, fechaIngr, horaIngr) {
        this._codIngreso = codIngreso;
        this._codUsuario = codUsu;
        this._fechaIngreso = fechaIngr;
        this._horaIngreso = horaIngr;
    }
    get codIngreso() {
        return this._codIngreso;
    }
    get codUsuario() {
        return this._codUsuario;
    }
    get fechaIngreso() {
        return this._fechaIngreso;
    }
    get horaIngreso() {
        return this._horaIngreso;
    }
    set codIngreso(codIngr) {
        this._codIngreso = codIngr;
    }
    set codUsuario(codUsu) {
        this._codUsuario = codUsu;
    }
    set fechaIngreso(fechIngr) {
        this._fechaIngreso = fechIngr;
    }
    set horaIngreso(horaIngr) {
        this._horaIngreso = horaIngr;
    }
}
exports.default = Ingreso;
