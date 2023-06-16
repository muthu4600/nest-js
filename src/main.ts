import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://192.168.5.112:3000',
      'http://192.168.5.55:3000',
      'http://localhost:3000'
    ],
    credentials: true,
  });
  await app.listen(5000);
}
bootstrap();
