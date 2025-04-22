class Vehiculo {
    private _codVehiculo: number;
    private _codTipoVehiculo: number;
    private _codUsuario: number;
    private _placaVehiculo: String;

    constructor(
        codVehiculo: number,
        codTipoVehiculo: number,
        codUsuario: number,
        placaVehiculo: String
    ) {
        this._codVehiculo = codVehiculo;
        this._codTipoVehiculo = codTipoVehiculo;
        this._codUsuario = codUsuario;
        this._placaVehiculo = placaVehiculo;
    }

    public get codVehiculo(): number {
        return this._codVehiculo;
    }

    public get codTipoVehiculo(): number {
        return this._codTipoVehiculo;
    }

    public get codUsuario(): number {
        return this._codUsuario;
    }

    public get placaVehiculo(): String {
        return this._placaVehiculo;
    }

    public set codVehiculo(codVehiculo: number) {
        this._codVehiculo = codVehiculo;
    }

    public set codTipoVehiculo(codTipoVehiculo: number) {
        this._codTipoVehiculo = codTipoVehiculo;
    }

    public set codUsuario(codUsuario: number) {
        this._codUsuario = codUsuario;
    }

    public set placaVehiculo(placaVehiculo: String) {
        this._placaVehiculo = placaVehiculo;
    }
}

export default Vehiculo;
