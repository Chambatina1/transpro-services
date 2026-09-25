"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  CircleDot,
  Clock3,
  Gauge,
  LocateFixed,
  MapPinned,
  Navigation,
  PackageCheck,
  RefreshCw,
  Route as RouteIcon,
  ShieldCheck,
  Truck,
  UserRound,
  Warehouse,
} from "lucide-react";

type Metrics = {
  routesToday: number;
  activeDrivers: number;
  activeVehicles: number;
  pendingStops: number;
  openIncidents: number;
  deliveredToday: number;
};

type Stop = {
  id: string;
  sequence: number;
  label: string | null;
  city: string | null;
  state: string | null;
  status: string;
  latitude: number | null;
  longitude: number | null;
  plannedEta: string | null;
};

type RouteItem = {
  id: string;
  routeNumber: string;
  serviceDate: string;
  status: string;
  driver: { id: string; name: string; status: string } | null;
  vehicle: { id: string; unitNumber: string; status: string } | null;
  stops: Stop[];
};

type Driver = {
  id: string;
  name: string;
  status: string;
  phone: string | null;
};

type Vehicle = {
  id: string;
  unitNumber: string;
  make: string | null;
  model: string | null;
  status: string;
  capacityLb: number | null;
};

type Incident = {
  id: string;
  title: string;
  severity: string;
  type: string;
  createdAt: string;
};

type DashboardData = {
  connected: boolean;
  generatedAt: string;
  metrics: Metrics;
  routes: RouteItem[];
  drivers: Driver[];
  vehicles: Vehicle[];
  incidents: Incident[];
  message?: string;
};

const emptyData: DashboardData = {
  connected: false,
  generatedAt: new Date(0).toISOString(),
  metrics: {
    routesToday: 0,
    activeDrivers: 0,
    activeVehicles: 0,
    pendingStops: 0,
    openIncidents: 0,
    deliveredToday: 0,
  },
  routes: [],
  drivers: [],
  vehicles: [],
  incidents: [],
};

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    PLANNED: "Planificada",
    ASSIGNED: "Asignada",
    IN_PROGRESS: "En ruta",
    COMPLETED: "Completada",
    CANCELLED: "Cancelada",
    OFFLINE: "Fuera de línea",
    AVAILABLE: "Disponible",
    ON_ROUTE: "En ruta",
    BREAK: "Descanso",
    ACTIVE: "Activo",
    MAINTENANCE: "Mantenimiento",
    OUT_OF_SERVICE: "Fuera de servicio",
    PENDING: "Pendiente",
    ARRIVED: "Llegó",
    FAILED: "Fallida",
    SKIPPED: "Omitida",
  };
  return labels[status] ?? status.replaceAll("_", " ");
}

