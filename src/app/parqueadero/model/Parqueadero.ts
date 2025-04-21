class Parqueadero{
    private _codParqueadero: number;
    private _codUbicacion: number;
    private _nombreParqueadero: string;
    private _dirParqueadero: string;
    private _telParqueadero: string;

    constructor(codP: number, codU: number, nombreP: string, dirP: string, telP: string ){
        this._codParqueadero = codP;
        this._codUbicacion = codU;
        this._nombreParqueadero = nombreP;
        this._dirParqueadero = dirP;
        this._telParqueadero = telP;
    }

    get codParqueadero(): number {
        return this._codParqueadero;
    }

    get codUbicacion(): number {
        return this._codUbicacion;
    }

    get nombreParqueadero(): string {
        return this._nombreParqueadero;
    }

    get dirParqueadero(): string {
        return this._dirParqueadero;
    }

    get telParqueadero(): string {
        return this._telParqueadero;
    }

    set codParqueadero(codP: number) {
        this._codParqueadero = codP;
    }

    set codUbicacion(codU: number) {
        this._codUbicacion = codU;
    }

    set nombreParqueadero(nombreP: string) {
        this._nombreParqueadero = nombreP;
    }

    set dirParqueadero(dirP: string) {
        this._dirParqueadero = dirP;
    }

    set telParqueadero(telP: string) {
        this._telParqueadero = telP;
    }

}
export default Parqueadero;