import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from '../auth/auth.module';
import { Bcrypt } from '../auth/bcrypt/bcrypt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), 
    forwardRef(() => AuthModule)
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, Bcrypt],
  exports: [UsuarioService]
})
export class UsuarioModule {}