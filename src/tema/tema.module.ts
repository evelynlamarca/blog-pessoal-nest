import { Module } from '@nestjs/common';
import { TemaService } from './service/tema.service';
import { TemaController } from './controller/tema.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tema])],
  controllers: [TemaController],
  providers: [TemaService],
  exports: [TemaService],
})
export class TemaModule {}
