import { ApiProperty } from '@nestjs/swagger';

export class UpdateTenantDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '9ab186b4-b09c-497b-9983-8cfca310cc78'
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
            example     : 'r'
        })
        code: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'logo [input here api field description]',
            example     : 'u'
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
