import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { VoterDto } from './dto/voter.dto';
import { VoterService } from './voter.service';

@Controller('voters')
@ApiTags('voters')
export class VoterController {
  constructor(private readonly voterService: VoterService) {}

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
