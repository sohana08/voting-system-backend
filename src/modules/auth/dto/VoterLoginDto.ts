import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VoterLoginDto {
  @IsString()
  @ApiProperty()
  readonly licenseNo: string;

  @IsString()
  @ApiProperty()
  readonly contactNo: string;
}
