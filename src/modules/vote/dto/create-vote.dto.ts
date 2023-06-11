import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateVoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly candidateIdPresident: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly candidateIdVicePresident: string;
}
