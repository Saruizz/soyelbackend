class TipoVehiculo {
    private _codTipoVehiculo: number;
    private _claseTipoVehiculo: string;

    constructor(cod: number, nom: string) {
        this._codTipoVehiculo = cod;
        this._claseTipoVehiculo = nom;
    }

    public get codTipoVehiculo(): number {
        return this._codTipoVehiculo;
    }

    public get claseTipoVehiculo(): string {
        return this._claseTipoVehiculo;
    }

    public set codTipoVehiculo(cod: number) {
        this._codTipoVehiculo = cod;
    }

    public set claseTipoVehiculo(nom: string) {
        this._claseTipoVehiculo = nom;
    }
}

export default TipoVehiculo;