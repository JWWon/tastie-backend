import { ApiProperty } from '@nestjs/swagger';
import { LocationResponseDTO } from '../common/response';

export class CategoryResponseDTO {
  @ApiProperty()
  name: string;
}

export class SituationResponseDTO {
  @ApiProperty()
  name: string;
}

export class RestaurantResponseDTO {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty({ type: LocationResponseDTO })
  readonly location: LocationResponseDTO;
}
