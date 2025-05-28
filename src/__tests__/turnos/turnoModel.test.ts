import { describe, it, expect } from '@jest/globals';
import Turno from '../../app/turnos/model/Turno';

describe('Modelo Turno', () => {
  // Datos de prueba
  const datosTurno = {
    cod: 1,
    parqueadero: 2,
    descripcion: 'Turno de mañana',
    fecha: '2023-06-15',
    horaInicio: '08:00',
    horaFin: '14:00'
  };

  describe('Creación de instancia', () => {
    it('debería crear una instancia de Turno correctamente', () => {
      // Arrange & Act
      const turno = new Turno(
        datosTurno.cod,
        datosTurno.parqueadero,
        datosTurno.descripcion,
        datosTurno.fecha,
        datosTurno.horaInicio,
        datosTurno.horaFin
      );

      // Assert
      expect(turno).toBeInstanceOf(Turno);
      expect(turno.codTurno).toBe(datosTurno.cod);
      expect(turno.codParqueadero).toBe(datosTurno.parqueadero);
      expect(turno.descripcionTurno).toBe(datosTurno.descripcion);
      expect(turno.fechaTurno).toBe(datosTurno.fecha);
      expect(turno.horaInicioTurno).toBe(datosTurno.horaInicio);
      expect(turno.horaFinTurno).toBe(datosTurno.horaFin);
    });
  });

  describe('Getters y Setters', () => {
    it('debería obtener y establecer propiedades correctamente', () => {
      // Arrange
      const turno = new Turno(0, 0, '', '', '', '');
      
      // Act & Assert - codTurno
      turno.codTurno = datosTurno.cod;
      expect(turno.codTurno).toBe(datosTurno.cod);
      
      // Act & Assert - codParqueadero
      turno.codParqueadero = datosTurno.parqueadero;
      expect(turno.codParqueadero).toBe(datosTurno.parqueadero);
      
      // Act & Assert - descripcionTurno
      turno.descripcionTurno = datosTurno.descripcion;
      expect(turno.descripcionTurno).toBe(datosTurno.descripcion);
      
      // Act & Assert - fechaTurno
      turno.fechaTurno = datosTurno.fecha;
      expect(turno.fechaTurno).toBe(datosTurno.fecha);
      
      // Act & Assert - horaInicioTurno
      turno.horaInicioTurno = datosTurno.horaInicio;
      expect(turno.horaInicioTurno).toBe(datosTurno.horaInicio);
      
        38  
      // Act & Assert - horaFinTurno
      turno.horaFinTurno = datosTurno.horaFin;
      expect(turno.horaFinTurno).toBe(datosTurno.horaFin);
    });
  });
});