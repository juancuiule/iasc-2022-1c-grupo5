import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client.module';

async function bootstrap() {
  const app = await NestFactory.create(ClientModule);
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
