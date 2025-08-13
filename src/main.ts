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
  
  console.log('🌐 Allowed CORS origins:', allowedOrigins);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) {
        console.log('✅ Allowing request with no origin');
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, ""); // remove trailing slash
      const allowed = allowedOrigins.map(o => o.replace(/\/$/, "")); // remove slash in list

      console.log(`🔍 Checking origin: ${normalizedOrigin}`);
      console.log(`📋 Against allowed: ${allowed.join(', ')}`);

      if (allowed.includes(normalizedOrigin)) {
        console.log(`✅ CORS allowed: ${origin}`);
        callback(null, true);
      } else {
        console.error(`❌ CORS blocked: ${origin}`);
        console.error(`📋 Allowed origins: ${allowed.join(', ')}`);
        callback(new Error(`CORS policy violation. Origin ${origin} is not allowed.`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers'
    ],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 200
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

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📚 API docs available at http://localhost:${port}/api`);
}

bootstrap();