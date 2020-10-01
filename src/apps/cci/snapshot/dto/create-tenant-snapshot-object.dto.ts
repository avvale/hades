import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantSnapshotObjectDto 
{ 
    @ApiProperty({
        type        : String,
        description : 'Tenant code',
        example     : 'TECHEDGE'
    })
    code: string;
}
