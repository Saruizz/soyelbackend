"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RelUserFunctionality {
    constructor(cod_usuario, cod_funcionalidad) {
        this._cod_usuario = cod_usuario;
        this._cod_funcionalidad = cod_funcionalidad;
    }
    get codUsuario() {
        return this._cod_usuario;
    }
    get codFuncionalidad() {
        return this._cod_funcionalidad;
    }
    set codUsuario(cod_usuario) {
        this._cod_usuario = cod_usuario;
    }
    set codFuncionalidad(cod_funcionalidad) {
        this._cod_funcionalidad = cod_funcionalidad;
    }
}
exports.default = RelUserFunctionality;
