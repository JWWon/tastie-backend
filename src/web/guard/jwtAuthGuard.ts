import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenIssuerToken, TokenIssuer } from '@/domain/auth';

export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(TokenIssuerToken)
    private readonly tokenIssuer: TokenIssuer,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeaders = req.headers.authorization;

    const accessToken = (authHeaders as string).split(' ')[1];
    if (accessToken === undefined) {
      return false;
    }

    try {
      const user = this.tokenIssuer.extractTokenClaims(accessToken);
      if (user === undefined) {
        return false;
      }

      // eslint-disable-next-line dot-notation
      req['user'] = user;

      return true;
    } catch (err) {
      return false;
    }
  }
}
