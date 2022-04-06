import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NlpModule } from '../nlp/nlp.module';
import { AnalyzedPostModule } from '../analyzedPost/analyzedPost.module';
import { TribeModule } from '../tribe/tribe.module';
import { TypeOrmConfigService } from '../shared/typeorm/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { UtilModule } from 'src/util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),

    NlpModule,
    AnalyzedPostModule,
    TribeModule,
    BullModule,
    UtilModule,
  ],
})
export class AppModule {}
