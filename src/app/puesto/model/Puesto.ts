class Puesto {
  private _codPuesto: number;
  private _codParqueadero: number;
  private _codTipoVehiculo: number;
  private _detallePuesto: string;

  constructor(
    codPuesto: number,
    codParqueadero: number,
    codTipoVehiculo: number,
    detallePuesto: string
  ) {
    this._codPuesto = codPuesto;
    this._codParqueadero = codParqueadero;
    this._codTipoVehiculo = codTipoVehiculo;
    this._detallePuesto = detallePuesto;
  }

  public get codPuesto(): number {
    return this._codPuesto;
  }

  public get codParqueadero(): number {
    return this._codParqueadero;
  }

  public get codTipoVehiculo(): number {
    return this._codTipoVehiculo;
  }

  public get detallePuesto(): string {
    return this._detallePuesto;
  }

  public set codPuesto(cod: number) {
    this._codPuesto = cod;
  }

  public set codParqueadero(cod: number) {
    this._codParqueadero = cod;
  }

  public set codTipoVehiculo(cod: number) {
    this._codTipoVehiculo = cod;
  }

  public set detallePuesto(detalle: string) {
    this._detallePuesto = detalle;
  }
}
export default Puesto;
