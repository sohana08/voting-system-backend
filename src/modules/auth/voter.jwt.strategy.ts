import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenType } from '../../constants';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { VoterEntity } from '../voter/voter.entity';
import { VoterService } from '../voter/voter.service';

@Injectable()
export class VoterJwtStrategy extends PassportStrategy(Strategy, 'voterJwt') {
  constructor(
    private configService: ApiConfigService,
    private voterService: VoterService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: {
    voterId: Uuid;
    type: TokenType;
  }): Promise<VoterEntity> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    const voter = await this.voterService.findOne({
      id: args.voterId,
    });

    if (!voter) {
      throw new UnauthorizedException();
    }

    return voter;
  }
}
