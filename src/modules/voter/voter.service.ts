import { Injectable } from '@nestjs/common';

import { VoterRepository } from './voter.repository';

@Injectable()
export class VoterService {
  constructor(private voterRepository: VoterRepository) {}

  async findAll() {
    const voterList = await this.voterRepository.find();

    return voterList;
  }
}
