import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tema } from '../entities/tema.entity';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema) private temaRepository: Repository<Tema>,
  ) {}

  async findAll(): Promise<Tema[]> {
    return this.temaRepository.find({ relations: { postagens: true } });
  }

  async findById(id: number): Promise<Tema> {
    const tema =
      id &&
      (await this.temaRepository.findOne({
        where: { id },
        relations: { postagens: true },
      }));
    if (!tema)
      throw new HttpException(`Id de Tema inválido`, HttpStatus.NOT_FOUND);
    return tema;
  }
  async findAllByDescricao(descricao: string): Promise<Tema[]> {
    return await this.temaRepository.find({
      where: { descricao: ILike(`%${descricao}%`) },
      relations: { postagens: true },
    });
  }
  async create(tema: Tema): Promise<Tema> {
    const { id, ...dadosSemId } = tema;
    return this.temaRepository.save(dadosSemId);
  }

  async update(tema: Tema): Promise<Tema> {
    await this.findById(tema.id);
    return this.temaRepository.save(tema);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.temaRepository.delete(id);
  }
}
