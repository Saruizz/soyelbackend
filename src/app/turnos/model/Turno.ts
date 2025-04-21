class Turno {
    private _codTurno: number;
    private _codParqueadero: number;
    private _descripcionTurno: string;
    private _fechaTurno: Date;
    private _horaInicioTurno: String;
    private _horaFinTurno: String;
    private normalizarHora(hora: string): string {
        if (/^\d{2}:\d{2}$/.test(hora)) {
            return `${hora}:00`; // Agregar segundos si no están presentes
        }
        if (/^\d{2}:\d{2}:\d{2}$/.test(hora)) {
            return hora; // Mantener si ya tiene segundos
        }
        throw new Error("Formato de hora incorrecto. Debe ser HH:MM o HH:MM:SS.");
    }

    constructor(
        cod: number,
        parqueadero: number,
        descripcion: string,
        fecha: string,       
        horaInicio: string,  
        horaFin: string      
    ) {
        this._codTurno = cod;
        this._codParqueadero = parqueadero;
        this._descripcionTurno = descripcion;
    
        // 📆 Validar y convertir fecha
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            console.log("📆 Fecha Turno:", fecha);
            throw new Error("Formato de fecha incorrecto. Debe ser YYYY-MM-DD.");
        }
        this._fechaTurno = new Date(`${fecha}T00:00:00`); 
    
        // ⏰ Asegurar que la hora esté en formato HH:MM:SS
        const normalizarHora = (hora: string) => {
            if (/^\d{2}:\d{2}$/.test(hora)) {
                return `${hora}:00`; // Agregar segundos si no están presentes
            }
            if (/^\d{2}:\d{2}:\d{2}$/.test(hora)) {
                return hora; // Mantener si ya tiene segundos
            }
            throw new Error("Formato de hora incorrecto. Debe ser HH:MM o HH:MM:SS.");
        };
    
        this._horaInicioTurno = normalizarHora(horaInicio);
        this._horaFinTurno = normalizarHora(horaFin);
    }
    public get cod_Turno(): number {
        return this._codTurno;
    }

    public get cod_Parqueadero(): number {
        return this._codParqueadero;
    }

    public get descripcion_Turno(): string {
        return this._descripcionTurno;
    }

    public get fecha_Turno(): Date {
        return this._fechaTurno;
    }

    public get hora_Inicio_Turno(): String {
        return this._horaInicioTurno;
    }

    public get hora_Fin_Turno(): String {
        return this._horaFinTurno;
    }

    public set cod_Turno(cod: number) {
        this._codTurno = cod;
    }

    public set cod_Parqueadero(parqueadero: number) {
        this._codParqueadero = parqueadero;
    }

    public set descripcion_Turno(descripcion: string) {
        this._descripcionTurno = descripcion;
    }

    public set fecha_Turno(fecha: string | Date) {
        if (typeof fecha === "string") {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
                throw new Error("Formato de fecha incorrecto. Debe ser YYYY-MM-DD.");
            }
            this._fechaTurno = new Date(`${fecha}T00:00:00`);
        } else {
            this._fechaTurno = fecha;
        }
    }

    public set hora_Inicio_Turno(horaInicio: string) {
        this._horaInicioTurno = this.normalizarHora(horaInicio);
    }
    
    public set hora_Fin_Turno(horaFin: string) {
        this._horaFinTurno = this.normalizarHora(horaFin);
    }
}

export default Turno;