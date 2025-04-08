"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
const Acceso_1 = __importDefault(require("../model/Acceso"));
const uuid_1 = require("uuid");
const sql_acceso_1 = require("../repository/sql_acceso");
const sql_ingreso_1 = require("../repository/sql_ingreso");
const Ingreso_1 = __importDefault(require("../model/Ingreso"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ServicioLogin {
    static iniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correoAcceso, claveAcceso } = req.body;
            const claveCifrada = bcryptjs_1.default.hashSync(claveAcceso);
            console.log("La contraseña es: " + claveCifrada);
            try {
                // Verificar si el usuario existe con las credenciales proporcionadas
                const datosUsuario = yield dbConnection_1.default.oneOrNone(sql_acceso_1.SQL_ACCESO.FIND_BY_EMAIL, [correoAcceso]);
                console.log(datosUsuario);
                const isValid = bcryptjs_1.default.compareSync(claveAcceso, datosUsuario.claveacceso);
                console.log("Clave base datos: " + isValid);
                console.log("Clave de postman: " + claveAcceso);
                if (!datosUsuario || !isValid) {
                    return res.status(401).json({
                        respuesta: "Credenciales incorrectas",
                        autenticado: false,
                    });
                }
                // Crear un nuevo UUID para la sesión
                const nuevoUUID = (0, uuid_1.v4)();
                // Actualizar el UUID en la base de datos
                const usuarioActualizado = yield dbConnection_1.default.one(sql_acceso_1.SQL_ACCESO.UPDATE_UUID, [
                    datosUsuario.codusuario,
                    nuevoUUID,
                ]);
                // Registrar el ingreso al sistema
                const nuevoIngreso = yield dbConnection_1.default.one(sql_ingreso_1.SQL_INGRESO.ADD, [
                    datosUsuario.codusuario,
                ]);
                // Obtener información del usuario
                const infoUsuario = yield dbConnection_1.default.oneOrNone("SELECT u.cod_usuario as codUsuario, u.nombres_usuario as nombresUsuario, " +
                    "u.apellidos_usuario as apellidosUsuario, r.nombre_rol as nombreRol " +
                    "FROM usuarios u " +
                    "JOIN roles r ON u.cod_rol = r.cod_rol " +
                    "WHERE u.cod_usuario = $1", [datosUsuario.codusuario]);
                if (!infoUsuario) {
                    return res.status(404).json({
                        respuesta: "No se encontró información del usuario",
                        autenticado: false,
                    });
                }
                const acceso = new Acceso_1.default(usuarioActualizado.codusuario, usuarioActualizado.correoacceso, usuarioActualizado.claveacceso, usuarioActualizado.uuidacceso);
                const ingreso = new Ingreso_1.default(nuevoIngreso.codingreso, nuevoIngreso.codusuario, nuevoIngreso.fechaingreso, nuevoIngreso.horaingreso);
                // Respuesta exitosa con información de usuario
                res.status(200).json({
                    respuesta: "Inicio de sesión exitoso",
                    autenticado: true,
                    usuario: {
                        codUsuario: infoUsuario.codusuario,
                        nombreRol: infoUsuario.nombrerol,
                        nombresUsuario: infoUsuario.nombresusuario,
                        apellidosUsuario: infoUsuario.apellidosusuario,
                        uuidAcceso: acceso.uuidAcceso,
                    },
                    ingreso: {
                        codIngreso: ingreso.codIngreso,
                        fechaIngreso: ingreso.fechaIngreso,
                        horaIngreso: ingreso.horaIngreso,
                    },
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    respuesta: "Error interno al iniciar sesión",
                    autenticado: false,
                });
            }
        });
    }
    static validarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codUsuario, uuidAcceso } = req.body;
            try {
                const datosUsuario = yield dbConnection_1.default.oneOrNone(sql_acceso_1.SQL_ACCESO.FIND_BY_ID, [
                    codUsuario,
                ]);
                if (!datosUsuario || datosUsuario.uuidacceso !== uuidAcceso) {
                    return res.status(401).json({
                        respuesta: "Sesión inválida o expirada",
                        sesionValida: false,
                    });
                }
                // Obtener información del usuario
                const infoUsuario = yield dbConnection_1.default.oneOrNone("SELECT u.cod_usuario as codUsuario, u.nombres_usuario as nombresUsuario, " +
                    "u.apellidos_usuario as apellidosUsuario, r.nombre_rol as nombreRol " +
                    "FROM usuarios u " +
                    "JOIN roles r ON u.cod_rol = r.cod_rol " +
                    "WHERE u.cod_usuario = $1", [codUsuario]);
                const ultimoIngreso = yield dbConnection_1.default.oneOrNone(sql_ingreso_1.SQL_INGRESO.LAST_ENTRY, [
                    codUsuario,
                ]);
                res.status(200).json({
                    respuesta: "Sesión válida",
                    sesionValida: true,
                    usuario: {
                        codUsuario: infoUsuario.codusuario,
                        nombreRol: infoUsuario.nombrerol,
                        nombresUsuario: infoUsuario.nombresusuario,
                        apellidosUsuario: infoUsuario.apellidosusuario,
                    },
                    ingreso: ultimoIngreso
                        ? {
                            codIngreso: ultimoIngreso.codingreso,
                            fechaIngreso: ultimoIngreso.fechaingreso,
                            horaIngreso: ultimoIngreso.horaingreso,
                        }
                        : null,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    respuesta: "Error interno al validar sesión",
                    sesionValida: false,
                });
            }
        });
    }
    static cerrarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codUsuario } = req.body;
            try {
                // Invalidar el UUID actual generando uno nuevo aleatorio
                const nuevoUUID = (0, uuid_1.v4)();
                const result = yield dbConnection_1.default.result(sql_acceso_1.SQL_ACCESO.UPDATE_UUID, [
                    codUsuario,
                    nuevoUUID,
                ]);
                // Verificar si se actualizó correctamente
                if (result && result.rowCount > 0) {
                    return res.status(200).json({
                        respuesta: "Sesión cerrada exitosamente",
                    });
                }
                else {
                    return res.status(404).json({
                        respuesta: "No se encontró el usuario para cerrar sesión",
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    respuesta: "Error interno al cerrar sesión",
                });
            }
        });
    }
    static obtenerHistorialIngresos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codUsuario } = req.params;
            try {
                const historialIngresos = yield dbConnection_1.default.result(sql_ingreso_1.SQL_INGRESO.FIND_BY_USER, [
                    codUsuario,
                ]);
                if (historialIngresos.rows.length === 0) {
                    return res.status(404).json({
                        respuesta: "No se encontraron registros de ingreso para el usuario",
                    });
                }
                res.status(200).json({
                    respuesta: "Consulta de historial de ingresos exitosa",
                    cantidad: historialIngresos.rows.length,
                    ingresos: historialIngresos.rows,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    respuesta: "Error interno al consultar historial de ingresos",
                });
            }
        });
    }
}
exports.default = ServicioLogin;
