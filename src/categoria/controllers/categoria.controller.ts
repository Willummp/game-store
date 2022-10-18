import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Delete } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { CategoriaService } from "src/categoria/services/categoria.service";

//NOTE Exemplo http://localhost:4000/categoria/
@Controller('/categoria') //NOTE - transformando a classe abaixo em Controller (Isso é um DECORATOR)
export class CategoriaController {
  constructor(
    private readonly categoriaService: CategoriaService
  ){ };

  @Post()
  @HttpCode(HttpStatus.OK)
  callCreate(@Body() categoria:Categoria): Promise<Categoria>{
    return this.categoriaService.create(categoria);
  };

  @Get()
  @HttpCode(HttpStatus.OK) //NOTE - Se der certo, ele da um código de êxito.
  findAll(): Promise <Categoria[]>{ //NOTE -  chamando o "findAll" criado em  "categoria.serivce.ts"
    return this.categoriaService.findAll();
  };

  @Get('/:id')  //NOTE Exemplo http://localhost:4000/categoria/2
  @HttpCode(HttpStatus.OK)
  callFindById(@Param('id', ParseIntPipe) id : number): Promise<Categoria>{
    return this.categoriaService.findById(id)
  }
  
  @Get('/nome/:nome') //NOTE Exemplo localhost:4000/categoria/nome/Terror ou localhost:4000/categoria/nome/T ( ele vai encontrar qual tiver T no nome)
  @HttpCode(HttpStatus.OK)
  callFindByName(@Param('nome') nome: string): Promise<Categoria[]> {
    return this.categoriaService.findByName(nome)
  }

  @Put('')
  @HttpCode(HttpStatus.OK)
  callUpdate(categoria: Categoria): Promise<Categoria>{
    return this.categoriaService.update(categoria)
  }
  
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id',ParseIntPipe)id: number){
    return this.categoriaService.delete(id)
  }
};

