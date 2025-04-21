class Ubicacion{
    private _codUbicacion: number;
    private _codPadreUbicacion: number;
    private _codExternoUbicacion: string;
    private _nombreUbicacion: string;

    constructor(codU: number, codP: number, codExterno: string, nombreU: string ){
        this._codUbicacion = codU;
        this._codPadreUbicacion = codP;
        this._codExternoUbicacion = codExterno;
        this._nombreUbicacion = nombreU;
    }

    get codUbicacion(): number {
        return this._codUbicacion;
    }

    get codPadreUbicacion(): number {
        return this._codPadreUbicacion;
    }

    get codExternoUbicacion(): string {
        return this._codExternoUbicacion;
    }

    get nombreUbicacion(): string {
        return this._nombreUbicacion;
    }

    set codUbicacion(codU: number) {
        this._codUbicacion = codU;
    }

    set codPadreUbicacion(codP: number) {
        this._codPadreUbicacion = codP;
    }

    set codExternoUbicacion(codExterno: string) {
        this._codExternoUbicacion = codExterno;
    }

    set nombreUbicacion(nombreU: string) {
        this._nombreUbicacion = nombreU;
    }

}
export default Ubicacion;