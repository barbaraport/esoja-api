import { globalAppConfig } from './utils/functions/global.config.fn';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import ip from 'ip';

async function bootstrap() {
  const ipAddress: string = ip.address();
  const port: string | number = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  globalAppConfig(app);

  app.enableCors({
    credentials: true,
    optionsSuccessStatus: 204,
    methods: 'GET, POST, PUT, DELETE, UPDATE, OPTIONS',
  });

  await app.listen(port, ipAddress);

  console.log(`Server running at ${ipAddress}:${port}`);
}
bootstrap();
