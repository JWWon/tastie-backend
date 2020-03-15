import { ApiProperty } from '@nestjs/swagger';

export class OpeningHours {
  @ApiProperty()
  readonly openNow?: boolean;

  @ApiProperty()
  readonly weekdayText: string[];
}
