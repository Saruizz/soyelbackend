class Rel_rol_funcionalidad {
    private _cod_rol: number;
    private _cod_funcionalidad: number;

    constructor(cod_rol: number, cod_funcionalidad: number) {
        this._cod_rol = cod_rol;
        this._cod_funcionalidad = cod_funcionalidad;
    }

    get cod_rol() {
        return this.cod_rol;
    }

    set cod_rol(cod_rol: number) {
        this.cod_rol = cod_rol;
    }

    get cod_funcionalidad() {
        return this.cod_funcionalidad;
    }

    set cod_funcionalidad(cod_funcionalidad: number) {
        this.cod_funcionalidad = cod_funcionalidad;
    }
}
export default Rel_rol_funcionalidad;