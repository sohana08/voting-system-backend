import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../constants';
import { ApiFile, Auth, AuthUser } from '../../decorators';
import { UserNotFoundException } from '../../exceptions';
import { IFile } from '../../interfaces';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { VoterDto } from '../voter/dto/voter.dto';
import { VoterEntity } from '../voter/voter.entity';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { VoterLoginDto } from './dto/VoterLoginDto';
import { VoterLoginPayloadDto } from './dto/VoterLoginPayloadDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  @ApiException(() => [UserNotFoundException])
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  @Post('voter-login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: VoterLoginPayloadDto,
    description: 'Voter info with access token',
  })
  @ApiException(() => [UserNotFoundException])
  async voterLogin(
    @Body() voterLoginDto: VoterLoginDto,
  ): Promise<VoterLoginPayloadDto> {
    const voterEntity = await this.authService.validateVoterLogin(
      voterLoginDto,
    );

    const token = await this.authService.createVoterAccessToken({
      voterId: voterEntity.id,
    });

    return new VoterLoginPayloadDto(voterEntity.toDto(), token);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  @ApiFile({ name: 'avatar' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
    @UploadedFile() file: IFile,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(
      userRegisterDto,
      file,
    );

    return createdUser.toDto({
      isActive: true,
    });
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }

  @Version('1')
  @Get('voter/me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('voterJwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: VoterDto, description: 'current voter info' })
  getCurrentVoter(@AuthUser() voter: VoterEntity): VoterDto {
    return voter.toDto();
  }
}
