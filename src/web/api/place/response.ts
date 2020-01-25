import { ApiProperty } from '@nestjs/swagger';

export class PlaceResponseDTO {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly rating: number;
}
