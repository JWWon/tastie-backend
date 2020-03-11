export interface AuthCodeIssuer {
  issue(email: string): string;
}

export const AuthCodeIssuerToken = Symbol();
