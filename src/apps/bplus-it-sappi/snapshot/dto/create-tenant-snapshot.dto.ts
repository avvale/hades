import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantSnapshotDto 
{ 
    @ApiProperty({
        type        : String,
        description : 'Tenant code',
        example     : 'TECHEDGE'
    })
    code: string;
}
