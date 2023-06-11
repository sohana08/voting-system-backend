import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { ApiConfigService } from './api-config.service';

@Injectable()
export class SmsService {
  constructor(
    public configService: ApiConfigService,
    public httpService: HttpService,
  ) {}

  async sendSms(to: string, message: string): Promise<void> {
    const playsmsConfig = this.configService.playsmsConfig;
    await this.httpService.axiosRef.get(
      // eslint-disable-next-line max-len
      `${playsmsConfig.url}&u=${playsmsConfig.username}&h=${playsmsConfig.token}&op=${playsmsConfig.operationType}&to=${to}&from=KATHOK&msg=${message}`,
    );
  }
}
