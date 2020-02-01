import { ApiProperty } from '@nestjs/swagger';
import { LocationResponseDTO } from '../common/response';

export class CategoryResponseDTO {
  @ApiProperty()
  readonly name: string;
}

export class SituationResponseDTO {
  @ApiProperty()
  readonly name: string;
}

export class RestaurantResponseDTO {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty({ type: LocationResponseDTO })
  readonly location: LocationResponseDTO;
}
