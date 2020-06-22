import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '63412dca-9f03-444a-8ad3-4a56074bbc5d'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'Ergonomic Fresh Table'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'Tasty Concrete Gloves'
    })
    code: string;
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'Unbranded Metal Towels'
    })
    logo: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
