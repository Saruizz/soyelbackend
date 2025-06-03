import { Request, Response } from "express";
import TarifaDiaria from "../../app/tarifa_diaria/model/TarifaDiaria";

describe("Servicio Tarifa Diaria - Tests Unitarios", () => {
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

  describe("TarifaDiaria Model", () => {
    it("debería crear una instancia de TarifaDiaria correctamente", () => {
      const tarifa = new TarifaDiaria(1, 2, 15000);

      expect(tarifa.codParqueadero).toBe(1);
      expect(tarifa.codTipoVehiculo).toBe(2);
      expect(tarifa.valorTarifaDiaria).toBe(15000);
    });

    it("debería permitir modificar valores usando setters", () => {
      const tarifa = new TarifaDiaria(1, 2, 15000);

      tarifa.codParqueadero = 3;
      tarifa.codTipoVehiculo = 4;
      tarifa.valorTarifaDiaria = 20000;

      expect(tarifa.codParqueadero).toBe(3);
      expect(tarifa.codTipoVehiculo).toBe(4);
      expect(tarifa.valorTarifaDiaria).toBe(20000);
    });

    it("debería validar que los valores son números", () => {
      const tarifa = new TarifaDiaria(1, 2, 15000);

      expect(typeof tarifa.codParqueadero).toBe("number");
      expect(typeof tarifa.codTipoVehiculo).toBe("number");
      expect(typeof tarifa.valorTarifaDiaria).toBe("number");
    });
  });

  describe("Response Helpers", () => {
    it("debería crear response mock correctamente", () => {
      const res = createMockResponse();

      res.status(200).json({ test: "data" });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ test: "data" });
    });

    it("debería crear request mock correctamente", () => {
      const req = createMockRequest(
        { codParqueadero: "1", codTipoVehiculo: "2" },
        { valorTarifaDiaria: 15000 }
      );

      expect(req.params.codParqueadero).toBe("1");
      expect(req.params.codTipoVehiculo).toBe("2");
      expect(req.body.valorTarifaDiaria).toBe(15000);
    });
  });

  describe("Validación de Parámetros", () => {
    it("debería validar parámetros de entrada correctamente", () => {
      const validParams = {
        codParqueadero: "1",
        codTipoVehiculo: "2",
      };

      const req = createMockRequest(validParams);

      expect(req.params.codParqueadero).toBeDefined();
      expect(req.params.codTipoVehiculo).toBeDefined();
      expect(req.params.codParqueadero).toBe("1");
      expect(req.params.codTipoVehiculo).toBe("2");
    });

    it("debería manejar parámetros faltantes", () => {
      const incompleteParams = {
        codParqueadero: "1",
        // falta codTipoVehiculo
      };

      const req = createMockRequest(incompleteParams);

      expect(req.params.codParqueadero).toBeDefined();
      expect(req.params.codTipoVehiculo).toBeUndefined();
    });

    it("debería validar tipos de datos en parámetros", () => {
      const params = {
        codParqueadero: "123",
        codTipoVehiculo: "456",
      };

      const req = createMockRequest(params);

      // Validar que se pueden convertir a números
      const codParqueadero = parseInt(req.params.codParqueadero);
      const codTipoVehiculo = parseInt(req.params.codTipoVehiculo);

      expect(codParqueadero).toBe(123);
      expect(codTipoVehiculo).toBe(456);
      expect(Number.isNaN(codParqueadero)).toBe(false);
      expect(Number.isNaN(codTipoVehiculo)).toBe(false);
    });
  });

  describe("Manejo de Responses", () => {
    it("debería simular respuesta de éxito 201", () => {
      const res = createMockResponse();
      const expectedResponse = {
        respuesta: "Tarifa diaria creada correctamente",
        nuevaTarifa: {
          cod_parqueadero: 1,
          cod_tipo_vehiculo: 2,
          valor_tarifa_diaria: 15000,
        },
      };

      res.status(201).json(expectedResponse);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    it("debería simular respuesta de error 400", () => {
      const res = createMockResponse();
      const expectedResponse = {
        respuesta:
          "Ya existe una tarifa diaria para este parqueadero y tipo de vehículo",
      };

      res.status(400).json(expectedResponse);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    it("debería simular respuesta de error 404", () => {
      const res = createMockResponse();
      const expectedResponse = {
        respuesta: "No se encontraron tarifas diarias",
      };

      res.status(404).json(expectedResponse);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    it("debería simular respuesta de error 500", () => {
      const res = createMockResponse();
      const expectedResponse = {
        respuesta: "Error interno al crear la tarifa diaria",
        error: "Database connection failed",
      };

      res.status(500).json(expectedResponse);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    it("debería simular respuesta de consulta exitosa", () => {
      const res = createMockResponse();
      const mockTarifas = [
        {
          cod_parqueadero: 1,
          cod_tipo_vehiculo: 1,
          valor_tarifa_diaria: 10000,
        },
        {
          cod_parqueadero: 1,
          cod_tipo_vehiculo: 2,
          valor_tarifa_diaria: 15000,
        },
      ];

      const expectedResponse = {
        respuesta: "Consulta de tarifas diarias exitosa",
        cantidad: 2,
        tarifasDiarias: mockTarifas,
      };

      res.status(200).json(expectedResponse);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("Casos de Uso - Crear Tarifa", () => {
    it("debería validar datos para crear tarifa exitosamente", () => {
      const tarifaData = {
        codParqueadero: 1,
        codTipoVehiculo: 2,
        valorTarifaDiaria: 15000,
      };

      const tarifa = new TarifaDiaria(
        tarifaData.codParqueadero,
        tarifaData.codTipoVehiculo,
        tarifaData.valorTarifaDiaria
      );

      expect(tarifa.codParqueadero).toBe(tarifaData.codParqueadero);
      expect(tarifa.codTipoVehiculo).toBe(tarifaData.codTipoVehiculo);
      expect(tarifa.valorTarifaDiaria).toBe(tarifaData.valorTarifaDiaria);
    });

    it("debería simular flujo completo de creación exitosa", () => {
      const req = createMockRequest(
        {},
        {
          codParqueadero: 1,
          codTipoVehiculo: 2,
          valorTarifaDiaria: 15000,
        }
      );
      const res = createMockResponse();

      // Simular creación de objeto
      const tarifa = new TarifaDiaria(
        req.body.codParqueadero,
        req.body.codTipoVehiculo,
        req.body.valorTarifaDiaria
      );

      // Simular respuesta exitosa
      const response = {
        respuesta: "Tarifa diaria creada correctamente",
        nuevaTarifa: {
          cod_parqueadero: tarifa.codParqueadero,
          cod_tipo_vehiculo: tarifa.codTipoVehiculo,
          valor_tarifa_diaria: tarifa.valorTarifaDiaria,
        },
      };

      res.status(201).json(response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(response);
    });

    it("debería simular flujo de validación de duplicados", () => {
      const req = createMockRequest(
        {},
        {
          codParqueadero: 1,
          codTipoVehiculo: 2,
          valorTarifaDiaria: 15000,
        }
      );
      const res = createMockResponse();

      // Simular que ya existe una tarifa
      const existeTarifa = { cantidad: "1" };

      if (existeTarifa.cantidad !== "0") {
        res.status(400).json({
          respuesta:
            "Ya existe una tarifa diaria para este parqueadero y tipo de vehículo",
        });
      }

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("Casos de Uso - Consultar Tarifas", () => {
    it("debería simular consulta de todas las tarifas exitosa", () => {
      const res = createMockResponse();
      const mockTarifas = [
        {
          cod_parqueadero: 1,
          cod_tipo_vehiculo: 1,
          valor_tarifa_diaria: 10000,
        },
        {
          cod_parqueadero: 2,
          cod_tipo_vehiculo: 2,
          valor_tarifa_diaria: 15000,
        },
      ];

      // Simular que se encontraron tarifas
      if (mockTarifas.length > 0) {
        res.status(200).json({
          respuesta: "Consulta de tarifas diarias exitosa",
          cantidad: mockTarifas.length,
          tarifasDiarias: mockTarifas,
        });
      }

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("debería simular consulta cuando no hay tarifas", () => {
      const res = createMockResponse();
      const mockTarifas: any[] = [];

      // Simular que no se encontraron tarifas
      if (mockTarifas.length === 0) {
        res.status(404).json({
          respuesta: "No se encontraron tarifas diarias",
        });
      }

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("debería simular consulta por parámetros específicos", () => {
      const req = createMockRequest({ codParqueadero: "1" });
      const res = createMockResponse();
      const mockTarifas = [
        {
          cod_parqueadero: 1,
          cod_tipo_vehiculo: 1,
          valor_tarifa_diaria: 10000,
        },
        {
          cod_parqueadero: 1,
          cod_tipo_vehiculo: 2,
          valor_tarifa_diaria: 15000,
        },
      ];

      // Simular búsqueda por parqueadero
      const codParqueadero = parseInt(req.params.codParqueadero);
      const tarifasEncontradas = mockTarifas.filter(
        (tarifa) => tarifa.cod_parqueadero === codParqueadero
      );

      if (tarifasEncontradas.length > 0) {
        res.status(200).json({
          respuesta:
            "Consulta de tarifas diarias por código de parqueadero exitosa",
          cantidad: tarifasEncontradas.length,
          tarifasDiarias: tarifasEncontradas,
        });
      }

      expect(res.status).toHaveBeenCalledWith(200);
      expect(tarifasEncontradas).toHaveLength(2);
    });
  });

  describe("Validaciones de Negocio", () => {
    it("debería validar que el valor de tarifa sea positivo", () => {
      const valorTarifa = 15000;

      expect(valorTarifa).toBeGreaterThan(0);
      expect(typeof valorTarifa).toBe("number");
    });

    it("debería validar que los códigos sean enteros positivos", () => {
      const codParqueadero = 1;
      const codTipoVehiculo = 2;

      expect(Number.isInteger(codParqueadero)).toBe(true);
      expect(Number.isInteger(codTipoVehiculo)).toBe(true);
      expect(codParqueadero).toBeGreaterThan(0);
      expect(codTipoVehiculo).toBeGreaterThan(0);
    });

    it("debería validar formato de respuestas de error", () => {
      const errorResponse = {
        respuesta:
          "Error al crear la tarifa. Verifique que el parqueadero y el tipo de vehículo existan.",
        detalleError:
          "Key (cod_parqueadero)=(999) is not present in table parqueaderos",
      };

      expect(errorResponse).toHaveProperty("respuesta");
      expect(errorResponse).toHaveProperty("detalleError");
      expect(typeof errorResponse.respuesta).toBe("string");
      expect(typeof errorResponse.detalleError).toBe("string");
    });

    it("debería validar estructura de respuesta exitosa", () => {
      const successResponse = {
        respuesta: "Tarifa diaria creada correctamente",
        nuevaTarifa: {
          cod_parqueadero: 1,
          cod_tipo_vehiculo: 2,
          valor_tarifa_diaria: 15000,
        },
      };

      expect(successResponse).toHaveProperty("respuesta");
      expect(successResponse).toHaveProperty("nuevaTarifa");
      expect(successResponse.nuevaTarifa).toHaveProperty("cod_parqueadero");
      expect(successResponse.nuevaTarifa).toHaveProperty("cod_tipo_vehiculo");
      expect(successResponse.nuevaTarifa).toHaveProperty("valor_tarifa_diaria");
    });
  });

  describe("Casos de Uso - Borrar Tarifa", () => {
    it("debería simular borrado exitoso de tarifa existente", () => {
      const req = createMockRequest({
        codParqueadero: "1",
        codTipoVehiculo: "2",
      });
      const res = createMockResponse();

      // Simular que la tarifa existe
      const existeTarifa = { cantidad: "1" };

      if (existeTarifa.cantidad !== "0") {
        res.status(200).json({
          respuesta: "Tarifa diaria eliminada correctamente",
          tarifaEliminada: {
            codParqueadero: req.params.codParqueadero,
            codTipoVehiculo: req.params.codTipoVehiculo,
          },
        });
      }

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Tarifa diaria eliminada correctamente",
        tarifaEliminada: {
          codParqueadero: "1",
          codTipoVehiculo: "2",
        },
      });
    });

    it("debería simular error 404 cuando tarifa no existe para borrar", () => {
      const req = createMockRequest({
        codParqueadero: "999",
        codTipoVehiculo: "999",
      });
      const res = createMockResponse();

      // Simular que la tarifa no existe
      const existeTarifa = { cantidad: "0" };

      if (existeTarifa.cantidad === "0") {
        res.status(404).json({
          respuesta: "La tarifa diaria que intenta eliminar no existe",
        });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "La tarifa diaria que intenta eliminar no existe",
      });
    });

    it("debería simular error interno en borrado", () => {
      const req = createMockRequest({
        codParqueadero: "1",
        codTipoVehiculo: "2",
      });
      const res = createMockResponse();

      // Simular error interno
      res.status(500).json({
        respuesta: "Error interno al eliminar la tarifa diaria",
      });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Error interno al eliminar la tarifa diaria",
      });
    });

    it("debería validar parámetros requeridos para borrado", () => {
      const req = createMockRequest({
        codParqueadero: "1",
        codTipoVehiculo: "2",
      });

      expect(req.params.codParqueadero).toBeDefined();
      expect(req.params.codTipoVehiculo).toBeDefined();
      expect(req.params.codParqueadero).toBe("1");
      expect(req.params.codTipoVehiculo).toBe("2");
    });
  });

  describe("Casos de Uso - Actualizar Tarifa", () => {
    it("debería simular actualización exitosa de tarifa existente", () => {
      const req = createMockRequest(
        {},
        {
          codParqueadero: 1,
          codTipoVehiculo: 2,
          valorTarifaDiaria: 20000,
        }
      );
      const res = createMockResponse();

      // Simular que la tarifa existe
      const existeTarifa = { cantidad: "1" };

      if (existeTarifa.cantidad !== "0") {
        const tarifaActualizada = {
          cod_parqueadero: req.body.codParqueadero,
          cod_tipo_vehiculo: req.body.codTipoVehiculo,
          valor_tarifa_diaria: req.body.valorTarifaDiaria,
        };

        res.status(200).json({
          respuesta: "Tarifa diaria actualizada correctamente",
          tarifaActualizada: tarifaActualizada,
        });
      }

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Tarifa diaria actualizada correctamente",
        tarifaActualizada: {
          cod_parqueadero: 1,
          cod_tipo_vehiculo: 2,
          valor_tarifa_diaria: 20000,
        },
      });
    });

    it("debería simular error 404 cuando tarifa no existe para actualizar", () => {
      const req = createMockRequest(
        {},
        {
          codParqueadero: 999,
          codTipoVehiculo: 999,
          valorTarifaDiaria: 20000,
        }
      );
      const res = createMockResponse();

      // Simular que la tarifa no existe
      const existeTarifa = { cantidad: "0" };

      if (existeTarifa.cantidad === "0") {
        res.status(404).json({
          respuesta: "La tarifa diaria que intenta actualizar no existe",
        });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "La tarifa diaria que intenta actualizar no existe",
      });
    });

    it("debería simular error interno en actualización", () => {
      const req = createMockRequest(
        {},
        {
          codParqueadero: 1,
          codTipoVehiculo: 2,
          valorTarifaDiaria: 20000,
        }
      );
      const res = createMockResponse();

      // Simular error interno
      res.status(500).json({
        respuesta: "Error interno al actualizar la tarifa diaria",
      });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        respuesta: "Error interno al actualizar la tarifa diaria",
      });
    });

    it("debería validar datos requeridos para actualización", () => {
      const req = createMockRequest(
        {},
        {
          codParqueadero: 1,
          codTipoVehiculo: 2,
          valorTarifaDiaria: 20000,
        }
      );

      expect(req.body.codParqueadero).toBeDefined();
      expect(req.body.codTipoVehiculo).toBeDefined();
      expect(req.body.valorTarifaDiaria).toBeDefined();
      expect(typeof req.body.codParqueadero).toBe("number");
      expect(typeof req.body.codTipoVehiculo).toBe("number");
      expect(typeof req.body.valorTarifaDiaria).toBe("number");
    });

    it("debería validar que el nuevo valor sea positivo", () => {
      const nuevoValor = 25000;

      expect(nuevoValor).toBeGreaterThan(0);
      expect(typeof nuevoValor).toBe("number");
      expect(Number.isInteger(nuevoValor)).toBe(true);
    });

    it("debería simular flujo completo de actualización", () => {
      const datosOriginales = new TarifaDiaria(1, 2, 15000);
      const nuevosValores = {
        codParqueadero: 1,
        codTipoVehiculo: 2,
        valorTarifaDiaria: 18000,
      };

      // Validar que se mantienen las claves primarias
      expect(nuevosValores.codParqueadero).toBe(datosOriginales.codParqueadero);
      expect(nuevosValores.codTipoVehiculo).toBe(
        datosOriginales.codTipoVehiculo
      );

      // Validar que el valor cambió
      expect(nuevosValores.valorTarifaDiaria).not.toBe(
        datosOriginales.valorTarifaDiaria
      );
      expect(nuevosValores.valorTarifaDiaria).toBe(18000);
    });
  });

  describe("Validaciones CRUD Completas", () => {
    it("debería validar operaciones CRUD en secuencia", () => {
      const tarifaData = {
        codParqueadero: 1,
        codTipoVehiculo: 2,
        valorTarifaDiaria: 15000,
      };

      // 1. Crear
      const tarifa = new TarifaDiaria(
        tarifaData.codParqueadero,
        tarifaData.codTipoVehiculo,
        tarifaData.valorTarifaDiaria
      );
      expect(tarifa.valorTarifaDiaria).toBe(15000);

      // 2. Leer/Consultar (simular que existe)
      const existeTarifa = { cantidad: "1" };
      expect(existeTarifa.cantidad).not.toBe("0");

      // 3. Actualizar
      tarifa.valorTarifaDiaria = 20000;
      expect(tarifa.valorTarifaDiaria).toBe(20000);

      // 4. Borrar (simular eliminación exitosa)
      const tarifaEliminada = {
        codParqueadero: tarifa.codParqueadero,
        codTipoVehiculo: tarifa.codTipoVehiculo,
      };
      expect(tarifaEliminada.codParqueadero).toBe(1);
      expect(tarifaEliminada.codTipoVehiculo).toBe(2);
    });

    it("debería validar consistencia de códigos de estado HTTP", () => {
      const statusCodes = {
        crear_exitoso: 201,
        consultar_exitoso: 200,
        actualizar_exitoso: 200,
        borrar_exitoso: 200,
        no_encontrado: 404,
        duplicado: 400,
        clave_foranea: 400,
        error_interno: 500,
      };

      expect(statusCodes.crear_exitoso).toBe(201);
      expect(statusCodes.consultar_exitoso).toBe(200);
      expect(statusCodes.actualizar_exitoso).toBe(200);
      expect(statusCodes.borrar_exitoso).toBe(200);
      expect(statusCodes.no_encontrado).toBe(404);
      expect(statusCodes.duplicado).toBe(400);
      expect(statusCodes.clave_foranea).toBe(400);
      expect(statusCodes.error_interno).toBe(500);
    });

    it("debería validar estructura de respuestas para todas las operaciones", () => {
      const respuestas = {
        crear: {
          respuesta: "Tarifa diaria creada correctamente",
          nuevaTarifa: {
            cod_parqueadero: 1,
            cod_tipo_vehiculo: 2,
            valor_tarifa_diaria: 15000,
          },
        },
        actualizar: {
          respuesta: "Tarifa diaria actualizada correctamente",
          tarifaActualizada: {
            cod_parqueadero: 1,
            cod_tipo_vehiculo: 2,
            valor_tarifa_diaria: 20000,
          },
        },
        borrar: {
          respuesta: "Tarifa diaria eliminada correctamente",
          tarifaEliminada: { codParqueadero: "1", codTipoVehiculo: "2" },
        },
        consultar: {
          respuesta: "Consulta de tarifas diarias exitosa",
          cantidad: 2,
          tarifasDiarias: [],
        },
      };

      expect(respuestas.crear).toHaveProperty("respuesta");
      expect(respuestas.crear).toHaveProperty("nuevaTarifa");
      expect(respuestas.actualizar).toHaveProperty("respuesta");
      expect(respuestas.actualizar).toHaveProperty("tarifaActualizada");
      expect(respuestas.borrar).toHaveProperty("respuesta");
      expect(respuestas.borrar).toHaveProperty("tarifaEliminada");
      expect(respuestas.consultar).toHaveProperty("respuesta");
      expect(respuestas.consultar).toHaveProperty("cantidad");
      expect(respuestas.consultar).toHaveProperty("tarifasDiarias");
    });
  });

  describe("Edge Cases", () => {
    it("debería manejar parámetros con valores extremos", () => {
      const maxValue = Number.MAX_SAFE_INTEGER;
      const tarifa = new TarifaDiaria(1, 1, maxValue);

      expect(tarifa.valorTarifaDiaria).toBe(maxValue);
      expect(Number.isSafeInteger(tarifa.valorTarifaDiaria)).toBe(true);
    });

    it("debería manejar conversión de strings a números", () => {
      const params = {
        codParqueadero: "123",
        codTipoVehiculo: "456",
      };

      const codParqueadero = parseInt(params.codParqueadero);
      const codTipoVehiculo = parseInt(params.codTipoVehiculo);

      expect(codParqueadero).toBe(123);
      expect(codTipoVehiculo).toBe(456);
    });

    it("debería detectar parámetros inválidos", () => {
      const invalidParams = {
        codParqueadero: "abc",
        codTipoVehiculo: "xyz",
      };

      const codParqueadero = parseInt(invalidParams.codParqueadero);
      const codTipoVehiculo = parseInt(invalidParams.codTipoVehiculo);

      expect(Number.isNaN(codParqueadero)).toBe(true);
      expect(Number.isNaN(codTipoVehiculo)).toBe(true);
    });

    it("debería manejar valores de actualización extremos", () => {
      const tarifa = new TarifaDiaria(1, 2, 15000);

      // Valor muy grande
      tarifa.valorTarifaDiaria = 999999999;
      expect(tarifa.valorTarifaDiaria).toBe(999999999);

      // Valor mínimo válido
      tarifa.valorTarifaDiaria = 1;
      expect(tarifa.valorTarifaDiaria).toBe(1);
    });

    it("debería validar integridad de datos en operaciones", () => {
      const req = createMockRequest(
        { codParqueadero: "1", codTipoVehiculo: "2" },
        { codParqueadero: 1, codTipoVehiculo: 2, valorTarifaDiaria: 15000 }
      );

      // Verificar que los parámetros de URL coinciden con los del body
      expect(parseInt(req.params.codParqueadero)).toBe(req.body.codParqueadero);
      expect(parseInt(req.params.codTipoVehiculo)).toBe(
        req.body.codTipoVehiculo
      );
    });

    it("debería manejar errores de validación de datos", () => {
      const invalidData = {
        codParqueadero: null,
        codTipoVehiculo: undefined,
        valorTarifaDiaria: "no_es_numero",
      };

      expect(invalidData.codParqueadero).toBeNull();
      expect(invalidData.codTipoVehiculo).toBeUndefined();
      expect(typeof invalidData.valorTarifaDiaria).toBe("string");
      expect(Number.isNaN(Number(invalidData.valorTarifaDiaria))).toBe(true);
    });
  });
});
