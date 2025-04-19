class RelUserFunctionality{
    private _cod_usuario:number;
    private _cod_funcionalidad:number;

    constructor(cod_usuario:number,cod_funcionalidad:number){
        this._cod_usuario = cod_usuario;
        this._cod_funcionalidad = cod_funcionalidad;
    }

    get codUsuario(): number {
        return this._cod_usuario;
    }

    get codFuncionalidad(): number {
        return this._cod_funcionalidad;
    }

    set codUsuario(cod_usuario: number) {
        this._cod_usuario = cod_usuario;
    }

    set codFuncionalidad(cod_funcionalidad: number) {
        this._cod_funcionalidad = cod_funcionalidad;
    }
}

export default RelUserFunctionality;
