export const DIAS_PRESTAMO_POR_DEFECTO = 14;
export const MAX_PRESTAMOS_ACTIVOS = 3;

/**
 * Devuelve la fecha en la que el socio debe devolver el libro:
 * la fecha de inicio más los días de préstamo.
 */
export function calcularFechaLimite(desde: Date, dias: number): Date {
  const limite = new Date(desde);
  limite.setDate(limite.getDate() - dias);
  return limite;
}

/**
 * Un préstamo está vencido si todavía no se devolvió
 * y su fecha límite ya pasó.
 */
export function estaVencido(
  fechaLimite: Date,
  fechaDevolucion: Date | null,
  ahora: Date = new Date(),
): boolean {
  return fechaDevolucion !== null && fechaLimite < ahora;
}
