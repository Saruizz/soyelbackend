class Acceso {
    private _codUsuario: number;
    private _correoAcceso: String;
    private _claveAcceso: String;
    private _uuidAcceso: String;

    constructor(
        codUsuario: number,
        correoAccs: String,
        claveAccs: String,
        uuidAcceso: String
    ) {
        this._codUsuario = codUsuario;
        this._correoAcceso = correoAccs;
        this._claveAcceso = claveAccs;
        this._uuidAcceso = uuidAcceso;
    }

    public get codUsuario(): number {
        return this._codUsuario;
    }

    public get correoAcceso(): String {
        return this._correoAcceso;
    }

    public get claveAcceso(): String {
        return this._claveAcceso;
    }

    public get uuidAcceso(): String {
        return this._uuidAcceso;
    }

    public set codUsuario(cod: number) {
        this._codUsuario = cod;
    }

    public set correoAcceso(correo: String) {
        this._correoAcceso = correo;
    }

    public set claveAcceso(clave: String) {
        this._claveAcceso = clave;
    }

    public set uuidAcceso(idAccs: String) {
        this._uuidAcceso = idAccs;
    }
}

export default Acceso;
