import { Module } from '@nestjs/common';
import { NamesModule } from './module/names/names.module';
@Module({
  imports: [NamesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
