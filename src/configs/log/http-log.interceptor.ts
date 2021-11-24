import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    this.logger.log(`Request ${req.method}`, req.url);

    if (Object.keys(req.body).length > 0) {
      this.logger.log('Request body:', req.url);
      this.logger.log(req.body, req.url);
    }

    if (Object.keys(req.params).length > 0) {
      this.logger.log('Request params:', req.url);
      this.logger.log(req.params, req.url);
    }

    if (Object.keys(req.query).length > 0) {
      this.logger.log('Request query:', req.url);
      this.logger.log(req.query, req.url);
    }

    return next.handle().pipe(
      tap((response) => {
        this.logger.log(`Response ${statusCode}`, req.url);
        this.logger.log(response, req.url);
      }),
    );
  }
}
