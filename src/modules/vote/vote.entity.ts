import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { CandidateEntity } from '../candidate/candidate.entity';
import { VoteDto } from './dto/vote.dto';

@Entity({ name: 'votes' })
@UseDto(VoteDto)
export class VoteEntity extends AbstractEntity<VoteDto> {
  @Column()
  voterId: string;

  @Column()
  candidateIdPresident: string;

  @Column()
  candidateIdVicePresident: string;

  @Column({ default: false })
  confirmationStatus: boolean;

  @Column({ nullable: true })
  otpEntry: string;

  @ManyToOne(() => CandidateEntity)
  @JoinColumn({ name: 'candidate_id_president' })
  president: CandidateEntity;

  @ManyToOne(() => CandidateEntity)
  @JoinColumn({ name: 'candidate_id_vice_president' })
  vicePresident: CandidateEntity;
}
