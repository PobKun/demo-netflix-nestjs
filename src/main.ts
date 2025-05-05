import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
