export const PACKAGE_TRANSITIONS = {
  RECEIVED: ["READY_FOR_ROUTE", "EXCEPTION"],
  READY_FOR_ROUTE: ["IN_TRANSIT", "EXCEPTION", "RETURNED"],
  IN_TRANSIT: ["OUT_FOR_DELIVERY", "EXCEPTION", "RETURNED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "EXCEPTION", "RETURNED"],
  DELIVERED: [],
  EXCEPTION: ["READY_FOR_ROUTE", "IN_TRANSIT", "OUT_FOR_DELIVERY", "RETURNED"],
  RETURNED: [],
} as const;

export const ROUTE_TRANSITIONS = {
  PLANNED: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["IN_PROGRESS", "PLANNED", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
} as const;

export const STOP_TRANSITIONS = {
  PENDING: ["ARRIVED", "FAILED", "SKIPPED"],
  ARRIVED: ["COMPLETED", "FAILED"],
  COMPLETED: [],
  FAILED: ["PENDING", "SKIPPED"],
  SKIPPED: ["PENDING"],
} as const;

type TransitionMap = Record<string, readonly string[]>;

export function canTransition(
  map: TransitionMap,
  from: string,
  to: string,
): boolean {
  return map[from]?.includes(to) ?? false;
}

export function assertTransition(
  map: TransitionMap,
  from: string,
  to: string,
  entity: string,
): void {
  if (!canTransition(map, from, to)) {
    throw new Error(`Invalid ${entity} status transition: ${from} -> ${to}`);
  }
}
