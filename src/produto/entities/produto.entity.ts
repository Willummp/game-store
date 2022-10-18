import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'tb_produtos'}) //NOTE - Isso é um DECORATOR
export class Produto {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({length:255, nullable:false})
  nome: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn() //NOTE  Só pra falar q data é uma DATA msm
  updatedAt: Date;


}


