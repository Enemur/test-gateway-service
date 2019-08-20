import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './core/service/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      validationError: { target: false },
    }),
  );

  const { basePath, port, isSwaggerEnabled } = configService;
  app.setGlobalPrefix(basePath);

  if (isSwaggerEnabled) {
    const options = new DocumentBuilder()
      .setTitle('Nest API')
      .setDescription('API description')
      .setBasePath(basePath)
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${basePath}/docs`, app, document);
  }

  await app.listen(port);
}
bootstrap();
