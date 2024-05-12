import { HttpAdapterHost, AbstractHttpAdapter } from '@nestjs/core';
import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Catch,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;

  constructor(httpAdapterHost: HttpAdapterHost) {
    this.httpAdapter = httpAdapterHost.httpAdapter;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const { status, body } =
      exception instanceof HttpException
        ? { status: exception.getStatus(), body: exception.getResponse() }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              message: exception.message,
              path: request.path,
            },
          };

    this.httpAdapter.reply(response, body, status);
  }
}
