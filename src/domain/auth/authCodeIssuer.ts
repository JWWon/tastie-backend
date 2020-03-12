export interface AuthCodeIssuer {
  issue(email: string): string;
  extractEmail(token: string): string;
}

export const AuthCodeIssuerToken = Symbol();
