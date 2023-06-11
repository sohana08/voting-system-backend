import { EntityRepository, Repository } from 'typeorm';

import { VoteEntity } from './vote.entity';

@EntityRepository(VoteEntity)
export class VoteRepository extends Repository<VoteEntity> {}
