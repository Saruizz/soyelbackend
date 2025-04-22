"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rel_rol_funcionalidad {
    constructor(cod_rol, cod_funcionalidad) {
        this._cod_rol = cod_rol;
        this._cod_funcionalidad = cod_funcionalidad;
    }
    get cod_rol() {
        return this.cod_rol;
    }
    set cod_rol(cod_rol) {
        this.cod_rol = cod_rol;
    }
    get cod_funcionalidad() {
        return this.cod_funcionalidad;
    }
    set cod_funcionalidad(cod_funcionalidad) {
        this.cod_funcionalidad = cod_funcionalidad;
    }
}
exports.default = Rel_rol_funcionalidad;
