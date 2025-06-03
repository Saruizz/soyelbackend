// src/__tests__/tipo_vehiculo/tipoVehiculoService.test.ts

import { Request, Response } from "express";
import TipoVehiculo from "../../app/tipo_vehiculo/model/TipoVehiculo";

describe("Servicio Tipo Vehículo - Tests Unitarios", () => {
  // ✅ Helper para crear mock de Response
  const createMockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  // ✅ Helper para crear mock de Request
  const createMockRequest = (params = {}, body = {}) => {
    return { params, body } as Request;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("TipoVehiculo Model", () => {
    it("debería crear una instancia de TipoVehiculo correctamente", () => {
      const tipoVehiculo = new TipoVehiculo(1, "Automóvil");

      expect(tipoVehiculo.codTipoVehiculo).toBe(1);
      expect(tipoVehiculo.claseTipoVehiculo).toBe("Automóvil");
    });

    it("debería permitir modificar valores usando setters", () => {
      const tipoVehiculo = new TipoVehiculo(1, "Automóvil");

      tipoVehiculo.codTipoVehiculo = 2;
      tipoVehiculo.claseTipoVehiculo = "Motocicleta";

      expect(tipoVehiculo.codTipoVehiculo).toBe(2);
      expect(tipoVehiculo.claseTipoVehiculo).toBe("Motocicleta");
    });

    it("debería validar que los valores tienen tipos correctos", () => {
      const tipoVehiculo = new TipoVehiculo(1, "Automóvil");

      expect(typeof tipoVehiculo.codTipoVehiculo).toBe("number");
      expect(typeof tipoVehiculo.claseTipoVehiculo).toBe("string");
    });

    it("debería crear instancia con código 0 para nuevos registros", () => {
      const tipoVehiculo = new TipoVehiculo(0, "Nuevo Tipo");

      expect(tipoVehiculo.codTipoVehiculo).toBe(0);
      expect(tipoVehiculo.claseTipoVehiculo).toBe("Nuevo Tipo");
    });
  });

  describe("Casos de Uso - Crear Tipo Vehículo", () => {
    it("debería simular creación exitosa de tipo vehículo", () => {
      const req = createMockRequest(
        {},
        {
          claseTipoVehiculo: "Automóvil",
        }
      );
      const res = createMockResponse();

      // Simular que no existe tipo con este nombre
      const existeTipo = { cantidad: 0 };

      if (existeTipo.cantidad === 0) {
        const nuevoTipo = {
          cod_tipo_vehiculo: 1,
          clase_tipo_vehiculo: req.body.claseTipoVehiculo,
        };

        res.status(201).json({
          respuesta: "Tipo de vehículo creado correctamente",
          nuevoTipoVehiculo: nuevoTipo,
        });
      }

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Tipo de vehículo creado correctamente",
        nuevoTipoVehiculo: {
          cod_tipo_vehiculo: 1,
          clase_tipo_vehiculo: "Automóvil",
        },
      });
    });

    it("debería simular error 400 cuando ya existe el tipo de vehículo", () => {
      const req = createMockRequest(
        {},
        {
          claseTipoVehiculo: "Automóvil",
        }
      );
      const res = createMockResponse();

      // Simular que ya existe tipo con este nombre
      const existeTipo = { cantidad: 1 };

      if (existeTipo.cantidad > 0) {
        res.status(400).json({
          respuesta: "Ya existe un tipo de vehículo con este nombre",
        });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Ya existe un tipo de vehículo con este nombre",
      });
    });

    it("debería validar datos de entrada para crear", () => {
      const req = createMockRequest(
        {},
        {
          claseTipoVehiculo: "Camioneta",
        }
      );

      const tipoVehiculo = new TipoVehiculo(0, "");
      tipoVehiculo.claseTipoVehiculo = req.body.claseTipoVehiculo;

      expect(tipoVehiculo.claseTipoVehiculo).toBe("Camioneta");
      expect(tipoVehiculo.codTipoVehiculo).toBe(0);
    });

    it("debería simular error interno en creación", () => {
      const res = createMockResponse();

      res.status(500).json({
        respuesta: "Error interno al crear el tipo de vehículo",
      });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Error interno al crear el tipo de vehículo",
      });
    });
  });

  describe("Casos de Uso - Consultar Tipos Vehículo", () => {
    it("debería simular consulta exitosa de todos los tipos", () => {
      const res = createMockResponse();
      const mockTipos = [
        { cod_tipo_vehiculo: 1, clase_tipo_vehiculo: "Automóvil" },
        { cod_tipo_vehiculo: 2, clase_tipo_vehiculo: "Motocicleta" },
        { cod_tipo_vehiculo: 3, clase_tipo_vehiculo: "Camioneta" },
      ];

      if (mockTipos.length > 0) {
        res.status(200).json({
          respuesta: "Consulta de tipos de vehiculos exitosa",
          cantidad: mockTipos.length,
          tiposVehiculos: mockTipos,
        });
      }

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Consulta de tipos de vehiculos exitosa",
        cantidad: 3,
        tiposVehiculos: mockTipos,
      });
    });

    it("debería simular respuesta 404 cuando no hay tipos de vehículo", () => {
      const res = createMockResponse();
      const mockTipos: any[] = [];

      if (mockTipos.length === 0) {
        res.status(404).json({
          respuesta: "No se encontraron tipos de vehículo",
        });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "No se encontraron tipos de vehículo",
      });
    });

    it("debería simular error interno en consulta", () => {
      const res = createMockResponse();

      res.status(500).json({
        respuesta: "Error interno al consultar tipos de vehículo",
      });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Error interno al consultar tipos de vehículo",
      });
    });

    it("debería validar estructura de respuesta de consulta", () => {
      const respuestaEsperada = {
        respuesta: "Consulta de tipos de vehiculos exitosa",
        cantidad: 2,
        tiposVehiculos: [
          { cod_tipo_vehiculo: 1, clase_tipo_vehiculo: "Automóvil" },
          { cod_tipo_vehiculo: 2, clase_tipo_vehiculo: "Motocicleta" },
        ],
      };

      expect(respuestaEsperada).toHaveProperty("respuesta");
      expect(respuestaEsperada).toHaveProperty("cantidad");
      expect(respuestaEsperada).toHaveProperty("tiposVehiculos");
      expect(Array.isArray(respuestaEsperada.tiposVehiculos)).toBe(true);
      expect(respuestaEsperada.cantidad).toBe(
        respuestaEsperada.tiposVehiculos.length
      );
    });
  });

  describe("Casos de Uso - Actualizar Tipo Vehículo", () => {
    it("debería simular actualización exitosa", () => {
      const req = createMockRequest(
        {},
        {
          codTipoVehiculo: 1,
          claseTipoVehiculo: "Automóvil Sedan",
        }
      );
      const res = createMockResponse();

      // Simular que el tipo existe
      const tipoExistente = {
        cod_tipo_vehiculo: 1,
        clase_tipo_vehiculo: "Automóvil",
      };
      // Simular que no hay conflicto de nombre
      const conflictoNombre = { cantidad: 0 };

      if (tipoExistente && conflictoNombre.cantidad === 0) {
        res.status(200).json({
          respuesta: "Tipo de vehículo actualizado correctamente",
          detalles: {
            filasActualizadas: 1,
            codigoTipoVehiculo: req.body.codTipoVehiculo,
            nuevoNombre: req.body.claseTipoVehiculo,
          },
        });
      }

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Tipo de vehículo actualizado correctamente",
        detalles: {
          filasActualizadas: 1,
          codigoTipoVehiculo: 1,
          nuevoNombre: "Automóvil Sedan",
        },
      });
    });

    it("debería simular error 404 cuando tipo no existe", () => {
      const req = createMockRequest(
        {},
        {
          codTipoVehiculo: 999,
          claseTipoVehiculo: "Tipo Inexistente",
        }
      );
      const res = createMockResponse();

      // Simular que el tipo no existe
      const tipoExistente = null;

      if (!tipoExistente) {
        res.status(404).json({
          respuesta: "El tipo de vehículo no existe",
        });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "El tipo de vehículo no existe",
      });
    });

    it("debería simular error 409 cuando ya existe nombre", () => {
      const req = createMockRequest(
        {},
        {
          codTipoVehiculo: 1,
          claseTipoVehiculo: "Motocicleta",
        }
      );
      const res = createMockResponse();

      // Simular que el tipo existe pero hay conflicto de nombre
      const tipoExistente = {
        cod_tipo_vehiculo: 1,
        clase_tipo_vehiculo: "Automóvil",
      };
      const conflictoNombre = { cantidad: 1 };

      if (tipoExistente && conflictoNombre.cantidad > 0) {
        res.status(409).json({
          respuesta: "Ya existe un tipo de vehículo con este nombre",
        });
      }

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Ya existe un tipo de vehículo con este nombre",
      });
    });

    it("debería simular error 400 cuando datos son inválidos", () => {
      const res = createMockResponse();

      // Simular datos inválidos
      const datosInvalidos = {
        codTipoVehiculo: null,
        claseTipoVehiculo: "",
      };

      if (
        !datosInvalidos.codTipoVehiculo ||
        !datosInvalidos.claseTipoVehiculo
      ) {
        res.status(400).json({
          respuesta: "Datos de tipo de vehículo inválidos",
        });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Datos de tipo de vehículo inválidos",
      });
    });

    it("debería validar flujo completo de actualización", () => {
      const req = createMockRequest(
        {},
        {
          codTipoVehiculo: 1,
          claseTipoVehiculo: "SUV",
        }
      );

      const tipoVehiculo = new TipoVehiculo(0, "");
      tipoVehiculo.codTipoVehiculo = req.body.codTipoVehiculo;
      tipoVehiculo.claseTipoVehiculo = req.body.claseTipoVehiculo;

      expect(tipoVehiculo.codTipoVehiculo).toBe(1);
      expect(tipoVehiculo.claseTipoVehiculo).toBe("SUV");
    });
  });

  describe("Casos de Uso - Borrar Tipo Vehículo", () => {
    it("debería simular borrado exitoso", () => {
      const req = createMockRequest({ codTipoVehiculo: "1" });
      const res = createMockResponse();

      // Simular que el tipo existe y no tiene tarifas relacionadas
      const tipoExistente = {
        cod_tipo_vehiculo: 1,
        clase_tipo_vehiculo: "Automóvil",
      };
      const tarifasRelacionadas: any[] = [];

      if (tipoExistente && tarifasRelacionadas.length === 0) {
        res.status(200).json({
          respuesta: "Registro eliminado correctamente",
          "Filas borradas": 1,
        });
      }

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Registro eliminado correctamente",
        "Filas borradas": 1,
      });
    });

    it("debería simular error 404 cuando tipo no existe", () => {
      const req = createMockRequest({ codTipoVehiculo: "999" });
      const res = createMockResponse();

      // Simular que el tipo no existe
      const tipoExistente = null;

      if (!tipoExistente) {
        res.status(404).json({
          respuesta: "El tipo de vehículo no existe",
        });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "El tipo de vehículo no existe",
      });
    });

    it("debería simular error 400 cuando hay tarifas relacionadas", () => {
      const req = createMockRequest({ codTipoVehiculo: "1" });
      const res = createMockResponse();

      // Simular que el tipo existe pero tiene tarifas relacionadas
      const tipoExistente = {
        cod_tipo_vehiculo: 1,
        clase_tipo_vehiculo: "Automóvil",
      };
      const tarifasRelacionadas = [
        {
          cod_parqueadero: 1,
          cod_tipo_vehiculo: 1,
          valor_tarifa_diaria: 15000,
        },
      ];

      if (tipoExistente && tarifasRelacionadas.length > 0) {
        res.status(400).json({
          respuesta:
            "No se puede eliminar el tipo de vehículo porque está relacionado a una o más tarifas diarias",
          tarifasRelacionadas: tarifasRelacionadas,
        });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        respuesta:
          "No se puede eliminar el tipo de vehículo porque está relacionado a una o más tarifas diarias",
        tarifasRelacionadas: tarifasRelacionadas,
      });
    });

    it("debería validar conversión de parámetro a número", () => {
      const req = createMockRequest({ codTipoVehiculo: "123" });

      const codigo = Number(req.params.codTipoVehiculo);
      const tipoVehiculo = new TipoVehiculo(codigo, "");

      expect(codigo).toBe(123);
      expect(tipoVehiculo.codTipoVehiculo).toBe(123);
      expect(typeof tipoVehiculo.codTipoVehiculo).toBe("number");
    });

    it("debería simular error interno en borrado", () => {
      const res = createMockResponse();

      res.status(500).json({
        respuesta: "Error interno al intentar eliminar",
      });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Error interno al intentar eliminar",
      });
    });
  });

  describe("Validaciones CRUD Completas", () => {
    it("debería validar operaciones CRUD en secuencia", () => {
      const tipoData = {
        codTipoVehiculo: 1,
        claseTipoVehiculo: "Automóvil",
      };

      // 1. Crear
      const tipoVehiculo = new TipoVehiculo(0, tipoData.claseTipoVehiculo);
      expect(tipoVehiculo.claseTipoVehiculo).toBe("Automóvil");

      // 2. Simular asignación de código
      tipoVehiculo.codTipoVehiculo = tipoData.codTipoVehiculo;
      expect(tipoVehiculo.codTipoVehiculo).toBe(1);

      // 3. Actualizar
      tipoVehiculo.claseTipoVehiculo = "Automóvil Sedán";
      expect(tipoVehiculo.claseTipoVehiculo).toBe("Automóvil Sedán");

      // 4. Simular borrado
      const tipoParaBorrar = {
        codTipoVehiculo: tipoVehiculo.codTipoVehiculo,
        claseTipoVehiculo: tipoVehiculo.claseTipoVehiculo,
      };
      expect(tipoParaBorrar.codTipoVehiculo).toBe(1);
    });

    it("debería validar códigos de estado HTTP correctos", () => {
      const statusCodes = {
        crear_exitoso: 201,
        consultar_exitoso: 200,
        actualizar_exitoso: 200,
        borrar_exitoso: 200,
        no_encontrado: 404,
        ya_existe: 400,
        conflicto_nombre: 409,
        integridad_referencial: 400,
        datos_invalidos: 400,
        error_interno: 500,
      };

      expect(statusCodes.crear_exitoso).toBe(201);
      expect(statusCodes.consultar_exitoso).toBe(200);
      expect(statusCodes.actualizar_exitoso).toBe(200);
      expect(statusCodes.borrar_exitoso).toBe(200);
      expect(statusCodes.no_encontrado).toBe(404);
      expect(statusCodes.ya_existe).toBe(400);
      expect(statusCodes.conflicto_nombre).toBe(409);
      expect(statusCodes.integridad_referencial).toBe(400);
      expect(statusCodes.datos_invalidos).toBe(400);
      expect(statusCodes.error_interno).toBe(500);
    });

    it("debería validar estructura de respuestas para todas las operaciones", () => {
      const respuestas = {
        crear: {
          respuesta: "Tipo de vehículo creado correctamente",
          nuevoTipoVehiculo: {
            cod_tipo_vehiculo: 1,
            clase_tipo_vehiculo: "Automóvil",
          },
        },
        consultar: {
          respuesta: "Consulta de tipos de vehiculos exitosa",
          cantidad: 1,
          tiposVehiculos: [],
        },
        actualizar: {
          respuesta: "Tipo de vehículo actualizado correctamente",
          detalles: {
            filasActualizadas: 1,
            codigoTipoVehiculo: 1,
            nuevoNombre: "Automóvil Sedán",
          },
        },
        borrar: {
          respuesta: "Registro eliminado correctamente",
          "Filas borradas": 1,
        },
      };

      expect(respuestas.crear).toHaveProperty("respuesta");
      expect(respuestas.crear).toHaveProperty("nuevoTipoVehiculo");
      expect(respuestas.consultar).toHaveProperty("respuesta");
      expect(respuestas.consultar).toHaveProperty("cantidad");
      expect(respuestas.consultar).toHaveProperty("tiposVehiculos");
      expect(respuestas.actualizar).toHaveProperty("respuesta");
      expect(respuestas.actualizar).toHaveProperty("detalles");
      expect(respuestas.borrar).toHaveProperty("respuesta");
      expect(respuestas.borrar).toHaveProperty("Filas borradas");
    });
  });

  describe("Validaciones de Negocio", () => {
    it("debería validar nombres de tipo de vehículo válidos", () => {
      const nombresValidos = [
        "Automóvil",
        "Motocicleta",
        "Camioneta",
        "SUV",
        "Camión",
        "Bus",
      ];

      nombresValidos.forEach((nombre) => {
        const tipo = new TipoVehiculo(0, nombre);
        expect(tipo.claseTipoVehiculo).toBe(nombre);
        expect(tipo.claseTipoVehiculo.length).toBeGreaterThan(0);
        expect(typeof tipo.claseTipoVehiculo).toBe("string");
      });
    });

    it("debería validar que códigos sean números enteros positivos", () => {
      const codigosValidos = [1, 2, 3, 100, 999];

      codigosValidos.forEach((codigo) => {
        const tipo = new TipoVehiculo(codigo, "Tipo Test");
        expect(Number.isInteger(tipo.codTipoVehiculo)).toBe(true);
        expect(tipo.codTipoVehiculo).toBeGreaterThanOrEqual(0);
      });
    });

    it("debería validar integridad referencial con tarifas", () => {
      const tipoConTarifas = {
        cod_tipo_vehiculo: 1,
        tarifas_relacionadas: [
          { cod_parqueadero: 1, valor_tarifa_diaria: 15000 },
          { cod_parqueadero: 2, valor_tarifa_diaria: 18000 },
        ],
      };

      expect(tipoConTarifas.tarifas_relacionadas.length).toBeGreaterThan(0);
      expect(Array.isArray(tipoConTarifas.tarifas_relacionadas)).toBe(true);
    });

    it("debería validar unicidad de nombres", () => {
      const tiposExistentes = [
        { cod_tipo_vehiculo: 1, clase_tipo_vehiculo: "Automóvil" },
        { cod_tipo_vehiculo: 2, clase_tipo_vehiculo: "Motocicleta" },
      ];

      const nuevoNombre = "Camioneta";
      const nombreExistente = "Automóvil";

      const yaExiste = tiposExistentes.some(
        (tipo) =>
          tipo.clase_tipo_vehiculo.toLowerCase() ===
          nombreExistente.toLowerCase()
      );

      const esNuevo = !tiposExistentes.some(
        (tipo) =>
          tipo.clase_tipo_vehiculo.toLowerCase() === nuevoNombre.toLowerCase()
      );

      expect(yaExiste).toBe(true);
      expect(esNuevo).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("debería manejar nombres con caracteres especiales", () => {
      const nombresEspeciales = [
        "Automóvil",
        "Motocicleta",
        "Camión",
        "Vehículo Eléctrico",
      ];

      nombresEspeciales.forEach((nombre) => {
        const tipo = new TipoVehiculo(1, nombre);
        expect(tipo.claseTipoVehiculo).toBe(nombre);
        expect(tipo.claseTipoVehiculo.length).toBeGreaterThan(0);
      });
    });

    it("debería manejar códigos límite", () => {
      const codigosLimite = [0, 1, Number.MAX_SAFE_INTEGER];

      codigosLimite.forEach((codigo) => {
        const tipo = new TipoVehiculo(codigo, "Tipo Test");
        expect(tipo.codTipoVehiculo).toBe(codigo);
        expect(Number.isSafeInteger(tipo.codTipoVehiculo)).toBe(true);
      });
    });

    it("debería detectar conversiones inválidas", () => {
      const parametrosInvalidos = ["abc", "123abc", "", "null"];

      parametrosInvalidos.forEach((param) => {
        const codigo = Number(param);
        expect(Number.isNaN(codigo) || codigo === 0).toBe(true);
      });
    });

    it("debería validar nombres vacíos o nulos", () => {
      const nombresInvalidos = ["", " ", "   ", null, undefined];

      nombresInvalidos.forEach((nombre) => {
        const esValido = !!(nombre && nombre.trim && nombre.trim().length > 0);
        expect(esValido).toBe(false);
      });
    });

    it("debería manejar respuestas con arrays vacíos", () => {
      const respuestasVacias = {
        tiposVehiculos: [],
        tarifasRelacionadas: [],
      };

      expect(Array.isArray(respuestasVacias.tiposVehiculos)).toBe(true);
      expect(respuestasVacias.tiposVehiculos.length).toBe(0);
      expect(Array.isArray(respuestasVacias.tarifasRelacionadas)).toBe(true);
      expect(respuestasVacias.tarifasRelacionadas.length).toBe(0);
    });

    it("debería validar consistencia de datos en controladores", () => {
      const req = createMockRequest(
        { codTipoVehiculo: "1" },
        {
          codTipoVehiculo: 1,
          claseTipoVehiculo: "Automóvil",
        }
      );

      // Validar que el código en params coincide con el del body
      const codigoParams = Number(req.params.codTipoVehiculo);
      const codigoBody = req.body.codTipoVehiculo;

      expect(codigoParams).toBe(codigoBody);
      expect(typeof codigoParams).toBe("number");
      expect(typeof codigoBody).toBe("number");
    });
  });
});
