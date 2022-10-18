import { HttpStatus, ParseIntPipe } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Delete, Get, Post, Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";




@Controller('/produto')

export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService
  ){};

  @Post()
  @HttpCode(HttpStatus.OK)
  callCreate(@Body() produto:Produto): Promise<Produto>{
    return this.produtoService.create(produto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]>{
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  callFindById(@Param('id', ParseIntPipe) id: number):Promise<Produto>{
    return this.produtoService.findById(id)
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.NOT_FOUND)
  callFindByName(@Param('nome') nome: string): Promise<Categoria[]> {
    return this.produtoService.findByName(nome)
  }

  @Put('')
  @HttpCode(HttpStatus.OK)
  callUpdate(produto: Produto): Promise<Produto>{
    return this.produtoService.update(produto)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id',ParseIntPipe)id: number){
    return this.produtoService.delete(id)
  }
}
