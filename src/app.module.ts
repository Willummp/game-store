import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'game_store',
      entities: [Categoria,Produto], //NOTE - BUSCANDO A ENTIDADE LA EM /categoria/entities/categoria.entity
      synchronize: true
    }),
    CategoriaModule,//NOTE - Importando CategoriaModule
    ProdutoModule 
  ],


  controllers: [],
  providers: [],
})
export class AppModule {} //NOTE - "AppModule" está recebendo tudo dentro de @Module({...})
