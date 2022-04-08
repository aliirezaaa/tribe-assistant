import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';
/**
 * @function
 * This function creates the main app and set the listen port
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const rawBodyBuffer = (req, res, buffer, encoding) => {
    if (!req.headers['stripe-signature']) {
      return;
    }

    if (buffer && buffer.length) {
      req.rawBody = buffer.toString(encoding || 'utf8');
    }
  };
  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(bodyParser.json({ verify: rawBodyBuffer }));
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
