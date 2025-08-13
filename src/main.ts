import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Read allowed origins from .env
  const allowedOrigins = process.env.CORS_ORIGINS?.split(',').map(o => o.trim()) || [];

  app.enableCors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser requests

    const normalizedOrigin = origin.replace(/\/$/, ""); // remove trailing slash
    const allowed = allowedOrigins.map(o => o.replace(/\/$/, "")); // remove slash in list

    if (allowed.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      console.error(`❌ CORS blocked: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});


  app.use('/storage', express.static(join(__dirname, '..', 'storage')));

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('FAYA Port:80')
    .setDescription('Server API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
}
bootstrap();
