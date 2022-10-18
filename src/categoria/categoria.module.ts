import { Module }  from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaController } from "src/categoria/controllers/categoria.controller";
import { CategoriaService } from "src/categoria/services/categoria.service";
import { Categoria } from "./entities/categoria.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])], //NOTE - Exportando o módulo CATEGORIA como TypeOrm (segue na linha 9)
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [TypeOrmModule], //NOTE - Aque ele informa o tipo de exportação (linha13) que ele quer exportar esse modulo (linha 7)
})
export class CategoriaModule { //NOTE - Se exportando 
}

//NOTE  "forFeature" ele cria uma nova caracteristica, diferente de "forRoot", que pega da RAIZ 