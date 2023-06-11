import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
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
}
