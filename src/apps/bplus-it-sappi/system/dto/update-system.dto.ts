import { ApiProperty } from '@nestjs/swagger';

export class UpdateSystemDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '03f356e6-952c-40df-86ab-5b42cfedd85c'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b33dc6c1-903e-480f-9e30-46e53cb9041e'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'r'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'i'
    })
    tenantCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : 'z'
    })
    environment: string;
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'b'
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
        example     : '2020-07-16 18:00:23'
    })
    cancelledAt: string;
    
}
