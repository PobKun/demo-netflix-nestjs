import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/exception-filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3737',
      'http://192.168.200.46:3737',
      'https://demo-netflix-nextjs.wareeasy.com'
    ],
    methods: ["GET"],
    credentials: true,
  });

  app.useGlobalFilters(new GlobalExceptionFilter())

  const config = new DocumentBuilder()
  .setTitle('Demo Movie API')
  .setDescription('RESTful API Movie API')
  .setVersion('1.0')
  .addTag('movies')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3939);
}
bootstrap();
