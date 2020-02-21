import { ApiProperty } from '@nestjs/swagger';

export class CoordinateResponseDTO {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;
}

export class HttpExceptionResponseDTO {
  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty()
  readonly message: string;
}
