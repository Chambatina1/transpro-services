import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [
      routesToday,
      activeDrivers,
      activeVehicles,
      pendingStops,
      openIncidents,
      deliveredToday,
      routes,
      drivers,
      vehicles,
      incidents,
    ] = await Promise.all([
      db.route.count({
        where: {
          serviceDate: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(24, 0, 0, 0)),
          },
        },
      }),
      db.driver.count({ where: { active: true, status: { not: "OFFLINE" } } }),
      db.vehicle.count({ where: { active: true, status: "ACTIVE" } }),
      db.stop.count({ where: { status: { in: ["PENDING", "ARRIVED"] } } }),
      db.incident.count({ where: { resolved: false } }),
      db.package.count({
        where: {
          status: "DELIVERED",
          updatedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      db.route.findMany({
        orderBy: [{ serviceDate: "desc" }, { routeNumber: "asc" }],
        take: 8,
        include: {
          driver: { select: { id: true, name: true, status: true } },
          vehicle: { select: { id: true, unitNumber: true, status: true } },
          stops: {
            orderBy: { sequence: "asc" },
            select: {
              id: true,
              sequence: true,
              label: true,
              city: true,
              state: true,
              status: true,
              latitude: true,
              longitude: true,
              plannedEta: true,
            },
          },
        },
      }),
      db.driver.findMany({
        where: { active: true },
        orderBy: { name: "asc" },
        take: 12,
        select: { id: true, name: true, status: true, phone: true },
      }),
      db.vehicle.findMany({
        where: { active: true },
        orderBy: { unitNumber: "asc" },
        take: 12,
        select: {
          id: true,
          unitNumber: true,
          make: true,
          model: true,
          status: true,
          capacityLb: true,
        },
      }),
      db.incident.findMany({
        where: { resolved: false },
        orderBy: [{ severity: "desc" }, { createdAt: "desc" }],
        take: 8,
        select: {
          id: true,
          title: true,
          severity: true,
          type: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json(
      {
        connected: true,
        generatedAt: new Date().toISOString(),
        metrics: {
          routesToday,
          activeDrivers,
          activeVehicles,
          pendingStops,
          openIncidents,
          deliveredToday,
        },
        routes,
        drivers,
        vehicles,
        incidents,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("transport dashboard unavailable", error);
    return NextResponse.json(
      {
        connected: false,
        generatedAt: new Date().toISOString(),
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
        message: "Base de datos de transporte no disponible.",
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
