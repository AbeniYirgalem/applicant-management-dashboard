export const AUTH_TOKEN_COOKIE = "infnova_access_token";

export function getStoredToken() {
  if (typeof document === "undefined") return null;
  return (
    document.cookie
      .split("; ")
      .find((value) => value.startsWith(`${AUTH_TOKEN_COOKIE}=`))
      ?.split("=")[1] ?? null
  );
}

export function storeToken(token: string, expiresIn: number) {
  const expires = new Date(Date.now() + expiresIn * 1000).toUTCString();
  document.cookie = `${AUTH_TOKEN_COOKIE}=${token}; Path=/; Expires=${expires}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
}

export function clearStoredToken() {
  document.cookie = `${AUTH_TOKEN_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}