function statusClass(status: string) {
  if (["COMPLETED", "DELIVERED", "ACTIVE", "AVAILABLE"].includes(status)) {
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  }
  if (["IN_PROGRESS", "ON_ROUTE", "ARRIVED", "ASSIGNED"].includes(status)) {
    return "bg-blue-100 text-blue-800 border-blue-200";
  }
  if (["FAILED", "CANCELLED", "OUT_OF_SERVICE"].includes(status)) {
    return "bg-red-100 text-red-800 border-red-200";
  }
  if (["MAINTENANCE", "BREAK"].includes(status)) {
    return "bg-amber-100 text-amber-800 border-amber-200";
  }
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function MetricCard({
  label,
  value,
  icon: Icon,
  detail,
}: {
  label: string;
  value: number;
  icon: typeof Truck;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-400">{detail}</p>
        </div>
        <div className="rounded-xl bg-slate-950 p-3 text-[#d4a017]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function DispatchPage() {
  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/transport/dashboard", { cache: "no-store" });
      const payload = (await response.json()) as DashboardData;
      setData(payload);
      if (!selectedRouteId && payload.routes[0]) {
        setSelectedRouteId(payload.routes[0].id);
      }
    } catch {
      setData(emptyData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const selectedRoute = useMemo(
    () => data.routes.find((route) => route.id === selectedRouteId) ?? data.routes[0] ?? null,
    [data.routes, selectedRouteId],
  );

  const mapQuery = selectedRoute?.stops.find((stop) => stop.city || stop.label);
  const mapLocation = mapQuery
    ? [mapQuery.label, mapQuery.city, mapQuery.state].filter(Boolean).join(", ")
    : "4980 Patch Rd, Orlando, FL 32822";

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4a017] text-slate-950">
              <Truck className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                  Transporte Chambatina
                </h1>
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                  Command Center
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                Despacho, rutas, flota y entregas desde un solo panel.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold ${
                data.connected
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-300"
              }`}
            >
              <CircleDot className="h-3.5 w-3.5" />
              {data.connected ? "Datos operativos conectados" : "Esperando base operativa"}
            </div>
            <button
              onClick={() => void load()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold transition hover:bg-white/15 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </button>
            <Link
              href="/"
              className="rounded-xl bg-[#d4a017] px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-[#f0c94b]"
            >
              Web principal
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 lg:px-8">
        {!data.connected && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">El tablero está activo, pero la base operativa todavía no responde.</p>
              <p className="mt-1 text-sm text-amber-800">
                No se muestran datos inventados. Al conectar PostgreSQL y cargar rutas reales,
                este panel comenzará a reflejar la operación automáticamente.
              </p>
            </div>
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <MetricCard label="Rutas de hoy" value={data.metrics.routesToday} icon={RouteIcon} detail="Planificadas + activas" />
          <MetricCard label="Conductores" value={data.metrics.activeDrivers} icon={UserRound} detail="Activos ahora" />
          <MetricCard label="Vehículos" value={data.metrics.activeVehicles} icon={Truck} detail="Disponibles/operativos" />
          <MetricCard label="Paradas" value={data.metrics.pendingStops} icon={MapPinned} detail="Pendientes o en sitio" />
          <MetricCard label="Entregas" value={data.metrics.deliveredToday} icon={PackageCheck} detail="Completadas hoy" />
          <MetricCard label="Incidencias" value={data.metrics.openIncidents} icon={AlertTriangle} detail="Sin resolver" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-black">Mapa de despacho</h2>
                <p className="text-sm text-slate-500">
                  Centro de referencia: Orlando. Las rutas reales aparecerán al registrar paradas.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <LocateFixed className="h-4 w-4" />
                {mapLocation}
              </div>
            </div>
            <div className="relative h-[430px] bg-slate-200">
              <iframe
                title="Mapa operativo Transporte Chambatina"
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapLocation)}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl border border-white/30 bg-slate-950/90 px-4 py-3 text-white shadow-xl backdrop-blur">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <Navigation className="h-4 w-4 text-[#d4a017]" />
                  Google Maps conectado
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Preparado para sustituirse por pines GPS en vivo vía Maps API.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-black">Rutas</h2>
              <p className="text-sm text-slate-500">Selecciona una ruta para revisar sus paradas.</p>
            </div>
            <div className="max-h-[430px] overflow-y-auto p-3">
              {data.routes.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center px-6 text-center">
                  <RouteIcon className="h-10 w-10 text-slate-300" />
                  <p className="mt-3 font-bold text-slate-700">No hay rutas cargadas</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Cuando se creen rutas en la base de datos aparecerán aquí.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.routes.map((route) => (
                    <button
                      key={route.id}
                      onClick={() => setSelectedRouteId(route.id)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        selectedRoute?.id === route.id
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-black">{route.routeNumber}</p>
                          <p className={`mt-1 text-xs ${selectedRoute?.id === route.id ? "text-slate-300" : "text-slate-500"}`}>
                            {route.driver?.name ?? "Sin conductor"} · {route.vehicle?.unitNumber ?? "Sin vehículo"}
                          </p>
                        </div>
                        <span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${statusClass(route.status)}`}>
                          {statusLabel(route.status)}
                        </span>
                      </div>
                      <div className={`mt-3 flex items-center gap-3 text-xs ${selectedRoute?.id === route.id ? "text-slate-300" : "text-slate-500"}`}>
                        <MapPinned className="h-3.5 w-3.5" />
                        {route.stops.length} paradas
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-black">Secuencia de paradas</h2>
                <p className="text-sm text-slate-500">
                  {selectedRoute ? selectedRoute.routeNumber : "Sin ruta seleccionada"}
                </p>
              </div>
              <Clock3 className="h-5 w-5 text-slate-400" />
            </div>
            <div className="p-5">
              {!selectedRoute ? (
                <p className="py-10 text-center text-sm text-slate-400">No hay ruta disponible.</p>
              ) : selectedRoute.stops.length === 0 ? (
                <p className="py-10 text-center text-sm text-slate-400">Esta ruta todavía no tiene paradas.</p>
              ) : (
                <div className="space-y-3">
                  {selectedRoute.stops.map((stop) => (
                    <div key={stop.id} className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-[#d4a017]">
                        {stop.sequence}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold">{stop.label ?? "Parada"}</p>
                        <p className="text-sm text-slate-500">
                          {[stop.city, stop.state].filter(Boolean).join(", ") || "Dirección pendiente"}
                        </p>
                      </div>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusClass(stop.status)}`}>
                        {statusLabel(stop.status)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-black">Incidencias</h2>
              <p className="text-sm text-slate-500">Prioridad operacional.</p>
            </div>
            <div className="p-4">
              {data.incidents.length === 0 ? (
                <div className="flex h-52 flex-col items-center justify-center text-center">
                  <ShieldCheck className="h-10 w-10 text-emerald-400" />
                  <p className="mt-3 font-bold">Sin incidencias abiertas</p>
                  <p className="mt-1 text-sm text-slate-400">Todo limpio en este momento.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.incidents.map((incident) => (
                    <div key={incident.id} className="rounded-xl border border-slate-200 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-bold">{incident.title}</p>
                        <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-black text-red-700">
                          {incident.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{statusLabel(incident.type)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
              <UserRound className="h-5 w-5" />
              <div>
                <h2 className="font-black">Conductores</h2>
                <p className="text-sm text-slate-500">Disponibilidad y estado.</p>
              </div>
            </div>
            <div className="grid gap-3 p-4 sm:grid-cols-2">
              {data.drivers.length === 0 ? (
                <p className="col-span-full py-8 text-center text-sm text-slate-400">No hay conductores registrados.</p>
              ) : data.drivers.map((driver) => (
                <div key={driver.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                  <div>
                    <p className="font-bold">{driver.name}</p>
                    <p className="text-xs text-slate-400">{driver.phone ?? "Sin teléfono"}</p>
                  </div>
                  <span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${statusClass(driver.status)}`}>
                    {statusLabel(driver.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
              <Gauge className="h-5 w-5" />
              <div>
                <h2 className="font-black">Flota</h2>
                <p className="text-sm text-slate-500">Unidades y capacidad.</p>
              </div>
            </div>
            <div className="grid gap-3 p-4 sm:grid-cols-2">
              {data.vehicles.length === 0 ? (
                <p className="col-span-full py-8 text-center text-sm text-slate-400">No hay vehículos registrados.</p>
              ) : data.vehicles.map((vehicle) => (
                <div key={vehicle.id} className="rounded-xl border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black">{vehicle.unitNumber}</p>
                      <p className="text-xs text-slate-400">
                        {[vehicle.make, vehicle.model].filter(Boolean).join(" ") || "Unidad"}
                      </p>
                    </div>
                    <span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${statusClass(vehicle.status)}`}>
                      {statusLabel(vehicle.status)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <Boxes className="h-3.5 w-3.5" />
                    {vehicle.capacityLb ? `${vehicle.capacityLb.toLocaleString()} lb` : "Capacidad sin registrar"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Warehouse className="h-4 w-4 text-[#d4a017]" />
            Centro operativo Chambatina · Orlando, Florida
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Actualización automática cada 30 segundos
          </div>
        </footer>
      </div>
    </main>
  );
}
