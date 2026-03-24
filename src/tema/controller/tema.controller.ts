import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TemaService } from '../service/tema.service';
import { Tema } from '../entities/tema.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Tema')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('temas')
export class TemaController {
  constructor(private readonly temaService: TemaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.create(tema);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.temaService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
    return this.temaService.findById(id);
  }

  @Get('descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findAllByDescricao(@Param('descricao') descricao: string): Promise<Tema[]> {
    return this.temaService.findAllByDescricao(descricao);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() tema: Tema) {
    return this.temaService.update(tema);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.temaService.delete(id);
  }
}
