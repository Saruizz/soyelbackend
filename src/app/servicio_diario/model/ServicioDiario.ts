class ServicioDiario{
 private _codServicioDiario: number;
    private _codParqueadero: number;
    private _codVehiculo: number;
    private _codPuesto: number;
    private _FechaInicioServicioDiario: Date;
    private _FechaFinServicioDiario: Date;
    private _valorServicioDiario: number;


    constructor(codServicioDiario: number, codParqueadero: number, codVehiculo: number, codPuesto: number, fechaInicio: Date, fechaFin: Date, valor: number) {
        this._codServicioDiario = codServicioDiario;
        this._codParqueadero = codParqueadero;
        this._codVehiculo = codVehiculo;
        this._codPuesto = codPuesto;
        this._FechaInicioServicioDiario = fechaInicio;
        this._FechaFinServicioDiario = fechaFin;
        this._valorServicioDiario = valor;
    }

    public get codServicioDiario(): number {
        return this._codServicioDiario;
    }

    public get codParqueadero(): number {
        return this._codParqueadero;
    }

    public get codVehiculo(): number {
        return this._codVehiculo;
    }

    public get codPuesto(): number {
        return this._codPuesto;
    }

    public get fechaInicio(): Date {
        return this._FechaInicioServicioDiario;
    }

    public get fechaFin(): Date {
        return this._FechaFinServicioDiario;
    }

    public get valorServicioDiario(): number {
        return this._valorServicioDiario;
    }

    public set codServicioDiario(cod: number) {
        this._codServicioDiario = cod;
    }

    public set codParqueadero(cod: number) {
        this._codParqueadero = cod;
    }

    public set codVehiculo(cod: number) {
        this._codVehiculo = cod;
    }

    public set codPuesto(cod: number) {
        this._codPuesto = cod;
    }

    public set fechaInicio(fecha: Date) {
        this._FechaInicioServicioDiario = fecha;
    }

    public set fechaFin(fecha: Date) {
        this._FechaFinServicioDiario = fecha;
    }

    public set valorServicioDiario(valor: number) {
        this._valorServicioDiario = valor;
    }



}
export default ServicioDiario