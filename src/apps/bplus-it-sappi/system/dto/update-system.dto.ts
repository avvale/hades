import { ApiProperty } from '@nestjs/swagger';

export class UpdateSystemDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'a36798b4-80ea-40fa-9b0f-1a3fc2ba2015'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '52853c06-4f08-4289-9c17-73d76d1fb36b'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'm'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantCode [input here api field description]',
            example     : 'z'
        })
        tenantCode: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'environment [input here api field description]',
            example     : 'y'
        })
        environment: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'version [input here api field description]',
            example     : '8'
        })
        version: string;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : true
        })
        isActive: boolean;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'cancelledAt [input here api field description]',
            example     : '2020-07-21 02:40:28'
        })
        cancelledAt: string;
    
    
}
