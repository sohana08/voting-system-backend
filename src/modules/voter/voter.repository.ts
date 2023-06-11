import { EntityRepository, Repository } from 'typeorm';

import { VoterEntity } from './voter.entity';

@EntityRepository(VoterEntity)
export class VoterRepository extends Repository<VoterEntity> {}
