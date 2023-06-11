import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { VoterEntity } from '../voter.entity';

export class VoterDto extends AbstractDto {
  @ApiProperty()
  promoterName: string;

  @ApiProperty()
  businessName: string;

  @ApiProperty()
  businessLocation: string;

  @ApiProperty()
  licenseNo: string;

  @ApiProperty()
  contactNo: string;

  @ApiProperty()
  email: string;

  constructor(voter: VoterEntity) {
    super(voter);
    this.promoterName = voter.promoterName;
    this.businessName = voter.businessName;
    this.businessLocation = voter.businessLocation;
    this.licenseNo = voter.licenseNo;
    this.contactNo = voter.contactNo;
    this.email = voter.email;
  }
}
