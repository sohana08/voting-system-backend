import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateVoterDto } from './dto/create-voter.dto';
import { VoterDto } from './dto/voter.dto';
import { VoterService } from './voter.service';

@Controller('voters')
@ApiTags('voters')
export class VoterController {
  constructor(private readonly voterService: VoterService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VoterDto,
    description: 'Successfully voter',
  })
  create(@Body() createVoterDto: CreateVoterDto) {
    return this.voterService.create(createVoterDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VoterDto,
    isArray: true,
    description: 'Get All Voters',
  })
  async getVoters() {
    const candidateList = await this.voterService.findAll();

    return candidateList;
  }
}
