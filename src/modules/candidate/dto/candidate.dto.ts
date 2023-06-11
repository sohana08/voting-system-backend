import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { CandidateEntity } from '../candidate.entity';

export class CandidateDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  avatar: string;

  constructor(candidate: CandidateEntity) {
    super(candidate);
    this.name = candidate.name;
    this.description = candidate.description;
    this.avatar = candidate.avatar;
  }
}
