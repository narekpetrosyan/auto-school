import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(HttpException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (request.file) {
      fs.unlink(request.file.path, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });
    }

    response.status(status).json(exception.getResponse());
  }
}
