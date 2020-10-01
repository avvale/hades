import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantCatalogObjectDto 
{ 
    @ApiProperty({
        type        : String,
        description : 'Tenant code',
        example     : 'TECHEDGE'
    })
    code: string;
}
