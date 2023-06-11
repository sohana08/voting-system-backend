import { Injectable } from '@nestjs/common';

import { CandidateRepositoty } from './candidate.repository';
import type { CreateCandidateDto } from './dto/create-candidate.dto';

@Injectable()
export class CandidateService {
  constructor(private candidateRepositoty: CandidateRepositoty) {}

  async create(createCandidateDto: CreateCandidateDto) {
    const candidates = this.candidateRepositoty.create(createCandidateDto);
    const candidateList = await this.candidateRepositoty.save(candidates);

    return candidateList;
  }

  async getCandidates() {
    const candidatesList = await this.candidateRepositoty.find();

    return candidatesList;
  }
}
