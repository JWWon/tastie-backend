import { ApiProperty } from '@nestjs/swagger';
import { LocationResponseDTO } from '../common/response';

export class PlaceResponseDTO {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty({ type: LocationResponseDTO })
  readonly location: LocationResponseDTO;
}
