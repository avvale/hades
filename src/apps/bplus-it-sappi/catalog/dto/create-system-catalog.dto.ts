import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemCatalogDto 
{   
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'q'
    })
    name: string;
}
