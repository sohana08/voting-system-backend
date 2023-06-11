import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators';
import { VoterEntity } from '../voter/voter.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { VoteDto } from './dto/vote.dto';
import { VoteService } from './vote.service';

@Controller('votes')
@ApiTags('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post('cast-vote')
  @UseGuards(AuthGuard('voterJwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VoteDto,
    description: 'Successfully voted',
  })
  @ApiBearerAuth()
  create(
    @AuthUser() voterEntity: VoterEntity,
    @Body() createVoteDto: CreateVoteDto,
  ) {
    return this.voteService.create(voterEntity, createVoteDto);
  }

  @Post('verify-otp')
  @UseGuards(AuthGuard('voterJwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VoteDto,
    description: 'Successfully voted',
  })
  @ApiBearerAuth()
  verifyOtp(
    @AuthUser() voterEntity: VoterEntity,
    @Body() verifyOtpDto: VerifyOtpDto,
  ) {
    return this.voteService.verifyOtp(voterEntity, verifyOtpDto);
  }
}
