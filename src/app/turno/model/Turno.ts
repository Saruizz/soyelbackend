class Turno {
    private _codTurno: number;
    private _codParqueadero: number;
    private _descripcionTurno: string;
    private _fechaTurno: string;
    private _horaIncioTurno: string;
    private _horaFinTurno: string;

    constructor(codTurno: number, codParqueadero: number, desc: string, fecha: string, horaI: string, horaF: string ){
        this._codTurno = codTurno;
        this._codParqueadero = codParqueadero;
        this._descripcionTurno = desc;
        this._fechaTurno = fecha;
        this._horaIncioTurno = horaI;
        this._horaFinTurno = horaF;
    }

    public get codTurno(): number{
        return this._codTurno;
    }

    public get codParqueadero(): number{
        return this._codParqueadero;
    }

    public get descripcionTurno(): string{
        return this._descripcionTurno;
    }

    public get fechaTurno(): string{
        return this._fechaTurno;
    }

    public get horaInicioTurno(): string{
        return this._horaIncioTurno;
    }

    public  get horaFinTurno(): string{
        return this._horaFinTurno;
    }

    public set codTurno(codTurno: number){
        this._codTurno = codTurno;
    }

    public set codParqueadero(codParqueadero: number){
        this._codParqueadero=codParqueadero;
    }

    public set descripcionTurno(desc: string){
        this._descripcionTurno = desc;
    }

    public set fechaTurno(fecha: string){
        this._fechaTurno= fecha;
    }

    public set horaInicioTurno(horaI: string){
        this._horaIncioTurno = horaI;
    }

    public  set horaFinTurno(horaF: string){
        this._horaFinTurno = horaF;
    }

}
export default Turno;