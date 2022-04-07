import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyzedPost } from './entities/analyzedPost.entity';
import { AnalyzedPostService } from './analyzedPost.service';

/**
 * This module manages all classes relate to AnalzedPost
 */
@Module({
  imports: [TypeOrmModule.forFeature([AnalyzedPost])],
  providers: [AnalyzedPostService],
  exports: [AnalyzedPostService, TypeOrmModule],
})
export class AnalyzedPostModule {}
