import { Module } from '@nestjs/common';
import { UtilService } from './util.service';
/**
 * This module manages all classes relate to UtilModule
 */
@Module({
  providers: [UtilService],
  exports: [UtilService],
})
export class UtilModule {}
