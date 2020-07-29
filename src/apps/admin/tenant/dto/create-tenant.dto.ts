import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '39e96ab0-63d6-4e7d-882c-9cbe5d2aa316'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'u'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'rbvrhueaxoe6timenyurthwp318xwzw3g4cwe6ycr01j5l7b6i'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'f'
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
