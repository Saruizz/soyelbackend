
class ServiciosOtros {
    // Propiedades del modelo
    private _codServicio: number;
    private _nombreServicio: string;
    private _descripcion: string;
    private _precio: number;
    private _estado: boolean;

    // Constructor
    constructor(
        codServicio: number,
        nombreServicio: string,
        descripcion: string = "",
        precio: number = 0,
        estado: boolean = true
    ) {
        this._codServicio = codServicio;
        this._nombreServicio = nombreServicio;
        this._descripcion = descripcion;
        this._precio = precio;
        this._estado = estado;
    }

    // Getters y setters
    public get codServicio(): number {
        return this._codServicio;
    }
    public set codServicio(value: number) {
        this._codServicio = value;
    }

    public get nombreServicio(): string {
        return this._nombreServicio;
    }
    public set nombreServicio(value: string) {
        this._nombreServicio = value;
    }

    public get descripcion(): string {
        return this._descripcion;
    }
    public set descripcion(value: string) {
        this._descripcion = value;
    }

    public get precio(): number {
        return this._precio;
    }
    public set precio(value: number) {
        this._precio = value;
    }

    public get estado(): boolean {
        return this._estado;
    }
    public set estado(value: boolean) {
        this._estado = value;
    }
}

export default ServiciosOtros;