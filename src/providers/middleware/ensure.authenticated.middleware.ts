import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class EnsureAuthenticated implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: any) {
    const AuthHeader = req.headers.authorization;

    if (!AuthHeader) return this.accessDenied(req.url, 'Token not provided', res);

    const parts = AuthHeader.split(' ');

    if (parts.length !== 2) return this.accessDenied(req.url, 'Token malformed', res);

    const [bearer, token] = parts;

    if (!/^Bearer$/.test(bearer)) return this.accessDenied(req.url, 'Unauthorized', res);

    await this.jwtService
      .verifyAsync(token)
      .then((decoded) => {
        req.user = { id: decoded.id, email: decoded.email };

        return next();
      })
      .catch(() => {
        return this.accessDenied(req.url, 'Unauthorized', res);
      });
  }

  private accessDenied(url: string, message: string, res: Response) {
    return res.status(401).json({
      statusCode: 401,
      path: url,
      message: message,
    });
  }
}
