import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";




@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>
  ) { }

  async create(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: { categoria: true }
    });
  }

  async findById(id: number): Promise<Produto> {
    const produtoExistencia = await this.produtoRepository.findOne({
      where: { id },
      relations: { categoria: true }
    });
    if (!produtoExistencia) {
      throw new HttpException("Produto não encontrado", HttpStatus.NOT_FOUND)
    }
    return produtoExistencia
  }
  async findByName(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { categoria: true }
    })
  }

  async update(produto: Produto) {
    const produtoExistencia = await this.findById(produto.id)
    if (!produtoExistencia || !produto.id) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }
    return this.produtoRepository.save(produto)
  }

  async delete(id: number) {
    let buscarProduto = await this.findById(id);

    if (!buscarProduto) {
      throw new HttpException('Produto não existente', HttpStatus.NOT_FOUND)
    }
    return await this.produtoRepository.delete(id);
  }

}