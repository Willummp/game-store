import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Produto } from "src/produto/entities/produto.entity";
import { ILike, Repository } from "typeorm";

@Injectable()  //TODO - Ver oque é INJECTABLE na documentação 
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria) //NOTE - Injetando  a interface Categoria dentro do que está na linha debaixo ("categoriaRepository")
    private categoriaRepository: Repository<Categoria> //NOTE - Espera receber uma interface para CATEGORIA ("categoriaRepository") e digo que ela é uma interface pra essa categoria ("Repository<Categoria>")

  ) { }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria) //NOTE retornando a categoria criada
  }

  async findAll(): Promise<Categoria[]> { //NOTE - definindo findAll como uma função "async"(ASSÍNCRONA, ou seja, duas ou mais coisas trabalhando em algo em tempos diferentes), podendo utilizar o "await" dentro dessa função.

    return await this.categoriaRepository.find({ relations: { produto: true } }); //NOTE - Aguardar os dados do banco de dados requisitados pelo ".find()"
  }

  async findById(id: number): Promise<Categoria> { //NOTE - Procurando pelo ID
    const categoriaExistencia = await this.categoriaRepository.findOne({
      where: { id },
      relations: {produto:true}
    });
    if (!categoriaExistencia) { //NOTE - Se  não existir um ID (armazenado em categoriaExistencia), aconteça linha 31
      throw new HttpException('Categoria não encontrado.', HttpStatus.NOT_FOUND)
    }
    return categoriaExistencia //NOTE - Se existir, lança o categoriaExistencia
  }

  async findByName(nome: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: {nome: ILike(`%${nome}%`)},
      relations: {produto:true}
    })
  }

  async update(categoria: Categoria) {
    const categoriaExistencia = await this.findById(categoria.id)

    if (!categoriaExistencia || !categoria.id) {
      throw new HttpException('Categoria não Encontrada', HttpStatus.NOT_FOUND);
    }

    return this.categoriaRepository.save(categoria)
  }

  async delete(id: number) {
    let buscarCategoria = await this.findById(id);

    if (!buscarCategoria) {
      throw new HttpException('Categoria não existente', HttpStatus.NOT_FOUND)
    }
    return await this.categoriaRepository.delete(id);
  }
}

