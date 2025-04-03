class Ingreso {
    private _codIngreso: number;
    private _codUsuario: number;
    private _fechaIngreso: Date;
    private _horaIngreso: Date;

    constructor(codIngreso: number, codUsu: number, fechaIngr: Date, horaIngr: Date) {
        this._codIngreso = codIngreso;
        this._codUsuario = codUsu;
        this._fechaIngreso = fechaIngr;
        this._horaIngreso = horaIngr;
    }

    public get codIngreso(): number {
        return this._codIngreso;
    }
    public get codUsuario(): number {
        return this._codUsuario
    }
    public get fechaIngreso(): Date {
        return this._fechaIngreso
    }
    public get horaIngreso(): Date {
        return this._horaIngreso
    }

    public set codIngreso(codIngr: number) {
        this._codIngreso = codIngr;
    }
    public set codUsuario(codUsu: number) {
        this._codUsuario = codUsu;
    }
    public set fechaIngreso(fechIngr: Date) {
        this._fechaIngreso = fechIngr;
    }
    public set horaIngreso(horaIngr: Date) {
        this._horaIngreso = horaIngr;
    }
}

export default Ingreso;