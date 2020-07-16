import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '585253e3-dd6a-496d-a067-168ee65c3167'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd24ee6a8-6252-4bf7-aae0-c54258e58abf'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'j'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'x'
    })
    tenantCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : 'g'
    })
    environment: string;
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'v'
    })
    version: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    @ApiProperty({
        type        : String,
        description : 'cancelledAt [input here api field description]',
        example     : '2020-07-15 22:14:01'
    })
    cancelledAt: string;
    
}
