import { IsNotEmpty } from "class-validator"
import { Produto } from "src/produto/entities/produto.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'tb_categorias'}) //NOTE ISSO É UM DECORATOR, que criou a entidade 
export class Categoria {

  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty() // NOTE A coluna "nome" NÃO PODE ser vazia 
  @Column({length:255, nullable:false}) // NOTE Criando COLUNA, tamanho 255 / é nulo?(Falso) //OS DOIS DECORATORS VÃO PRO "nome"
  nome: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  
  
  @OneToMany(() => Produto,(produto) => produto.categoria)
  produto: Produto[]
}