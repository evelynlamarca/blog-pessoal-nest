import { Postagem } from './../entities/postagem.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { TemaService } from '../../tema/service/tema.service';
import { UsuarioService } from '../../usuario/service/usuario.service';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
    private temaService: TemaService,
    private usuarioService: UsuarioService
  ) {}

  async findAll(): Promise<Postagem[]> {
    // return this.postagemRepository.find({ relations: { tema: true,usuario:true } });
    return this.postagemRepository.createQueryBuilder("postagem")
    .leftJoinAndSelect("postagem.tema", "tema")
    .leftJoin("postagem.usuario", "usuario")
    .addSelect(["usuario.id", "usuario.nome"]) // Seleciona apenas id e nome do usuario
    .getMany();
  }

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.createQueryBuilder("postagem")
    .leftJoinAndSelect("postagem.tema", "tema")
    .leftJoin("postagem.usuario", "usuario")
    .addSelect(["usuario.id", "usuario.nome"]) 
    .where("postagem.id = :id", { id: id }) // Substitua o 'id' pelo parâmetro da sua função
    .getOne();

    if (!postagem) {
      throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
    }
    return postagem;
  }

  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.createQueryBuilder("postagem")
    .leftJoinAndSelect("postagem.tema", "tema")
    .leftJoin("postagem.usuario", "usuario")
    .addSelect(["usuario.id", "usuario.nome"])
    .where("postagem.titulo ILIKE :titulo", { titulo: `%${titulo}%` })
    .getMany();
  }

  async create(postagem: Postagem): Promise<Postagem> {
    await this.temaService.findById(postagem.tema.id);
    await this.usuarioService.findById(postagem.usuario.id);
    const {id, ...postagemSemId} = postagem;
    return await this.postagemRepository.save(postagemSemId);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    if (!postagem.id || postagem.id <= 0)
      throw new HttpException('ID inválido!', HttpStatus.BAD_GATEWAY);
    await this.temaService.findById(postagem.tema.id);
    await this.usuarioService.findById(postagem.usuario.id);
    await this.findById(postagem.id);
    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.postagemRepository.delete({ id });
  }
}
