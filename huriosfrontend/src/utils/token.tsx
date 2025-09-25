// src/utils/token.tsx
export function saveToken(token: string) {
  localStorage.setItem("hurios_token", token);
}
export function getToken(): string | null {
  return localStorage.getItem("hurios_token");
}
export function clearToken() {
  localStorage.removeItem("hurios_token");
}
