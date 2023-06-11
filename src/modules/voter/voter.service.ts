import { Injectable } from '@nestjs/common';
import type { FindConditions } from 'typeorm';

import type { Optional } from '../../types';
import type { CreateVoterDto } from './dto/create-voter.dto';
import type { VoterEntity } from './voter.entity';
import { VoterRepository } from './voter.repository';

@Injectable()
export class VoterService {
  constructor(private voterRepository: VoterRepository) {}

  async findAll() {
    const voterList = await this.voterRepository.find();

    return voterList;
  }

  /**
   * Find single voter
   */
  async findOne(
    findData: FindConditions<VoterEntity>,
  ): Promise<Optional<VoterEntity>> {
    const voter = await this.voterRepository.findOne(findData);

    return voter;
  }

  async create(createVoterDto: CreateVoterDto) {
    const voterObject = this.voterRepository.create(createVoterDto);
    const voter = await this.voterRepository.save(voterObject);

    return voter;
  }
}
