import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalAppConfig } from './utils/functions/global.config.fn';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  globalAppConfig(app);

  const whitelist = ['http://localhost:3000'];

  app.enableCors({
    credentials: true,
    optionsSuccessStatus: 204,
    origin: whitelist,
    methods: 'GET, POST, PUT, DELETE, UPDATE, OPTIONS',
  });

  await app.listen(3333);

  console.log('Server on');
}
bootstrap();