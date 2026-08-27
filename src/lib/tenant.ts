export function assertTenantScope(sessionTenantId: string, resourceTenantId: string) {
  if (sessionTenantId !== resourceTenantId) {
    throw new Error("Bu kayda erişim yetkiniz yok");
  }
}
