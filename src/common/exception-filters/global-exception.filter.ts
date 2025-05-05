import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const isClientError = status >= 400;
    const success = !isClientError;
    const stackLine = exception.stack.split('\n')[1].trim();
    const filePathMatch = stackLine.match(/\((.*):\d+:\d+\)/); 
    const filePath = (filePathMatch && filePathMatch[1]) ? filePathMatch[1] : 'not found';
    
    if(!success) {
        this.logger.log(`Exception [fail]: ${exception.message} [path: ${filePath}]`);
    }else{
        this.logger.log(`Exception [ok]: ${exception.message} [path: ${filePath}]`);
    }
    
    response.status(status).json({
      success: success,
      statusCode: status,
      errors: exception.response?.errors ?? null,
      message: exception.response?.message || exception.message || 'An unexpected error occurred',
      data: exception.response?.data ?? null
    });
  }
}
