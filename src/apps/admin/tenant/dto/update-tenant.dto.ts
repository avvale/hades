import { ApiProperty } from '@nestjs/swagger';

export class UpdateTenantDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '3e7b7a20-1a8d-4385-bdb9-c32eeceecc9e'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '4'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'code [input here api field description]',
            example     : 'u'
        })
        code: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'logo [input here api field description]',
            example     : 'j'
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
