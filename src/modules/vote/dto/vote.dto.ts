import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { VoteEntity } from '../vote.entity';

export class VoteDto extends AbstractDto {
  @ApiProperty()
  voterId: string;

  @ApiProperty()
  candidateIdPresident: string;

  @ApiProperty()
  candidateIdVicePresident: string;

  @ApiProperty()
  confirmationStatus: boolean;

  @ApiProperty()
  otpEntry: string;

  constructor(vote: VoteEntity) {
    super(vote);
    this.voterId = vote.voterId;
    this.candidateIdPresident = vote.candidateIdPresident;
    this.candidateIdVicePresident = vote.candidateIdVicePresident;
    this.confirmationStatus = vote.confirmationStatus;
    this.otpEntry = vote.otpEntry;
  }
}
