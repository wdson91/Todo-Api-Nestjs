import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('To-do Api')
    .setDescription(
      'To Do é um aplicativo de gerenciamento de tarefas,Ele permite que os usuários gerenciem suas tarefas,Primeiro devemos fazer um cadastro depois fazer o login,usando o token do login para acessar as rotas "todo"',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
