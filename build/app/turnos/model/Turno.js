"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Turno {
    normalizarHora(hora) {
        if (/^\d{2}:\d{2}$/.test(hora)) {
            return `${hora}:00`; // Agregar segundos si no están presentes
        }
        if (/^\d{2}:\d{2}:\d{2}$/.test(hora)) {
            return hora; // Mantener si ya tiene segundos
        }
        throw new Error("Formato de hora incorrecto. Debe ser HH:MM o HH:MM:SS.");
    }
    constructor(cod, parqueadero, descripcion, fecha, horaInicio, horaFin) {
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
        const normalizarHora = (hora) => {
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
    get cod_Turno() {
        return this._codTurno;
    }
    get cod_Parqueadero() {
        return this._codParqueadero;
    }
    get descripcion_Turno() {
        return this._descripcionTurno;
    }
    get fecha_Turno() {
        return this._fechaTurno;
    }
    get hora_Inicio_Turno() {
        return this._horaInicioTurno;
    }
    get hora_Fin_Turno() {
        return this._horaFinTurno;
    }
    set cod_Turno(cod) {
        this._codTurno = cod;
    }
    set cod_Parqueadero(parqueadero) {
        this._codParqueadero = parqueadero;
    }
    set descripcion_Turno(descripcion) {
        this._descripcionTurno = descripcion;
    }
    set fecha_Turno(fecha) {
        if (typeof fecha === "string") {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
                throw new Error("Formato de fecha incorrecto. Debe ser YYYY-MM-DD.");
            }
            this._fechaTurno = new Date(`${fecha}T00:00:00`);
        }
        else {
            this._fechaTurno = fecha;
        }
    }
    set hora_Inicio_Turno(horaInicio) {
        this._horaInicioTurno = this.normalizarHora(horaInicio);
    }
    set hora_Fin_Turno(horaFin) {
        this._horaFinTurno = this.normalizarHora(horaFin);
    }
}
exports.default = Turno;
