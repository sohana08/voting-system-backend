import { EntityRepository, Repository } from 'typeorm';

import { CandidateEntity } from './candidate.entity';

@EntityRepository(CandidateEntity)
export class CandidateRepositoty extends Repository<CandidateEntity> {}
