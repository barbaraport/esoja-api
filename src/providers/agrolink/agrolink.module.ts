import { Module } from '@nestjs/common';
import { AgrolinkService } from './agrolink.service';

@Module({
  providers: [AgrolinkService],
})
export class AgrolinkModule {}
