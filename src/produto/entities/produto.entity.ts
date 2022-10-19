import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: "CASCADE"
  }) categoria: Categoria

}



