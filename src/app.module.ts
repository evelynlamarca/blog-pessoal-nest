import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Postagem } from './postagem/entities/postagem.entity';
import { Tema } from './tema/entities/tema.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',     //
      port: Number(process.env.DB_PORT) || 3306,    // 
      username: process.env.DB_USER || 'root',      // 
      password: process.env.DB_PASSWORD || 'root',  // 
      database: process.env.DB_NAME || 'db_blogpessoal', // 
      entities: [Postagem, Tema, Usuario],
      synchronize: true, // 
    }),
    PostagemModule,
    TemaModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}