const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

/** Partes de una fecha vista en hora de Bogotá (UTC−5, sin horario de verano). */
function partes(iso: string) {
  const d = new Date(new Date(iso).getTime() - 5 * 3600_000);
  return {
    anio: d.getUTCFullYear(),
    mes: d.getUTCMonth(),
    dia: d.getUTCDate(),
    diaSemana: d.getUTCDay(),
    hora: d.getUTCHours(),
    minuto: d.getUTCMinutes(),
  };
}

function claveDia(iso: string) {
  const p = partes(iso);
  return Date.UTC(p.anio, p.mes, p.dia);
}

/** «7:00 pm» */
export function formatHora(iso: string) {
  const { hora, minuto } = partes(iso);
  const h12 = hora % 12 === 0 ? 12 : hora % 12;
  return `${h12}:${String(minuto).padStart(2, "0")} ${hora < 12 ? "am" : "pm"}`;
}

/** «Sáb 4 Oct · 7:00 pm»; «Hoy · 6:00 pm» si es el mismo día que `ahora`. */
export function formatFechaHora(iso: string, ahora: string) {
  return `${formatDia(iso, ahora)} · ${formatHora(iso)}`;
}

/** «Sáb 4 Oct»; con , «Hoy» si es el mismo día. */
export function formatDia(iso: string, ahora?: string) {
  if (ahora && claveDia(iso) === claveDia(ahora)) return "Hoy";
  const p = partes(iso);
  return `${DIAS[p.diaSemana]} ${p.dia} ${MESES[p.mes]}`;
}

/** Días calendario entre `ahora` y `iso` (negativo si ya pasó). */
export function diasHasta(iso: string, ahora: string) {
  return Math.round((claveDia(iso) - claveDia(ahora)) / 86_400_000);
}

/** 7_476 → «02:04:36» */
export function formatCuentaAtras(segundos: number) {
  const s = Math.max(0, Math.floor(segundos));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return [h, m, s % 60].map((n) => String(n).padStart(2, "0")).join(":");
}

/** 1240 → «1.240» */
export function formatPuntos(n: number) {
  return new Intl.NumberFormat("es-CO").format(n);
}

/** «Sáb» */
export function formatDiaSemana(iso: string) {
  return DIAS[partes(iso).diaSemana];
}

/** «Sáb 4» */
export function formatDiaCorto(iso: string) {
  return `${formatDiaSemana(iso)} ${partes(iso).dia}`;
}

/** Fecha y hora en formato iCalendar/Google Calendar: 20261024T190000Z. */
export function formatFechaUtc(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
}

/** «Hace 3 min», «Hace 2 h», «Hace 2 días» entre `iso` y `ahora`. */
export function formatHace(iso: string, ahora: string) {
  const min = Math.max(0, Math.round((new Date(ahora).getTime() - new Date(iso).getTime()) / 60_000));
  if (min < 1) return "Hace un momento";
  if (min < 60) return `Hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `Hace ${h} h`;
  const d = Math.round(h / 24);
  return `Hace ${d} ${d === 1 ? "día" : "días"}`;
}
