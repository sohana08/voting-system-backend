import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isPhoneNumber } from 'class-validator';

import { generateOtp } from '../../common/utils';
import { SmsService } from '../../shared/services/sms.service';
import type { VoterEntity } from '../voter/voter.entity';
import type { CreateVoteDto } from './dto/create-vote.dto';
import type { VerifyOtpDto } from './dto/verify-otp.dto';
import { VoteRepository } from './vote.repository';

@Injectable()
export class VoteService {
  constructor(
    private voteRepository: VoteRepository,
    private smsService: SmsService,
  ) {}

  async create(voterEntity: VoterEntity, createVoteDto: CreateVoteDto) {
    const voteEntry = await this.voteRepository.findOne({
      where: {
        voterId: voterEntity.id,
      },
    });

    if (voteEntry?.confirmationStatus === true) {
      throw new BadRequestException('Already voted');
    }

    const voteDto = {
      voterId: voterEntity.id,
      candidateIdPresident: createVoteDto.candidateIdPresident,
      candidateIdVicePresident: createVoteDto.candidateIdVicePresident,
      confirmationStatus: false,
      otpEntry: generateOtp(),
    };

    if (!voteEntry) {
      const voteObject = this.voteRepository.create(voteDto);
      const vote = await this.voteRepository.save(voteObject);

      if (isPhoneNumber(voterEntity.contactNo, 'BT')) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.smsService.sendSms(
          voterEntity.contactNo,
          `${vote.otpEntry} is confirmation code for your vote.`,
        );
      }

      // Create a new object without the otpEntry property
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { otpEntry, ...voteWithoutOtp } = vote;

      return voteWithoutOtp;
    }

    const voteUpdate = this.voteRepository.merge(voteEntry, voteDto);
    const vote = await this.voteRepository.save(voteUpdate);

    if (isPhoneNumber(voterEntity.contactNo, 'BT')) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.smsService.sendSms(
        voterEntity.contactNo,
        `${vote.otpEntry} is confirmation code for your vote.`,
      );
    }

    // Create a new object without the otpEntry property
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { otpEntry, ...voteWithoutOtp } = vote;

    return voteWithoutOtp;
  }

  async verifyOtp(voterEntity: VoterEntity, verifyOtpDto: VerifyOtpDto) {
    const voteEntry = await this.voteRepository.findOne({
      where: {
        voterId: voterEntity.id,
      },
    });

    if (!voteEntry) {
      throw new NotFoundException('Vote not submitted');
    }

    if (
      voteEntry.otpEntry === verifyOtpDto.otp &&
      voteEntry.confirmationStatus === false
    ) {
      voteEntry.confirmationStatus = true;
      await this.voteRepository.save(voteEntry);
      const voteUpdate = await this.voteRepository.findOne({
        where: {
          voterId: voterEntity.id,
        },
      });

      return voteUpdate;
    }

    throw new ForbiddenException('Invalid OTP');
  }

  async getVoteCountForPresident() {
    const queryBuilder = this.voteRepository
      .createQueryBuilder('vote')
      .leftJoin('vote.president', 'president')
      .select('president.id as Id')
      .addSelect('president.name as name')
      .addSelect('president.description as description')
      .addSelect('president.avatar as avatar')
      .addSelect('count(vote.voter_id)', 'totalVotes')
      .groupBy('vote.candidate_id_president');

    const votes = await queryBuilder.getRawMany();

    return votes;
  }

  async getVoteCountForVicePresident() {
    const queryBuilder = this.voteRepository
      .createQueryBuilder('vote')
      .leftJoin('vote.vicePresident', 'vicePresident')
      .select('vicePresident.id as Id')
      .addSelect('vicePresident.name as name')
      .addSelect('vicePresident.description as description')
      .addSelect('vicePresident.avatar as avatar')
      .addSelect('count(vote.voter_id)', 'totalVotes')
      .groupBy('vote.candidate_id_vice_president');

    const votes = await queryBuilder.getRawMany();

    return votes;
  }
}
