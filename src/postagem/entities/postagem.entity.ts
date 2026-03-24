import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsObject, IsOptional, Length } from 'class-validator';

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @IsInt()
  @IsOptional()
  @PrimaryGeneratedColumn()
  @ApiProperty()

  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({message: "O Título é Obrigatório"}) // Forçar digitação
  @Length(5, 100, {message: "O Título deve ter entre 5 e 100 caracteres"})
  @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
  @ApiProperty()
  titulo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim()) // Remover espaços em branco I/F
  @IsNotEmpty({message: "O Texto é Obrigatório"}) // Forçar digitação
  @Length(10, 1000, {message: "O Texto deve ter entre 10 e 1000 caracteres"})
  @ApiProperty()
  @Column({length: 1000, nullable: false})
  texto: string;

  @UpdateDateColumn()
  @ApiProperty()
  data: Date;

  @ManyToOne(() => Tema, (tema) => tema.postagens, { onDelete: 'CASCADE' })
  @IsObject()
  @IsNotEmpty()
  @Type(() => Tema)
  @ApiProperty()
  tema: Tema;

  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, { onDelete: 'CASCADE' })
  @IsObject()
  @IsNotEmpty()
  @Type(() => Tema)
  @ApiProperty({ 
    type: Usuario,
    example: { id: 1 } // Apenas o id no exemplo do Swagger
  })
  
  usuario: Usuario;
}
