import { calcularFechaLimite, estaVencido } from './fechas.js';

describe('calcularFechaLimite', () => {
  it('suma los días de préstamo a la fecha de inicio', () => {
    const inicio = new Date(2026, 0, 10);
    const limite = calcularFechaLimite(inicio, 14);
    expect(limite).toEqual(new Date(2026, 0, 24));
  });

  it('no modifica la fecha original', () => {
    const inicio = new Date(2026, 0, 10);
    calcularFechaLimite(inicio, 5);
    expect(inicio).toEqual(new Date(2026, 0, 10));
  });

  it('pasa correctamente al mes siguiente', () => {
    const limite = calcularFechaLimite(new Date(2026, 0, 25), 10);
    expect(limite).toEqual(new Date(2026, 1, 4));
  });
});

describe('estaVencido', () => {
  const ahora = new Date(2026, 5, 15);

  it('está vencido si la fecha límite pasó y no se devolvió', () => {
    expect(estaVencido(new Date(2026, 5, 1), null, ahora)).toBe(true);
  });

  it('no está vencido si la fecha límite es futura', () => {
    expect(estaVencido(new Date(2026, 5, 30), null, ahora)).toBe(false);
  });

  it('no está vencido si ya se devolvió', () => {
    expect(
      estaVencido(new Date(2026, 5, 1), new Date(2026, 5, 10), ahora),
    ).toBe(false);
  });
});
