class Ingreso {
    private _codUsuario: number;
    private _fechaIngreso: Date;
    private _horaIngreso: Date;
    private _codIngreso?: number;

    constructor(codUsuario: number, fechaIngreso: Date, horaIngreso: Date, codIngreso?: number) {
        this._codUsuario = codUsuario;
        this._fechaIngreso = fechaIngreso;
        this._horaIngreso = horaIngreso;
        this._codIngreso = codIngreso;
    }    

    public get codUsuario(): number {
        return this._codUsuario;
    }

    public set codUsuario(codUsuario: number) {
        this._codUsuario = codUsuario;
    }

    public get fechaIngreso(): Date {
        return this._fechaIngreso;
    }

    public set fechaIngreso(fechaIngreso: Date) {
        this._fechaIngreso = fechaIngreso;
    }

    public get horaIngreso(): Date {
        return this._horaIngreso;
    }

    public set horaIngreso(horaIngreso: Date) {
        this._horaIngreso = horaIngreso;
    }

    public get codIngreso(): number {
        return this._codIngreso!;
    }

    public set codIngreso(codIngreso: number) {
        this._codIngreso = codIngreso;
    }
}

export default Ingreso;
