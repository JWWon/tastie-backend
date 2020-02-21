import { ApiProperty } from '@nestjs/swagger';

export class QueryAddressRequestDTO {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;
}
