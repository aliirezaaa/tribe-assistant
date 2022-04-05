import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyzedPost } from './entities/analyzedPost.entity';
import { AnalyzedPostService } from './analyzedPost.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyzedPost])],
  providers: [AnalyzedPostService],
})
export class AnalyzedPostModule {}
