import { ApiProperty } from '@nestjs/swagger';

import { VoterDto } from '../../voter/dto/voter.dto';
import { TokenPayloadDto } from './TokenPayloadDto';

export class VoterLoginPayloadDto {
  @ApiProperty({ type: VoterDto })
  voter: VoterDto;

  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(voter: VoterDto, token: TokenPayloadDto) {
    this.voter = voter;
    this.token = token;
  }
}
