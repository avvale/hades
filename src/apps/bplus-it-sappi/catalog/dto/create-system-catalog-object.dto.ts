import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemCatalogObjectDto 
{   
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'q'
    })
    name: string;
}
