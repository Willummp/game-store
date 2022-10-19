import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Produto } from "./entities/produto.entity";
import { ProdutoController } from "./controller/produto.controller";
import { ProdutoService } from "./services/produto.service";

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers:[ProdutoController],
  providers:[ProdutoService],
  exports:[TypeOrmModule]
})
export class ProdutoModule { }

//NOTE  "forFeature" ele cria uma nova caracteristica, diferente de "forRoot", que pega da RAIZ 