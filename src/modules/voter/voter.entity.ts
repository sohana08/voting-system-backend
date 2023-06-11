import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { VoterDto } from './dto/voter.dto';

@Entity({ name: 'voters' })
@UseDto(VoterDto)
export class VoterEntity extends AbstractEntity<VoterDto> {
  @Column()
  promoterName: string;

  @Column()
  businessName: string;

  @Column()
  businessLocation: string;

  @Column()
  licenseNo: string;

  @Column()
  contactNo: string;

  @Column()
  email: string;
}
