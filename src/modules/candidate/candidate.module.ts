import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CandidateController } from './candidate.controller';
import { CandidateRepositoty } from './candidate.repository';
import { CandidateService } from './candidate.service';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateRepositoty])],

  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
