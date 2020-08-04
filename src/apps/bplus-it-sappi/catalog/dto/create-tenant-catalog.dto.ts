import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantCatalogDto 
{ 
    @ApiProperty({
        type        : String,
        description : 'Tenant code',
        example     : 'TECHEDGE'
    })
    code: string;
}
