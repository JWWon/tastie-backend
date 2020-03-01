import { ApiProperty } from '@nestjs/swagger';

export class QueryExistsAccountRequest {
  @ApiProperty()
  readonly email: string;
}
