// tests/ServicioRolCrear.test.ts
import { Response } from 'express';
import ServicioRolCrear from '../../app/rol/service/ServicioRolCrear';
import pool from '../../config/connection/dbConnection';
import { SQL_ROL } from '../../app/rol/repository/sql_rol';

jest.mock('../setup.ts', () => ({
  __esModule: true,
  default: {
    one: jest.fn()
  }
}));


describe('ServicioRolCrear.grabarRol', () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it('debe retornar 400 si no se envía un nombre de rol válido', async () => {
    // @ts-ignore
    await ServicioRolCrear['grabarRol']({}, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      respuesta: 'Datos de rol inválidos'
    });
  });

  it('debe retornar 409 si ya existe el rol', async () => {
    (pool.one as jest.Mock).mockResolvedValue({ cantidad: 1 });

    const rol = { nombreRol: 'Admin' };
    // @ts-ignore
    await ServicioRolCrear['grabarRol'](rol, mockResponse as Response);

    expect(pool.one).toHaveBeenCalledWith(SQL_ROL.HOW_MANY, ['Admin']);
    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      respuesta: 'Ya existe un rol con este nombre'
    });
  });

  it('debe retornar 201 si el rol se crea exitosamente', async () => {
    (pool.one as jest.Mock)
      .mockResolvedValueOnce({ cantidad: 0 }) // No existe el rol
      .mockResolvedValueOnce({ cod_rol: 123 }); // Rol creado

    const rol = { nombreRol: 'NuevoRol' };
    // @ts-ignore
    await ServicioRolCrear['grabarRol'](rol, mockResponse as Response);

    expect(pool.one).toHaveBeenCalledTimes(2);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      respuesta: 'Rol creado exitosamente',
      detalles: {
        codigoRol: 123,
        nombreRol: 'NuevoRol'
      }
    });
  });

  it('debe retornar 500 si ocurre un error inesperado', async () => {
    (pool.one as jest.Mock).mockRejectedValue(new Error('DB error'));

    const rol = { nombreRol: 'TestError' };
    // @ts-ignore
    await ServicioRolCrear['grabarRol'](rol, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      respuesta: 'Error interno al crear rol'
    });
  });
});
