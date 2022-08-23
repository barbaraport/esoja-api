import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalAppConfig } from './utils/functions/global.config.fn';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  globalAppConfig(app);

  app.enableCors({
    credentials: true,
    optionsSuccessStatus: 204,
    methods: 'GET, POST, PUT, DELETE, UPDATE, OPTIONS',
  });

  await app.listen(process.env.PORT || 8080);

  console.log('Server on');
  console.log(`env: .env.${process.env.NODE_ENV}`);
}
bootstrap();
