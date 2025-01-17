import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SerializationInterceptor } from './common/interceptors/serialization.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	app.enableCors();
	app.setGlobalPrefix('api');
	app.useGlobalInterceptors(new SerializationInterceptor());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidUnknownValues: true,
			stopAtFirstError: true,
			validateCustomDecorators: true,
		}),
	);

	const port = configService.get('PORT');

	await app.listen(port);
}
bootstrap();
