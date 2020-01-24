import { ApiProperty } from '@nestjs/swagger';

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
  name: string;
}
