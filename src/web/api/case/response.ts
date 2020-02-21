import { ApiProperty } from '@nestjs/swagger';
import { CoordinateResponseDTO } from '../common/response';

export class LocationResponseDTO {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty({ type: CoordinateResponseDTO })
  readonly location: CoordinateResponseDTO;
}

export class CategoryResponseDTO {
  @ApiProperty()
  readonly name: string;
}

export class SituationResponseDTO {
  @ApiProperty()
  readonly name: string;
}

export class PreferencesResponseDTO {
  @ApiProperty()
  readonly name: string;
}
