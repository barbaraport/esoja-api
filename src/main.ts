import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalAppConfig } from './utils/functions/global.config.fn';
import ip from 'ip';

async function bootstrap() {
  const ipAddress: string = ip.address();
  const port: string | number = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);

  globalAppConfig(app);

  app.enableCors({
    credentials: true,
    optionsSuccessStatus: 204,
    methods: 'GET, POST, PUT, DELETE, UPDATE, OPTIONS',
  });

  await app.listen(port, 'localhost');

  console.log(`Server running at ${ipAddress}:${port}`);
  console.log(`env: .env.${process.env.NODE_ENV}`);
}
bootstrap();
