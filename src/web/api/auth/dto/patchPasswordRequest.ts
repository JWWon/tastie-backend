import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatchPasswordRequest {
  @ApiProperty({ description: 'redirect에서 받은 code' })
  readonly code: string;

  @ApiProperty()
  readonly password: string;
}
