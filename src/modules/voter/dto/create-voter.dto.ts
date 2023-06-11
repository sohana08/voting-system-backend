import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class CreateVoterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly promoterName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly businessName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly businessLocation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly licenseNo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly contactNo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  readonly email: string;
}
