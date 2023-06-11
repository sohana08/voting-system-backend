import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { CandidateDto } from './dto/candidate.dto';

@Entity({ name: 'candidates' })
@UseDto(CandidateDto)
export class CandidateEntity extends AbstractEntity<CandidateDto> {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  avatar: string;
}
