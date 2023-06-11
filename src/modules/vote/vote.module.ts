import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VoteController } from './vote.controller';
import { VoteRepository } from './vote.repository';
import { VoteService } from './vote.service';

@Module({
  imports: [TypeOrmModule.forFeature([VoteRepository])],

  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
