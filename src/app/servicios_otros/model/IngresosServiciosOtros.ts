import ServiciosOtros from "./ServiciosOtros";

class IngresosServiciosOtros {
    // Propiedades del modelo
    private _codIngreso: number;
    private _servicio: ServiciosOtros;
    private _fechaIngreso: Date;
    private _cantidad: number;
    private _totalIngreso: number;
    private _observaciones: string;

    // Constructor
    constructor(
        codIngreso: number,
        servicio: ServiciosOtros,
        fechaIngreso: Date = new Date(),
        cantidad: number = 1,
        totalIngreso: number = 0,
        observaciones: string = ""
    ) {
        this._codIngreso = codIngreso;
        this._servicio = servicio;
        this._fechaIngreso = fechaIngreso;
        this._cantidad = cantidad;
        this._totalIngreso = totalIngreso;
        this._observaciones = observaciones;
    }

    // Getters y setters
    public get codIngreso(): number {
        return this._codIngreso;
    }
    public set codIngreso(value: number) {
        this._codIngreso = value;
    }

    public get servicio(): ServiciosOtros {
        return this._servicio;
    }
    public set servicio(value: ServiciosOtros) {
        this._servicio = value;
    }

    public get fechaIngreso(): Date {
        return this._fechaIngreso;
    }
    public set fechaIngreso(value: Date) {
        this._fechaIngreso = value;
    }

    public get cantidad(): number {
        return this._cantidad;
    }
    public set cantidad(value: number) {
        this._cantidad = value;
    }

    public get totalIngreso(): number {
        return this._totalIngreso;
    }
    public set totalIngreso(value: number) {
        this._totalIngreso = value;
    }

    public get observaciones(): string {
        return this._observaciones;
    }
    public set observaciones(value: string) {
        this._observaciones = value;
    }

    // Método para calcular el total del ingreso
    public calcularTotal(): void {
        this._totalIngreso = this._servicio.precio * this._cantidad;
    }
}

export default IngresosServiciosOtros;