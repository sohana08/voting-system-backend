import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CandidateService } from './candidate.service';
import { CandidateDto } from './dto/candidate.dto';
import { CreateCandidateDto } from './dto/create-candidate.dto';

@Controller('candidates')
@ApiTags('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CandidateDto,
    description: 'Successfully Added Country',
  })
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CandidateDto,
    isArray: true,
    description: 'Get All Candidates',
  })
  async getCandidates() {
    const candidateList = await this.candidateService.getCandidates();

    return candidateList;
  }
}
