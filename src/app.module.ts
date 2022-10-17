import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { hostname } from 'os';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'game_store',
      entities: [],
      synchronize: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
