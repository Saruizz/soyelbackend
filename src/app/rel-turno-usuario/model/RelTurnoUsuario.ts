class RelTurnoUsuario {
    private _codTurnoUsuario: number;
    private _codTurno: number;
    private _codUsuario: number;

    constructor(codTurnoUsuario: number, codTurno: number, codUsuario: number) {
        this._codTurnoUsuario = codTurnoUsuario;
        this._codTurno = codTurno;
        this._codUsuario = codUsuario;
    }

    public get codTurnoUsuario(): number {
        return this._codTurnoUsuario;
    }

    public get codTurno(): number {
        return this._codTurno;
    }

    public get codUsuario(): number {
        return this._codUsuario;
    }

    public set codTurnoUsuario(value: number) {
        this._codTurnoUsuario = value;
    }

    public set codTurno(value: number) {
        this._codTurno = value;
    }

    public set codUsuario(value: number) {
        this._codUsuario = value;
    }
}

export default RelTurnoUsuario;
